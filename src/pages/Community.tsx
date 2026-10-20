import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Share2, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
export default function CommunityPage() {
 const [copied, setCopied] = useState(false);
 async function copyLink() { try { await navigator.clipboard.writeText(`${window.location.origin}/book`); setCopied(true); } catch { toast.error("Unable to copy. Please share the booking page address."); } }
 return <Layout><section className="py-16 hero-gradient"><div className="container gutter-x max-w-3xl"><Share2 className="h-8 w-8 text-secondary mb-5" /><h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-5">Share LegalXpress</h1><p className="text-lg text-primary-foreground/80">Know someone who needs legal help? Send them our booking link or have them call (647) 200-9104.</p></div></section><section className="section-y"><div className="container gutter-x max-w-3xl space-y-6"><h2 className="font-display text-2xl">A simple introduction, without rewards</h2><p className="text-muted-foreground">Law Society of Ontario rules do not allow a law practice to pay, gift or enter anyone into a draw for referring clients, so we do not. Anyone you send us can book a free initial 30-minute consultation and receives the same published pricing shown on this website.</p><p className="text-muted-foreground">Let them contact us directly. Please do not send another person’s details or confidential information without their permission.</p><div className="flex flex-wrap gap-3"><Button onClick={copyLink}>{copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}{copied ? "Booking link copied" : "Copy booking link"}</Button><Button variant="outline" asChild><Link to="/book">Open booking page</Link></Button><Button variant="link" asChild><a href="tel:+16472009104"><Phone className="h-4 w-4 mr-2" />(647) 200-9104</a></Button></div></div></section></Layout>;
}
