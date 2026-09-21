import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, Lock, Check, Star, Eye, FileDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ContractPreviewDialog from "@/components/contracts/ContractPreviewDialog";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { localizeContract, localizeCategory } from "@/lib/contractFr";


interface ContractTemplate {
  id: string;
  name: string;
  description: string | null;
  category: string;
  jurisdiction: string;
}

const categories = [
  "All",
  "Business",
  "Real Estate",
  "Estate Planning",
  "Family",
  "Financial",
  "Employment",
  "Loans",
  "Service",
  "Partnership",
  "Corporate",
  "IP & Releases",
  "Procurement",
];

// Comprehensive LawDepot-style catalog. All templates available for Canada.
const fallbackContracts: ContractTemplate[] = [
  // ---------- Business ----------
  { id: "b1", name: "Non-Disclosure Agreement (NDA)", description: "Mutual or one-way confidentiality agreement", category: "Business", jurisdiction: "canada" },
  { id: "b2", name: "Independent Contractor Agreement", description: "Engage a contractor for services", category: "Business", jurisdiction: "canada" },
  { id: "b3", name: "Service Agreement", description: "General service provider agreement", category: "Service", jurisdiction: "canada" },
  { id: "b4", name: "Consulting Agreement", description: "Professional consulting services", category: "Service", jurisdiction: "canada" },
  { id: "b5", name: "Sales Agreement", description: "Sale of goods between buyer and seller", category: "Business", jurisdiction: "canada" },
  { id: "b6", name: "Bill of Sale", description: "Transfer ownership of personal property", category: "Business", jurisdiction: "canada" },
  { id: "b7", name: "Purchase of Business Agreement", description: "Sale of an existing business", category: "Business", jurisdiction: "canada" },
  { id: "b8", name: "Asset Purchase Agreement", description: "Buy or sell business assets", category: "Business", jurisdiction: "canada" },
  { id: "b9", name: "Letter of Intent", description: "Outline preliminary terms of a deal", category: "Business", jurisdiction: "canada" },
  { id: "b10", name: "Memorandum of Understanding (MOU)", description: "Non-binding outline of intent", category: "Business", jurisdiction: "canada" },
  { id: "b11", name: "Joint Venture Agreement", description: "Two parties cooperating on a project", category: "Business", jurisdiction: "canada" },
  { id: "b12", name: "Franchise Agreement", description: "Grant rights to operate a franchise", category: "Business", jurisdiction: "canada" },
  { id: "b13", name: "Distribution Agreement", description: "Distribute products in a territory", category: "Business", jurisdiction: "canada" },
  { id: "b14", name: "Reseller Agreement", description: "Authorize resale of products/services", category: "Business", jurisdiction: "canada" },
  { id: "b15", name: "Sponsorship Agreement", description: "Sponsor an event, person, or entity", category: "Business", jurisdiction: "canada" },
  { id: "b16", name: "Affiliate Agreement", description: "Pay commissions for referred sales", category: "Business", jurisdiction: "canada" },
  { id: "b17", name: "Subscription Agreement", description: "Recurring product/service subscription", category: "Business", jurisdiction: "canada" },
  { id: "b18", name: "Catering Agreement", description: "Food & beverage services for events", category: "Service", jurisdiction: "canada" },
  { id: "b19", name: "Event Vendor Agreement", description: "Vendor providing services at an event", category: "Service", jurisdiction: "canada" },
  { id: "b20", name: "Photography Contract", description: "Professional photography services", category: "Service", jurisdiction: "canada" },

  // ---------- Corporate / Partnership ----------
  { id: "c1", name: "Partnership Agreement", description: "Form a general business partnership", category: "Partnership", jurisdiction: "canada" },
  { id: "c2", name: "Limited Partnership Agreement", description: "Limited & general partner structure", category: "Partnership", jurisdiction: "canada" },
  { id: "c3", name: "Shareholder Agreement", description: "Shareholder rights and obligations", category: "Corporate", jurisdiction: "canada" },
  { id: "c5", name: "Articles of Incorporation", description: "Form a corporation", category: "Corporate", jurisdiction: "canada" },
  { id: "c6", name: "Corporate Bylaws", description: "Internal rules for a corporation", category: "Corporate", jurisdiction: "canada" },
  { id: "c7", name: "Board Resolution", description: "Record formal board decisions", category: "Corporate", jurisdiction: "canada" },
  { id: "c8", name: "Shareholder Meeting Minutes", description: "Record of shareholder meetings", category: "Corporate", jurisdiction: "canada" },
  { id: "c9", name: "Stock Purchase Agreement", description: "Buy or sell company shares", category: "Corporate", jurisdiction: "canada" },
  { id: "c10", name: "Stock Transfer Form", description: "Transfer share ownership", category: "Corporate", jurisdiction: "canada" },
  { id: "c11", name: "Buy-Sell Agreement", description: "Govern share transfers among owners", category: "Corporate", jurisdiction: "canada" },
  { id: "c12", name: "Business Plan Template", description: "Structured business plan document", category: "Corporate", jurisdiction: "canada" },

  // ---------- Employment ----------
  { id: "e1", name: "Employment Contract", description: "Full-time or part-time employee agreement", category: "Employment", jurisdiction: "canada" },
  { id: "e2", name: "Offer of Employment Letter", description: "Formal job offer letter", category: "Employment", jurisdiction: "canada" },
  { id: "e3", name: "Termination Letter", description: "Formal employee termination", category: "Employment", jurisdiction: "canada" },
  { id: "e4", name: "Resignation Letter", description: "Employee resignation template", category: "Employment", jurisdiction: "canada" },
  { id: "e5", name: "Non-Compete Agreement", description: "Restrict competing post-employment", category: "Employment", jurisdiction: "canada" },
  { id: "e6", name: "Non-Solicitation Agreement", description: "Restrict soliciting clients/employees", category: "Employment", jurisdiction: "canada" },
  { id: "e7", name: "Employee NDA", description: "Confidentiality for employees", category: "Employment", jurisdiction: "canada" },
  { id: "e8", name: "Employee Handbook", description: "Workplace policies & procedures", category: "Employment", jurisdiction: "canada" },
  { id: "e9", name: "Internship Agreement", description: "Paid or unpaid internship terms", category: "Employment", jurisdiction: "canada" },
  { id: "e10", name: "Severance Agreement", description: "Terms of separation and release", category: "Employment", jurisdiction: "canada" },
  { id: "e11", name: "Commission Agreement", description: "Sales commission structure", category: "Employment", jurisdiction: "canada" },

  // ---------- Real Estate ----------
  { id: "r1", name: "Residential Lease Agreement", description: "Long-term rental of a residence", category: "Real Estate", jurisdiction: "canada" },
  { id: "r2", name: "Month-to-Month Lease", description: "Periodic residential tenancy", category: "Real Estate", jurisdiction: "canada" },
  { id: "r3", name: "Commercial Lease Agreement", description: "Lease of commercial premises", category: "Real Estate", jurisdiction: "canada" },
  { id: "r4", name: "Sublease Agreement", description: "Sublet rented premises", category: "Real Estate", jurisdiction: "canada" },
  { id: "r5", name: "Roommate Agreement", description: "Shared living arrangement terms", category: "Real Estate", jurisdiction: "canada" },
  { id: "r6", name: "Rental Application", description: "Tenant screening application", category: "Real Estate", jurisdiction: "canada" },
  { id: "r7", name: "Eviction Notice", description: "Notice to vacate / quit", category: "Real Estate", jurisdiction: "canada" },
  { id: "r8", name: "Notice to Pay Rent or Quit", description: "Demand overdue rent", category: "Real Estate", jurisdiction: "canada" },
  { id: "r9", name: "Lease Termination Letter", description: "End a lease early or on notice", category: "Real Estate", jurisdiction: "canada" },
  { id: "r10", name: "Lease Amendment", description: "Modify an existing lease", category: "Real Estate", jurisdiction: "canada" },
  { id: "r11", name: "Lease Assignment", description: "Transfer lease to a new tenant", category: "Real Estate", jurisdiction: "canada" },
  { id: "r12", name: "Real Estate Purchase Agreement", description: "Buy or sell residential property", category: "Real Estate", jurisdiction: "canada" },
  { id: "r13", name: "Offer to Purchase Real Estate", description: "Initial purchase offer", category: "Real Estate", jurisdiction: "canada" },
  { id: "r16", name: "Mortgage Agreement", description: "Secure a real estate loan", category: "Real Estate", jurisdiction: "canada" },
  { id: "r18", name: "Property Management Agreement", description: "Hire a property manager", category: "Real Estate", jurisdiction: "canada" },
  { id: "r19", name: "Vacation Rental Agreement", description: "Short-term vacation rental terms", category: "Real Estate", jurisdiction: "canada" },
  { id: "r20", name: "Storage Space Lease", description: "Rent storage units or space", category: "Real Estate", jurisdiction: "canada" },
  { id: "r21", name: "Parking Space Lease", description: "Rent a parking spot", category: "Real Estate", jurisdiction: "canada" },

  // ---------- Estate Planning ----------
  { id: "es1", name: "Last Will and Testament", description: "Direct distribution of your estate", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es2", name: "Codicil to a Will", description: "Amend an existing will", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es3", name: "Living Will / Advance Directive", description: "End-of-life medical directives", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es4", name: "Living Trust", description: "Revocable living trust", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es5", name: "Power of Attorney (General)", description: "Appoint an attorney-in-fact", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es6", name: "Power of Attorney (Financial)", description: "Authority over financial matters", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es7", name: "Power of Attorney (Medical)", description: "Healthcare decision authority", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es8", name: "Revocation of Power of Attorney", description: "Revoke a prior POA", category: "Estate Planning", jurisdiction: "canada" },
  { id: "es9", name: "Estate Planning Worksheet", description: "Organize estate information", category: "Estate Planning", jurisdiction: "canada" },

  // ---------- Family ----------
  { id: "f1", name: "Prenuptial Agreement", description: "Pre-marriage property agreement", category: "Family", jurisdiction: "canada" },
  { id: "f2", name: "Postnuptial Agreement", description: "Post-marriage property agreement", category: "Family", jurisdiction: "canada" },
  { id: "f3", name: "Cohabitation Agreement", description: "Unmarried couples living together", category: "Family", jurisdiction: "canada" },
  { id: "f4", name: "Separation Agreement", description: "Terms of marital separation", category: "Family", jurisdiction: "canada" },
  { id: "f5", name: "Divorce Settlement Agreement", description: "Resolve issues in divorce", category: "Family", jurisdiction: "canada" },
  { id: "f6", name: "Child Custody Agreement", description: "Parenting time & custody plan", category: "Family", jurisdiction: "canada" },
  { id: "f7", name: "Child Support Agreement", description: "Financial support for children", category: "Family", jurisdiction: "canada" },
  { id: "f8", name: "Parenting Plan", description: "Detailed co-parenting schedule", category: "Family", jurisdiction: "canada" },
  { id: "f9", name: "Pet Custody Agreement", description: "Shared care of pets", category: "Family", jurisdiction: "canada" },
  { id: "f10", name: "Name Change Notification", description: "Notify parties of legal name change", category: "Family", jurisdiction: "canada" },

  // ---------- Financial / Loans ----------
  { id: "l1", name: "Promissory Note", description: "Written promise to repay a debt", category: "Loans", jurisdiction: "canada" },
  { id: "l2", name: "Loan Agreement", description: "Terms of a personal or business loan", category: "Loans", jurisdiction: "canada" },
  { id: "l3", name: "IOU", description: "Simple acknowledgment of debt", category: "Loans", jurisdiction: "canada" },
  { id: "l4", name: "Personal Guarantee", description: "Guarantee another's obligation", category: "Loans", jurisdiction: "canada" },
  { id: "l5", name: "Debt Settlement Agreement", description: "Settle outstanding debt", category: "Financial", jurisdiction: "canada" },
  { id: "l6", name: "Demand Letter for Payment", description: "Demand repayment of money owed", category: "Financial", jurisdiction: "canada" },
  { id: "l7", name: "Security Agreement", description: "Grant security interest in assets", category: "Financial", jurisdiction: "canada" },
  { id: "l8", name: "Release of Liability (Waiver)", description: "Waive claims against another party", category: "Financial", jurisdiction: "canada" },
  { id: "l9", name: "Receipt Template", description: "Acknowledge receipt of payment", category: "Financial", jurisdiction: "canada" },
  { id: "l10", name: "Invoice Template", description: "Bill for goods or services", category: "Financial", jurisdiction: "canada" },

  // ---------- IP & Releases ----------
  { id: "ip1", name: "Copyright Assignment", description: "Transfer copyright ownership", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip2", name: "Copyright License Agreement", description: "License the use of copyrighted work", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip3", name: "Trademark License Agreement", description: "License use of a trademark", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip4", name: "Trademark Assignment", description: "Transfer trademark ownership", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip5", name: "Photo / Model Release", description: "Permission to use images of a person", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip6", name: "Video Release Form", description: "Permission to use video footage", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip7", name: "Media Release Form", description: "General media use consent", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip8", name: "Website Terms of Use", description: "Govern use of a website", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip9", name: "Privacy Policy", description: "Disclose data collection practices", category: "IP & Releases", jurisdiction: "canada" },
  { id: "ip10", name: "EULA (End-User License Agreement)", description: "License terms for software", category: "IP & Releases", jurisdiction: "canada" },

  // ---------- Misc Service ----------
  { id: "s1", name: "Childcare / Nanny Contract", description: "In-home childcare services", category: "Service", jurisdiction: "canada" },
  { id: "s2", name: "Pet Care Agreement", description: "Pet sitting or boarding services", category: "Service", jurisdiction: "canada" },
  { id: "s3", name: "Cleaning Services Agreement", description: "Residential or commercial cleaning", category: "Service", jurisdiction: "canada" },
  { id: "s4", name: "Landscaping Services Agreement", description: "Lawn & garden maintenance", category: "Service", jurisdiction: "canada" },
  { id: "s5", name: "Home Renovation Contract", description: "Residential construction work", category: "Service", jurisdiction: "canada" },
  { id: "s6", name: "Construction Contract", description: "General construction agreement", category: "Service", jurisdiction: "canada" },
  { id: "s7", name: "Vehicle Bill of Sale", description: "Sell or buy a vehicle", category: "Business", jurisdiction: "canada" },
  { id: "s8", name: "Vehicle Lease Agreement", description: "Lease a personal vehicle", category: "Business", jurisdiction: "canada" },
  { id: "s9", name: "Boat Bill of Sale", description: "Sell or buy a boat", category: "Business", jurisdiction: "canada" },
  { id: "s10", name: "Equipment Rental Agreement", description: "Rent out tools or equipment", category: "Business", jurisdiction: "canada" },

  // ---------- Procurement ----------
  { id: "p1", name: "Master Services Agreement (MSA)", description: "Umbrella terms governing all vendor engagements", category: "Procurement", jurisdiction: "canada" },
  { id: "p2", name: "SaaS Subscription Agreement", description: "Cloud software subscription terms and licensing", category: "Procurement", jurisdiction: "canada" },
  { id: "p3", name: "Procurement Consulting Agreement", description: "Engage a consultant on a procurement mandate", category: "Procurement", jurisdiction: "canada" },
  { id: "p4", name: "Subcontracting Agreement", description: "Flow down prime contract terms to a subcontractor", category: "Procurement", jurisdiction: "canada" },
  { id: "p5", name: "Statement of Work (SOW)", description: "Scope, deliverables, milestones and acceptance", category: "Procurement", jurisdiction: "canada" },
  { id: "p6", name: "Request for Proposal (RFP) Template", description: "Issue a competitive RFP to the market", category: "Procurement", jurisdiction: "canada" },
  { id: "p7", name: "Request for Quotation (RFQ) Template", description: "Solicit priced quotations from suppliers", category: "Procurement", jurisdiction: "canada" },
  { id: "p8", name: "Purchase Order Terms & Conditions", description: "Standard terms attached to purchase orders", category: "Procurement", jurisdiction: "canada" },
  { id: "p9", name: "Supplier / Vendor Agreement", description: "Ongoing supply of goods or services", category: "Procurement", jurisdiction: "canada" },
  { id: "p10", name: "Service Level Agreement (SLA)", description: "Performance targets, credits and remedies", category: "Procurement", jurisdiction: "canada" },
  { id: "p11", name: "Bid / Tender Submission Agreement", description: "Terms governing a tender submission", category: "Procurement", jurisdiction: "canada" },
  { id: "p12", name: "Data Processing Agreement (DPA)", description: "Privacy and data handling obligations of a vendor", category: "Procurement", jurisdiction: "canada" },
  { id: "p13", name: "Supply of Goods Agreement", description: "Recurring supply of goods with delivery terms", category: "Procurement", jurisdiction: "canada" },
  { id: "p14", name: "Supplier Code of Conduct", description: "Ethics, labour and compliance standards for vendors", category: "Procurement", jurisdiction: "canada" },
  { id: "p15", name: "Change Order / Contract Amendment", description: "Amend scope, price or schedule of a contract", category: "Procurement", jurisdiction: "canada" },
  { id: "p16", name: "Teaming Agreement", description: "Joint bidding arrangement between contractors", category: "Procurement", jurisdiction: "canada" },
];

// ---------- Regions ----------
type Region = {
  id: string;
  label: string;
  flag: string;
  locked: boolean;
  note: string;
};

const REGIONS: Region[] = [
  { id: "canada", label: "Canada", flag: "🇨🇦", locked: false, note: "Reviewed by licensed Canadian lawyers and paralegals." },
  { id: "usa", label: "USA", flag: "🇺🇸", locked: true, note: "State-specific US templates — launching soon." },
  { id: "mexico", label: "Mexico", flag: "🇲🇽", locked: true, note: "Spanish-language Mexican templates — launching soon." },
  { id: "india", label: "India", flag: "🇮🇳", locked: true, note: "Indian Contract Act compliant templates — launching soon." },
  { id: "china", label: "China", flag: "🇨🇳", locked: true, note: "PRC contract law templates — launching soon." },
  { id: "guyana", label: "Guyana", flag: "🇬🇾", locked: true, note: "Guyanese templates — launching soon." },
  { id: "uk", label: "United Kingdom", flag: "🇬🇧", locked: true, note: "England & Wales templates — launching soon." },
  { id: "uae", label: "UAE", flag: "🇦🇪", locked: true, note: "UAE / Gulf templates — launching soon." },
  { id: "philippines", label: "Philippines", flag: "🇵🇭", locked: true, note: "Philippine templates — launching soon." },
];

// Every region carries the same full catalog, localized to that jurisdiction.
function contractsForRegion(regionId: string): ContractTemplate[] {
  if (regionId === "canada") return fallbackContracts;
  return fallbackContracts.map((c) => ({
    ...c,
    id: `${regionId}-${c.id}`,
    jurisdiction: regionId,
  }));
}

export type ContractLanguage = "en" | "fr";

export const LANGUAGE_PRICE: Record<ContractLanguage, string> = {
  en: "4.99",
  fr: "5.99",
};

export const LANGUAGE_LABEL: Record<ContractLanguage, string> = {
  en: "English",
  fr: "Français (French)",
};

interface ContractCardProps {
  contract: ContractTemplate;
  hasSubscription: boolean;
  locked?: boolean;
  language: ContractLanguage;
  getJurisdictionLabel: (j: string) => string;
  onPreview: (c: ContractTemplate) => void;
}

function ContractCard({ contract: rawContract, hasSubscription, locked, language, getJurisdictionLabel, onPreview }: ContractCardProps) {
  const contract = localizeContract(rawContract, language);
  const categoryLabel = localizeCategory(rawContract.category, language);
  // UI chrome stays in English in both language modes — only the contract itself is French.
  const t = {
    locked: "Locked",
    preview: "Preview",
    previewTitle: "Free watermarked preview",
    download: "Download",
    version: "Version",
    pdf: "Download as PDF",
    docx: "Download as Word (.docx)",
    subscribe: `Subscribe $${language === "fr" ? LANGUAGE_PRICE.fr : LANGUAGE_PRICE.en}`,
  };
  if (locked) {
    return (
      <Card className="relative overflow-hidden border-dashed">
        <CardContent className="p-6 opacity-60">
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </div>
            <Badge variant="outline" className="text-xs">
              {getJurisdictionLabel(contract.jurisdiction)}
            </Badge>
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">{contract.name}</h3>
          <p className="text-sm text-muted-foreground font-body mb-4">{contract.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{categoryLabel}</Badge>
            <Badge variant="outline" className="gap-1 text-xs">
              <Lock className="h-3 w-3" />
              {t.locked}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
            <FileText className="h-6 w-6 text-secondary" />
          </div>
          <Badge variant="outline" className="text-xs">
            {getJurisdictionLabel(contract.jurisdiction)}
          </Badge>
        </div>
        <h3 className="font-display font-semibold text-foreground mb-2">
          {contract.name}
        </h3>
        <p className="text-sm text-muted-foreground font-body mb-4">
          {contract.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{categoryLabel}</Badge>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground" title={t.previewTitle} onClick={() => onPreview(rawContract)}>
              <Eye className="h-3 w-3" />
              {t.preview}
            </Button>
            {hasSubscription ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Download className="h-3 w-3" />
                    {t.download}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-xs text-muted-foreground font-body">
                    {t.version}: 🇨🇦 Canada · {LANGUAGE_LABEL[language]}
                  </div>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <FileDown className="h-4 w-4" />
                    {t.pdf}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    {t.docx}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" variant="outline" className="gap-1" asChild>
                <Link to={`/checkout?plan=contracts&lang=${language}`}>
                  <Lock className="h-3 w-3" />
                  {t.subscribe}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContractsPage() {
  const { user } = useAuth();
  const [canadaContracts, setCanadaContracts] = useState<ContractTemplate[]>(fallbackContracts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hasSubscription, setHasSubscription] = useState(false);
  const [previewContract, setPreviewContract] = useState<ContractTemplate | null>(null);
  const [showAllSections, setShowAllSections] = useState(false);
  const [activeRegionId, setActiveRegionId] = useState<string>("canada");
  const [language, setLanguage] = useState<ContractLanguage>("en");

  const activeRegion = REGIONS.find((r) => r.id === activeRegionId) ?? REGIONS[0];

  useEffect(() => {
    async function fetchContracts() {
      const { data } = await supabase
        .from("contract_templates")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (data && data.length > 0) {
        setCanadaContracts(data);
      }
    }

    async function checkSubscription() {
      if (user) {
        const { data } = await supabase
          .from("contract_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        setHasSubscription(!!data);
      }
    }

    fetchContracts();
    checkSubscription();
  }, [user]);

  const regionContracts =
    activeRegion.id === "canada"
      ? canadaContracts
      : contractsForRegion(activeRegion.id);

  const isFrench = activeRegion.id === "canada" && language === "fr";

  const filteredContracts = regionContracts.filter((contract) => {
    const fr = localizeContract(contract, isFrench ? "fr" : "en");
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      contract.name.toLowerCase().includes(q) ||
      (contract.description?.toLowerCase().includes(q) ?? false) ||
      fr.name.toLowerCase().includes(q) ||
      (fr.description?.toLowerCase().includes(q) ?? false);
    const matchesCategory = selectedCategory === "All" || contract.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getJurisdictionLabel = (jurisdiction: string) => {
    const r = REGIONS.find((x) => x.id === jurisdiction);
    return r ? `${r.flag} ${r.label}` : `${activeRegion.flag} ${activeRegion.label}`;
  };


  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium font-body">Contract Library</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Professional Legal Contracts
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body text-balance">
            Download professionally drafted contracts from{" "}
            <span className="whitespace-nowrap font-semibold text-secondary">$4.99/month</span>.
            All templates reviewed by licensed attorneys.
          </p>
        </div>
      </section>

      {/* Subscription Banner */}
      {!hasSubscription && (
        <section className="py-6 bg-secondary/10 border-y border-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <Star className="h-6 w-6 text-gold shrink-0 mt-1 sm:mt-0" />
                <div className="min-w-0">
                  <div className="font-display font-semibold text-foreground flex flex-wrap items-baseline gap-x-1.5">
                    <span>Unlimited Access for</span>
                    <span className="whitespace-nowrap text-secondary">
                      ${LANGUAGE_PRICE[language]}<span className="text-sm font-body text-muted-foreground">/month</span>
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground font-body">
                    {language === "fr"
                      ? "French templates — $1/month more than English. Download any contract, anytime."
                      : "Download any contract, anytime. Cancel whenever."}
                  </div>
                </div>
              </div>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0" asChild>
                <Link to={`/checkout?plan=contracts&lang=${language}`}>
                  Subscribe Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}


      {/* Contracts List */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <LegalDisclaimer context="contracts" className="mb-8" />

          {/* Region Tabs */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-display text-lg font-semibold text-foreground">Select your region</h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((region) => (
                <Button
                  key={region.id}
                  variant={activeRegionId === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveRegionId(region.id)}
                  className={`gap-2 ${activeRegionId === region.id ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""} ${region.locked ? "opacity-80" : ""}`}
                >
                  <span aria-hidden>{region.flag}</span>
                  {region.label}
                  {region.locked && <Lock className="h-3 w-3" />}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-body mt-3">{activeRegion.note}</p>
          </div>

          {/* Language Tabs (Canada) */}
          {activeRegion.id === "canada" && (
            <div className="mb-8 rounded-xl border border-border bg-muted/30 p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-display font-semibold text-foreground mb-1">
                    Choose your template language
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    English templates are included at{" "}
                    <span className="whitespace-nowrap font-medium text-foreground">$4.99/mo</span>. French
                    (Français) templates are $1 more —{" "}
                    <span className="whitespace-nowrap font-medium text-foreground">$5.99/mo</span>.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  {(["en", "fr"] as ContractLanguage[]).map((lang) => (
                    <Button
                      key={lang}
                      size="sm"
                      variant={language === lang ? "default" : "outline"}
                      onClick={() => setLanguage(lang)}
                      className={`h-9 gap-2 px-3 ${language === lang ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}`}
                    >
                      <span className="whitespace-nowrap">{LANGUAGE_LABEL[lang]}</span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-body leading-none px-1.5 py-0.5 whitespace-nowrap ${
                          language === lang ? "border-secondary-foreground/40 text-secondary-foreground" : ""
                        }`}
                      >
                        ${LANGUAGE_PRICE[lang]}/mo
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeRegion.locked && (
            <div className="mb-8 rounded-xl border border-secondary/30 bg-secondary/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <div className="font-display font-semibold text-foreground">
                    {activeRegion.flag} {activeRegion.label} library is locked
                  </div>
                  <div className="text-sm text-muted-foreground font-body">
                    Browse the full catalogue below. Downloads and previews unlock when this region goes live.
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => setActiveRegionId("canada")} className="gap-2">
                🇨🇦 Switch to Canada
              </Button>
            </div>
          )}

          {/* Filters */}


          <div className="flex flex-col gap-4 mb-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search contracts by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 text-base"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    if (category === "All") {
                      setShowAllSections(true);
                    } else {
                      setShowAllSections(false);
                    }
                  }}
                  className={selectedCategory === category ? "bg-secondary hover:bg-secondary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Contracts Grid */}
          {selectedCategory === "All" ? (
            <div className="space-y-12">
              {categories.filter((c) => c !== "All").slice(0, showAllSections ? undefined : 5).map((cat) => {
                const items = filteredContracts.filter((c) => c.category === cat);
                if (items.length === 0) return null;
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        {cat}
                      </h2>
                      <div className="h-px flex-1 bg-border" />
                      <Badge variant="outline" className="text-xs">
                        {items.length} {items.length === 1 ? "template" : "templates"}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((contract) => (
                        <ContractCard
                          key={contract.id}
                          contract={contract}
                          hasSubscription={hasSubscription}
                          locked={activeRegion.locked}
                          language={isFrench ? "fr" : "en"}
                          getJurisdictionLabel={getJurisdictionLabel}
                          onPreview={setPreviewContract}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
              {!showAllSections && categories.filter((c) => c !== "All").length > 5 && (
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAllSections(true)}
                    className="gap-2"
                  >
                    Show All Sections ({categories.filter((c) => c !== "All").length - 5} more)
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContracts.map((contract) => (
                <ContractCard
                  key={contract.id}
                  contract={contract}
                  hasSubscription={hasSubscription}
                  locked={activeRegion.locked}
                  language={isFrench ? "fr" : "en"}
                  getJurisdictionLabel={getJurisdictionLabel}
                  onPreview={setPreviewContract}
                />
              ))}
            </div>
          )}

          {filteredContracts.length === 0 && (
            <div className="text-center py-16 md:py-16 md:py-20 lg:py-24">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No contracts found
              </h3>
              <p className="text-muted-foreground font-body">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Why Choose Our Contracts?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 mx-auto mb-4">
                <Check className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Attorney Reviewed
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                Every template is reviewed and updated by licensed attorneys 
                in Canada.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 mx-auto mb-4">
                <Download className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Multiple Formats
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                Download contracts in PDF or Word (.docx) format — ready to 
                customize for your specific needs.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 mx-auto mb-4">
                <FileText className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Easy Customization
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                All templates come in editable formats ready for your 
                specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContractPreviewDialog
        contract={previewContract}
        onClose={() => setPreviewContract(null)}
        hasSubscription={hasSubscription}
        language={language}
      />

    </Layout>
  );
}
