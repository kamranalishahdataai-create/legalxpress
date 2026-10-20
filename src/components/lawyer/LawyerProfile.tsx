import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LawyerProfileProps {
  lawyer: {
    id: string;
    full_name: string;
    lso_number: string;
    email: string | null;
    phone: string | null;
    bio: string | null;
    google_calendar_id: string | null;
  };
}

export function LawyerProfile({ lawyer }: LawyerProfileProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    phone: lawyer.phone ?? "",
    email: lawyer.email ?? "",
    google_calendar_id: lawyer.google_calendar_id ?? "",
    bio: lawyer.bio ?? "",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("lawyers")
      .update({
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        google_calendar_id: form.google_calendar_id.trim() || null,
        bio: form.bio.trim() || null,
      })
      .eq("id", lawyer.id);
    setSaving(false);
    toast(error ? { title: "Could not save", description: error.message, variant: "destructive" } : { title: "Profile saved" });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><UserCog className="h-5 w-5" />My Profile</CardTitle>
        <CardDescription>{lawyer.full_name} · LSO #{lawyer.lso_number}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <Label htmlFor="lp-email">Email (receives booking invites)</Label>
          <Input id="lp-email" type="email" maxLength={255} value={form.email} onChange={set("email")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lp-cal">Google Calendar for bookings</Label>
          <Input id="lp-cal" maxLength={255} value={form.google_calendar_id} onChange={set("google_calendar_id")} placeholder="you@legalxpress.ca" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lp-phone">Phone</Label>
          <Input id="lp-phone" maxLength={40} value={form.phone} onChange={set("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lp-bio">Bio</Label>
          <Textarea id="lp-bio" rows={5} maxLength={2000} value={form.bio} onChange={set("bio")} />
        </div>
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save profile"}</Button>
      </CardContent>
    </Card>
  );
}
