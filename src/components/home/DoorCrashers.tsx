import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { featuredServices } from "@/data/featuredServices";
import { PriceNotice, ProviderNotice } from "@/components/legal/PracticeNotice";
export function DoorCrashers() {
  return <section id="deals" className="section-y bg-muted/40 border-b border-border"><div className="container gutter-x">
    <div className="max-w-3xl mb-10"><p className="text-sm font-semibold text-forest mb-3">Published fees</p><h2 className="font-display text-3xl md:text-4xl mb-4">Featured fixed-price services</h2><p className="text-muted-foreground">Member fees apply to the scope below. HST, filing fees and disbursements are extra. Services at a $0 member fee on higher plans are identified in the plan comparison.</p></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{featuredServices.map(service => <article key={service.id} className="bg-card rounded-lg p-6 border border-border flex flex-col"><FileText className="h-6 w-6 text-forest mb-5" /><h3 className="font-display text-2xl mb-4">{service.title}</h3><p className="font-display text-3xl mb-1">${service.memberFee} <span className="font-body text-sm text-muted-foreground">+ HST{service.id === "notary" ? " / document" : ""}</span></p><p className="text-sm text-muted-foreground mb-5">Member fee</p><p className="text-sm text-muted-foreground mb-4">{service.scope}</p><p className="text-xs leading-relaxed text-muted-foreground mb-4">{service.exclusion}</p><ProviderNotice /><PriceNotice className="mt-4 mb-6" /><div className="mt-auto space-y-2"><Button className="w-full" asChild><Link to={`/book?service=${service.id}`}>Book consultation <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button variant="link" className="px-0" asChild><Link to="/subscriptions">Compare member plans</Link></Button></div></article>)}</div>
  </div></section>;
}
