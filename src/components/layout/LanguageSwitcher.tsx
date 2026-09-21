import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
  { code: "tl", label: "Tagalog" },
  { code: "ur", label: "اردو" },
];

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

function readCookieLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return "en";
  const parts = decodeURIComponent(match[1]).split("/");
  return parts[2] || "en";
}

function setTranslateCookie(lang: string) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  const host = window.location.hostname;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  // Clear on all plausible scopes first, then set
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${host}`;
  document.cookie = `googtrans=${value}; expires=${expires}; path=/`;
  document.cookie = `googtrans=${value}; expires=${expires}; path=/; domain=.${host}`;
}

export interface LanguageSwitcherProps {
  compact?: boolean;
}

/** Ensure the hidden Google widget host + script exist exactly once for the page. */
function ensureTranslateWidget() {
  if (typeof document === "undefined") return;

  if (!document.getElementById("google_translate_element")) {
    const host = document.createElement("div");
    host.id = "google_translate_element";
    host.setAttribute("aria-hidden", "true");
    host.style.position = "fixed";
    host.style.top = "-9999px";
    host.style.left = "-9999px";
    host.style.width = "1px";
    host.style.height = "1px";
    host.style.overflow = "hidden";
    document.body.appendChild(host);
  }

  if (document.getElementById("google-translate-script")) return;

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: LANGUAGES.map((l) => l.code).join(","),
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

/** Drive Google's hidden <select> directly so the page translates without a reload. */
function applyLanguage(lang: string, attempt = 0) {
  setTranslateCookie(lang);

  if (lang === "en") {
    // Cleanest way to fully restore the original page.
    window.location.reload();
    return;
  }

  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");

  if (!combo) {
    if (attempt < 25) {
      window.setTimeout(() => applyLanguage(lang, attempt + 1), 300);
    } else {
      // Widget never loaded (blocked/offline) — fall back to cookie + reload.
      window.location.reload();
    }
    return;
  }

  combo.value = lang;
  combo.dispatchEvent(new Event("change", { bubbles: true }));
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    setLang(readCookieLang());
    ensureTranslateWidget();
  }, []);

  const handleChange = (value: string) => {
    setLang(value);
    applyLanguage(value);
  };

  return (
    <Select value={lang} onValueChange={handleChange}>
      <SelectTrigger
        aria-label="Select language"
        className={
          compact
            ? "h-8 w-auto gap-1.5 rounded-lg border-none bg-transparent px-2 text-xs font-medium text-primary-foreground/70 shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground focus:ring-0 focus:ring-offset-0 notranslate [&>svg:last-child]:hidden"
            : "h-9 w-auto gap-2 rounded-full border border-secondary/40 bg-primary/40 px-3 text-xs font-medium text-primary-foreground backdrop-blur-sm hover:bg-primary/60 focus:ring-secondary notranslate"
        }
      >
        <Globe className="h-4 w-4 flex-shrink-0 text-secondary" />
        <span className={compact ? "hidden sm:inline" : ""}>
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent className="notranslate z-[60] max-h-72">
        {LANGUAGES.map((l) => (
          <SelectItem key={l.code} value={l.code} className="text-sm">
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

