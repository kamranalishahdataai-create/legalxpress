import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

type Scene = { title: string; text: string };
type Screen = { heading: string; items: string[] };

export function StorylineDemo({ name, image, plan, steps, screens }: {
  name: string; image: string; plan: string; steps: Scene[]; screens: Screen[];
}) {
  const [index, setIndex] = useState(0);
  const scene = steps[index];
  const screen = screens[index];
  if (!scene || !screen) return null;
  return <div aria-label={`${name} visual storyline`}>
    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
      <div>
        <img src={image} alt={`Fictional customer ${name}`} loading="lazy" width={1024} height={768} className="w-full aspect-[4/3] object-cover rounded-lg" />
        <div className="flex items-start justify-between gap-4 border-b border-border py-5">
          <div><p className="font-display text-2xl">{name}</p><p className="text-sm text-muted-foreground mt-1">{plan}</p></div>
          <div className="text-right shrink-0"><p className="text-3xl font-semibold text-partner">$0</p><p className="text-xs text-muted-foreground">Membership fee</p></div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Fictional customer · illustrative portrait · proposal only</p>
      </div>
      <div>
        <div className="border border-border rounded-lg bg-card overflow-hidden" aria-label="Story concept screen">
          <div className="bg-partner text-partner-foreground px-5 py-4 flex items-center justify-between gap-3"><span className="font-semibold flex items-center gap-2"><Smartphone className="h-5 w-5" />{index === 0 ? "Rogers" : "LegalXpress"}</span><span className="text-xs">CONCEPT SCREEN</span></div>
          <div className="p-5 sm:p-7 min-h-64">
            <p className="text-xs text-partner mb-3">SCENE {index + 1} / {steps.length}</p>
            <h4 className="font-display text-2xl mb-6">{screen.heading}</h4>
            <ul className="space-y-4">{screen.items.map(item => <li key={item} className="flex gap-3 text-sm"><Check className="h-5 w-5 text-partner-support shrink-0" />{item}</li>)}</ul>
          </div>
          <div className="border-t border-border px-5 py-3 flex gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0" />No live account, payment or legal matter is created.</div>
        </div>
        <div className="pt-6" aria-live="polite">
          <h3 className="font-display text-xl mb-3">{scene.title}</h3>
          <p className="text-sm text-muted-foreground">{scene.text}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 border-t border-border pt-5">
      <div className="flex gap-1" aria-label="Story scenes">{steps.map((s, i) => <Button key={s.title} variant="ghost" size="icon" aria-label={`Scene ${i + 1}: ${s.title}`} aria-current={index === i ? "step" : undefined} onClick={() => setIndex(i)} className={index === i ? "bg-partner-soft text-partner border-b-2 border-partner rounded-none" : "text-muted-foreground"}>{i + 1}</Button>)}</div>
      <div className="flex gap-2"><Button variant="outline" size="icon" aria-label="Previous scene" title="Previous scene" disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft /></Button><Button variant="partner" onClick={() => setIndex(index === steps.length - 1 ? 0 : index + 1)}>{index === steps.length - 1 ? "Replay story" : "Next scene"}<ArrowRight /></Button></div>
    </div>
  </div>;
}