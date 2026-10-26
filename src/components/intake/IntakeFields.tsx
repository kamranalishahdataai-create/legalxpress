import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function IntakeField({ id, label, value, onChange, hint, multiline = false, type = "text" }: { id: string; label: string; value: string; onChange: (v: string) => void; hint?: string; multiline?: boolean; type?: string }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{multiline ? <Textarea id={id} value={value} onChange={e => onChange(e.target.value)} maxLength={3000} rows={3} /> : <Input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} maxLength={500} className="h-12" />}{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>;
}
export function IntakeSelect({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger id={id}><SelectValue placeholder="Please choose" /></SelectTrigger><SelectContent>{options.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>;
}
export function IntakeConsent({ id, checked, onChange, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return <div className="flex items-start gap-3"><Checkbox id={id} checked={checked} onCheckedChange={v => onChange(v === true)} className="mt-1" /><Label htmlFor={id} className="font-normal leading-relaxed">{children}</Label></div>;
}