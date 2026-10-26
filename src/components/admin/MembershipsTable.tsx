import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PLANS = ["Essential", "Starter", "Professional", "Executive", "Business Starter", "Corporate Package A", "Corporate Package B", "Corporate Package C"] as const;

interface ProfileHit {
  id: string;
  email: string | null;
  full_name: string | null;
}

interface MembershipRow {
  id: string;
  plan: string;
  is_active: boolean;
  started_at: string;
}

/**
 * Admin tool for recording memberships. Payment is arranged offline (checkout
 * is not self-serve), so an admin activates the membership here once payment
 * arrangements are confirmed. This record gates member-only features such as
 * the Claim Drafter.
 */
export function MembershipsTable() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [profile, setProfile] = useState<ProfileHit | null>(null);
  const [membership, setMembership] = useState<MembershipRow | null>(null);
  const [plan, setPlan] = useState<string>(PLANS[0]);
  const [saving, setSaving] = useState(false);

  const search = async () => {
    if (!email.trim()) return;
    setSearching(true);
    setProfile(null);
    setMembership(null);
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .ilike("email", email.trim())
      .limit(1);
    if (error) {
      toast({ title: "Search failed", description: "Could not look up that account.", variant: "destructive" });
      setSearching(false);
      return;
    }
    const hit = profiles?.[0] ?? null;
    setProfile(hit);
    if (hit) {
      const { data: row } = await supabase
        .from("memberships")
        .select("id, plan, is_active, started_at")
        .eq("user_id", hit.id)
        .maybeSingle();
      setMembership(row ?? null);
      if (row) setPlan(row.plan);
    }
    setSearching(false);
  };

  const activate = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from("memberships")
      .upsert({ user_id: profile.id, plan, is_active: true }, { onConflict: "user_id" });
    setSaving(false);
    if (error) {
      toast({ title: "Couldn't activate", description: "The membership was not saved.", variant: "destructive" });
      return;
    }
    toast({ title: "Membership active", description: `${profile.email} is now an active ${plan} member.` });
    await search();
  };

  const deactivate = async () => {
    if (!membership) return;
    setSaving(true);
    const { error } = await supabase.from("memberships").update({ is_active: false }).eq("id", membership.id);
    setSaving(false);
    if (error) {
      toast({ title: "Couldn't deactivate", description: "The membership was not changed.", variant: "destructive" });
      return;
    }
    toast({ title: "Membership deactivated" });
    await search();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display">Memberships</CardTitle>
        <CardDescription>
          Memberships are paid offline (online payment activation is not available). After payment arrangements are
          confirmed with the client, record the membership here. An active membership unlocks member-only features
          such as the Claim Drafter.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-2 flex-1 min-w-[220px]">
            <Label htmlFor="member-email">Client account email</Label>
            <Input id="member-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@example.com" />
          </div>
          <Button onClick={search} disabled={searching || !email.trim()}>{searching ? "Searching…" : "Look up account"}</Button>
        </div>

        {profile ? (
          <div className="rounded-lg border border-border p-4 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <p className="font-medium text-foreground">{profile.full_name || "Unnamed account"}</p>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
              {membership?.is_active ? (
                <Badge className="bg-forest/10 text-forest">Active · {membership.plan}</Badge>
              ) : membership ? (
                <Badge variant="outline">Inactive · was {membership.plan}</Badge>
              ) : (
                <Badge variant="outline">No membership</Badge>
              )}
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <div className="space-y-2 min-w-[220px]">
                <Label>Plan</Label>
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PLANS.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={activate} disabled={saving}>{saving ? "Saving…" : membership?.is_active ? "Update plan" : "Activate membership"}</Button>
              {membership?.is_active && (
                <Button variant="outline" onClick={deactivate} disabled={saving}>Deactivate</Button>
              )}
            </div>
            {membership && (
              <p className="text-xs text-muted-foreground">
                Recorded {new Date(membership.started_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}.
              </p>
            )}
          </div>
        ) : (
          !searching && email && <p className="text-sm text-muted-foreground">Look up an account by email to manage its membership.</p>
        )}
      </CardContent>
    </Card>
  );
}
