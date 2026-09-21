import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Sparkles, Crown, ArrowRight, Minus, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { toast } from "@/hooks/use-toast";
import { useFooterInView } from "@/hooks/useFooterInView";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "👋 Hi there! I'm your **AI Legal Assistant** at LegalXpress.\n\nI'm here to help answer your legal questions about:\n- **Corporate Law** & Incorporations\n- **Real Estate** transactions\n- **Simple Divorce** (uncontested)\n- **Contracts** & Shareholder Agreements\n\n**What legal question can I help you with today?**",
    timestamp: new Date(),
  },
];

const quickQuestions = [
  "How do I incorporate a business?",
  "What's in a shareholder agreement?",
  "Explain the divorce process",
  "How does real estate closing work?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/legal-ai-chat`;

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(0);

  const isFooterInView = useFooterInView();
  const bottomClass = isFooterInView ? "bottom-28" : "bottom-6";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = useCallback(async (
    messagesToSend: { role: "user" | "assistant"; content: string }[],
    onDelta: (delta: string) => void,
    onDone: () => void
  ) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: messagesToSend }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    onDone();
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    messageCountRef.current += 1;
    
    // Show upgrade prompt after 3 messages
    if (messageCountRef.current >= 3 && !showUpgrade) {
      setShowUpgrade(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    let assistantContent = "";
    const upsertAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.id.startsWith("stream-")) {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, {
          id: `stream-${Date.now()}`,
          role: "assistant" as const,
          content: assistantContent,
          timestamp: new Date(),
        }];
      });
    };

    try {
      const messagesToSend = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }));

      await streamChat(
        messagesToSend,
        (chunk) => upsertAssistant(chunk),
        () => setIsLoading(false)
      );
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
      });
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`fixed ${bottomClass} right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all duration-300 animate-pulse-glow ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Minimized Bar */}
      <div
        className={`fixed ${bottomClass} right-6 z-50 transition-all duration-300 ${
          isOpen && isMinimized ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-lg hover:bg-primary/90 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
            <Sparkles className="h-4 w-4 text-secondary-foreground" />
          </div>
          <span className="font-medium text-sm">AI Legal Assistant</span>
          <Maximize2 className="h-4 w-4 ml-2" />
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed ${bottomClass} right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${
          isOpen && !isMinimized ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="glass rounded-xl shadow-2xl overflow-hidden border border-border">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Sparkles className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold flex items-center gap-2">
                  AI Legal Assistant
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
                </div>
                <div className="text-[10px] text-primary-foreground/70">Ask any legal question</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="h-7 w-7 flex items-center justify-center rounded-md bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                aria-label="Minimize chat"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 flex items-center justify-center rounded-md bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="h-72 p-3" ref={scrollRef}>
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 ${
                      message.role === "user"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="text-xs font-body prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <Link to={href || "#"} className="text-secondary underline hover:no-underline">
                              {children}
                            </Link>
                          ),
                          p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="mb-1.5 ml-3 list-disc">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-1.5 ml-3 list-decimal">{children}</ol>,
                          li: ({ children }) => <li className="mb-0.5">{children}</li>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-xl px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Upgrade CTA */}
          {showUpgrade && (
            <div className="px-3 py-2 bg-gradient-to-r from-secondary/20 to-primary/20 border-t border-border">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-secondary shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] font-medium text-foreground">Talk to a Real Lawyer</p>
                  <p className="text-[10px] text-muted-foreground">Just $4.99/month for 12 months</p>
                </div>
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-[10px] h-7 px-2" asChild>
                  <Link to="/subscriptions/personal">
                    Subscribe
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Quick Questions */}
          <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-border">
            {quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSend(question)}
                disabled={isLoading}
                className="text-[10px] px-2 py-1 rounded-full bg-muted hover:bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors font-body disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a legal question..."
                className="flex-1 h-8 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSend()}
                size="icon"
                className="bg-secondary hover:bg-secondary/90 h-8 w-8"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1.5 text-center">
              AI responses are for informational purposes only, not legal advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
