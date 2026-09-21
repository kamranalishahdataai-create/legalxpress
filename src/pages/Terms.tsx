import { Layout } from "@/components/layout/Layout";

const sections = [
  { id: "acceptance", title: "1. Agreement and Acceptance" },
  { id: "eligibility", title: "2. Eligibility and Accounts" },
  { id: "relationship", title: "3. No Solicitor-Client Relationship Until Engaged" },
  { id: "scope-services", title: "4. Scope of Services" },
  { id: "memberships", title: "5. Memberships, Billing and Renewal" },
  { id: "cancellation", title: "6. Cancellation, Refunds and Fair Use" },
  { id: "consultations", title: "7. Consultations and Bookings" },
  { id: "templates", title: "8. Contract Library Licence" },
  { id: "ai", title: "9. AI-Assisted Tools" },
  { id: "referrals", title: "10. Affiliate Partners and Referrals" },
  { id: "conduct", title: "11. Acceptable Use" },
  { id: "ip", title: "12. Intellectual Property" },
  { id: "confidentiality", title: "13. Confidentiality and Conflicts" },
  { id: "disclaimer", title: "14. Disclaimers" },
  { id: "liability", title: "15. Limitation of Liability" },
  { id: "indemnity", title: "16. Indemnity" },
  { id: "suspension", title: "17. Suspension and Termination" },
  { id: "electronic", title: "18. Electronic Communications and Signatures" },
  { id: "disputes", title: "19. Governing Law and Dispute Resolution" },
  { id: "general", title: "20. General Terms" },
  { id: "contact", title: "21. Contact and Complaints" },
];

const Terms = () => {
  const updated = new Date().toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Layout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="font-body text-muted-foreground mb-10">
            Last updated: {updated} &middot; These terms govern the LegalXpress website, memberships,
            contract library, AI-assisted tools and legal services provided in Canada.
          </p>

          <div className="rounded-xl border border-secondary/40 bg-secondary/10 p-6 mb-10">
            <p className="font-body text-sm text-foreground leading-relaxed">
              <strong>Please read carefully.</strong> These terms include limits on our liability, a
              licence that restricts how contract templates may be used, and a dispute resolution
              clause. Nothing on this website is legal advice, and using this website does not create
              a solicitor-client relationship.
            </p>
          </div>

          <nav
            aria-label="Terms of service contents"
            className="rounded-xl border border-border bg-muted/30 p-6 mb-12"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">Contents</h2>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1 font-body text-sm text-muted-foreground">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-secondary transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-10 font-body [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol.body]:list-decimal [&_p]:leading-relaxed">
            <section id="acceptance">
              <h2>1. Agreement and Acceptance</h2>
              <p>
                These Terms of Service (the "Terms") form a binding agreement between you and
                LegalXpress ("LegalXpress", "we", "us" or "our"). By accessing the website, creating
                an account, purchasing a membership, downloading a template or using any of our tools,
                you accept these Terms and our Privacy Policy. If you do not agree, do not use the
                services.
              </p>
              <p>
                If you accept these Terms on behalf of a company or other organization, you represent
                that you have authority to bind that organization, and "you" includes that
                organization.
              </p>
              <p>
                Where you retain us for legal services, a separate engagement letter or retainer
                agreement governs that representation. If there is a conflict, the engagement letter
                prevails for that matter.
              </p>
            </section>

            <section id="eligibility">
              <h2>2. Eligibility and Accounts</h2>
              <ul>
                <li>You must be at least 18 years old and able to enter into a binding contract.</li>
                <li>
                  You agree to provide accurate, current and complete information and to keep it
                  updated.
                </li>
                <li>
                  You are responsible for all activity under your account and for the confidentiality
                  of your credentials. Accounts are for a single named user and may not be shared or
                  resold.
                </li>
                <li>
                  Notify us immediately of any unauthorized use. We may require a password reset or
                  suspend an account to protect the platform.
                </li>
              </ul>
            </section>

            <section id="relationship">
              <h2>3. No Solicitor-Client Relationship Until Engaged</h2>
              <p>
                Information on this website, in the contract library, in blog posts, in chat responses
                and in AI-generated output is general information only. It is not legal advice and must
                not be relied on as a substitute for advice from a licensed lawyer or paralegal about
                your specific circumstances.
              </p>
              <p>
                A solicitor-client relationship is created only when (a) we have completed a conflicts
                check and client identification and verification, (b) we have expressly agreed in
                writing to act for you, and (c) any required retainer has been paid. Sending us
                information before that point does not create a relationship and may not be
                privileged. Do not send confidential or time-sensitive material until we confirm an
                engagement.
              </p>
              <p>
                Legal services are provided by licensees of the Law Society of Ontario and are offered
                only in jurisdictions in which the responsible licensee is authorized to practise.
                Deadlines and limitation periods are your responsibility until we are formally
                retained on a matter.
              </p>
            </section>

            <section id="scope-services">
              <h2>4. Scope of Services</h2>
              <p>Depending on your plan and what you purchase, we may provide:</p>
              <ul>
                <li>Membership plans that include or discount defined legal services;</li>
                <li>Paid consultations with a licensee;</li>
                <li>Document drafting, review, notarial and commissioning services;</li>
                <li>Access to the contract template library in English and French;</li>
                <li>AI-assisted case analysis, summaries and drafting support;</li>
                <li>Referrals to affiliate partners for services we do not provide in-house.</li>
              </ul>
              <p>
                We may modify, add or discontinue features. Where a change materially reduces the
                benefits of a paid plan, we will give notice and you may cancel as described below.
                Services are provided in Canada and are intended for Canadian legal matters.
              </p>
            </section>

            <section id="memberships">
              <h2>5. Memberships, Billing and Renewal</h2>
              <ul>
                <li>
                  Memberships are subscriptions billed in advance on a recurring basis (monthly or
                  annually) to the payment method on file, in Canadian dollars unless stated otherwise,
                  plus applicable taxes.
                </li>
                <li>
                  <strong>Automatic renewal.</strong> Your plan renews automatically at the then-current
                  rate at the end of each billing period until cancelled. You authorize us and our
                  payment processor to charge the renewal.
                </li>
                <li>
                  Plan inclusions, discounts and any usage limits are those published on the plan page
                  at the time of purchase. Included benefits have no cash value, are not transferable,
                  and do not accumulate between billing periods unless stated.
                </li>
                <li>
                  Discounted or included services apply to the specific services listed in your plan.
                  Work outside the plan (for example, contested litigation, complex corporate matters,
                  disbursements, government filing fees and third-party charges) is quoted separately
                  and billed under an engagement letter.
                </li>
                <li>
                  We may change pricing on renewal with at least 30 days' notice. Failed payments may
                  result in suspension of member benefits after a reasonable grace period.
                </li>
              </ul>
            </section>

            <section id="cancellation">
              <h2>6. Cancellation, Refunds and Fair Use</h2>
              <ul>
                <li>
                  You may cancel a membership at any time from your account. Cancellation takes effect
                  at the end of the current billing period; access continues until then.
                </li>
                <li>
                  Subscription fees already paid are non-refundable except where required by applicable
                  consumer protection law or where we have not provided a purchased service.
                </li>
                <li>
                  One-time purchases (consultations, case analyses, template downloads, fixed-fee
                  services) are non-refundable once the service is delivered or the document is
                  downloaded, because the value is delivered immediately.
                </li>
                <li>
                  Fees paid on account of legal services are handled in accordance with law society
                  trust and billing rules; unearned fees are refunded.
                </li>
                <li>
                  <strong>Fair use.</strong> Unlimited or high-volume benefits are for your own
                  reasonable personal or internal business use. We may contact you, apply reasonable
                  limits, or suspend a plan where usage is automated, resold, or materially exceeds
                  normal use.
                </li>
              </ul>
            </section>

            <section id="consultations">
              <h2>7. Consultations and Bookings</h2>
              <ul>
                <li>
                  Consultations are booked for a fixed duration and begin at the scheduled time.
                  Late arrival reduces the remaining session time.
                </li>
                <li>
                  Rescheduling or cancellation with at least 24 hours' notice is free; with less
                  notice, the session may be treated as used.
                </li>
                <li>
                  A consultation is general legal guidance for the topic discussed. It does not include
                  document preparation, filings, follow-up correspondence or ongoing representation
                  unless separately retained.
                </li>
                <li>
                  Sessions may not be recorded by either party without the other's prior written
                  consent.
                </li>
              </ul>
            </section>

            <section id="templates">
              <h2>8. Contract Library Licence</h2>
              <p>
                Subject to your plan being in good standing, we grant you a limited, non-exclusive,
                non-transferable, revocable licence to download and adapt templates for your own
                personal or internal business use, including use with your own counterparties.
              </p>
              <p>You may not:</p>
              <ul>
                <li>
                  Resell, sublicense, publish, distribute or share templates as templates, or include
                  them in a competing library, database, product or training dataset;
                </li>
                <li>Use automated means to bulk download or scrape the library;</li>
                <li>Remove proprietary notices, or circumvent paywalls, watermarks or access controls;</li>
                <li>
                  Provide templates to clients as part of a legal or advisory service you sell, unless
                  we have granted a written firm or reseller licence.
                </li>
              </ul>
              <p>
                Templates are drafted as general Canadian precedents and are not tailored to your
                facts, province, industry or counterparty. They may not reflect the most recent changes
                in law. You are responsible for reviewing, adapting and, where appropriate, having a
                licensee review any template before you rely on or sign it. French versions are
                provided for convenience; where a discrepancy exists, obtain advice before executing.
              </p>
            </section>

            <section id="ai">
              <h2>9. AI-Assisted Tools</h2>
              <p>
                Case analysis, chat assistance and drafting features use artificial intelligence and
                may produce output that is incomplete, outdated or incorrect, including plausible but
                inaccurate statements of law or citations.
              </p>
              <ul>
                <li>Output is an informational, value-added service — not legal advice, and not a legal opinion.</li>
                <li>Have any output reviewed by a licensed lawyer or paralegal before you act on it.</li>
                <li>Do not use the tools for urgent matters, court deadlines or emergencies.</li>
                <li>
                  You are responsible for the content you submit and confirm you have the right to
                  submit it.
                </li>
                <li>
                  We may impose usage limits, rate limits or temporary unavailability, and we are not
                  liable for interruptions to third-party model providers.
                </li>
              </ul>
            </section>

            <section id="referrals">
              <h2>10. Affiliate Partners and Referrals</h2>
              <p>
                Where a matter falls outside our in-house services, we may refer you to an affiliate
                partner or another licensee. Any engagement you enter with that party is directly
                between you and them, on their terms and fees. We may receive a referral fee or
                commission where permitted by applicable law society rules, and any such arrangement
                will be disclosed to you. We do not guarantee the work, availability or pricing of
                third parties.
              </p>
            </section>

            <section id="conduct">
              <h2>11. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the services for any unlawful, fraudulent or harassing purpose;</li>
                <li>Submit content that infringes another person's rights or that you may not disclose;</li>
                <li>
                  Attempt to gain unauthorized access to accounts, systems or data, probe or test
                  security, or interfere with the service;
                </li>
                <li>Scrape, crawl, mirror or reverse engineer any part of the platform;</li>
                <li>Misrepresent your identity or your authority to act for another party;</li>
                <li>Use the services to provide legal services to third parties without a licence.</li>
              </ul>
            </section>

            <section id="ip">
              <h2>12. Intellectual Property</h2>
              <p>
                The website, branding, logos, design system, template library, generated document
                structure, software and all related content are owned by LegalXpress or its licensors
                and are protected by copyright, trademark and other laws. Except for the licence in
                section 8, no rights are granted.
              </p>
              <p>
                You retain ownership of the content and documents you submit or create. You grant us a
                limited licence to host, process and display that content solely to operate and support
                the services and as described in the Privacy Policy. Feedback you send us may be used
                without obligation or compensation.
              </p>
            </section>

            <section id="confidentiality">
              <h2>13. Confidentiality and Conflicts</h2>
              <p>
                Client information is treated as confidential in accordance with our professional
                obligations and the Privacy Policy. Because we act for many clients, we run a conflicts
                check before accepting a matter and may decline to act. Until a conflicts check is
                complete and an engagement is confirmed, we cannot guarantee that information you send
                will be treated as confidential or privileged.
              </p>
            </section>

            <section id="disclaimer">
              <h2>14. Disclaimers</h2>
              <p>
                Except for legal services provided under a signed engagement, which are performed with
                the reasonable care and skill of a Canadian licensee, the website, templates, tools and
                content are provided "as is" and "as available" without warranties of any kind, whether
                express, implied or statutory, including implied warranties of merchantability, fitness
                for a particular purpose, accuracy, currency and non-infringement.
              </p>
              <p>
                We do not warrant that the service will be uninterrupted, secure or error-free, that
                content is current with the law of every Canadian jurisdiction, or that any particular
                outcome will be achieved. No result in a prior matter guarantees a similar result.
              </p>
              <p>
                Some jurisdictions do not permit the exclusion of certain warranties or of consumer
                rights; nothing in these Terms limits rights you have under applicable consumer
                protection legislation that cannot be waived.
              </p>
            </section>

            <section id="liability">
              <h2>15. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, LegalXpress and its licensees, employees,
                contractors and suppliers are not liable for indirect, incidental, special,
                consequential, exemplary or punitive damages, or for loss of profits, revenue, business,
                goodwill or data, arising from or relating to the website, templates or AI tools, even
                if advised of the possibility.
              </p>
              <p>
                Our aggregate liability for all claims relating to the website, templates or AI tools in
                any twelve-month period is limited to the greater of the amounts you paid to us for
                those services during that period, or CAD $100.
              </p>
              <p>
                This section does not limit liability for fraud, wilful misconduct, bodily injury, or
                any liability that cannot be limited by law, and does not limit or replace the
                professional liability coverage that applies to legal services provided under a signed
                engagement, which is governed by that engagement and by law society requirements.
              </p>
            </section>

            <section id="indemnity">
              <h2>16. Indemnity</h2>
              <p>
                You agree to indemnify and hold harmless LegalXpress and its personnel from claims,
                damages, penalties and reasonable legal costs arising from your breach of these Terms,
                your misuse of the templates or AI tools, your unlawful conduct, or content you submit
                that infringes a third party's rights.
              </p>
            </section>

            <section id="suspension">
              <h2>17. Suspension and Termination</h2>
              <p>
                We may suspend or terminate access, with notice where practicable, for non-payment,
                breach of these Terms, suspected fraud or abuse, a conflict of interest, or where
                required by law or professional obligation. You may stop using the services at any time
                and cancel your plan. On termination, licences granted to you end, but documents you
                already lawfully downloaded may continue to be used for their intended purpose.
                Sections that by their nature should survive, including sections 12 and 14 through 20,
                survive termination.
              </p>
            </section>

            <section id="electronic">
              <h2>18. Electronic Communications and Signatures</h2>
              <p>
                You consent to receiving notices, disclosures, invoices and agreements electronically,
                and agree that electronic signatures and records satisfy any requirement for writing or
                signature under applicable electronic commerce legislation. Email and internet
                communication is not perfectly secure; unless you instruct otherwise, we may correspond
                with you by email.
              </p>
            </section>

            <section id="disputes">
              <h2>19. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of the Province of Ontario and the federal laws of
                Canada applicable in Ontario, without regard to conflict-of-law rules.
              </p>
              <p>
                Before starting a proceeding, the parties will first attempt to resolve the dispute in
                good faith by direct discussion for 30 days and, if unresolved, by mediation in Toronto,
                Ontario. Subject to that, you attorn to the exclusive jurisdiction of the courts of
                Ontario, except that either party may seek injunctive relief in any court of competent
                jurisdiction, and nothing prevents a consumer from bringing a claim in small claims
                court or exercising rights under applicable consumer protection law.
              </p>
              <p>
                Fee disputes relating to legal services may also be addressed through the assessment
                process available under Ontario law.
              </p>
            </section>

            <section id="general">
              <h2>20. General Terms</h2>
              <ul>
                <li>
                  <strong>Changes.</strong> We may amend these Terms. Material changes take effect on the
                  posted date, and for paid plans, at the start of the next billing period. Continued use
                  after the effective date is acceptance.
                </li>
                <li>
                  <strong>Entire agreement.</strong> These Terms, the Privacy Policy and any engagement
                  letter form the entire agreement between us on their subject matter.
                </li>
                <li>
                  <strong>Severability.</strong> If a provision is unenforceable, the rest remains in
                  effect and the provision is modified to the minimum extent needed.
                </li>
                <li>
                  <strong>No waiver.</strong> Failing to enforce a provision is not a waiver of it.
                </li>
                <li>
                  <strong>Assignment.</strong> You may not assign these Terms without our consent; we may
                  assign them as part of a practice transfer or reorganization.
                </li>
                <li>
                  <strong>Force majeure.</strong> Neither party is liable for delays caused by events
                  beyond reasonable control.
                </li>
                <li>
                  <strong>Language.</strong> The parties have requested that these Terms and related
                  documents be drawn up in English. Les parties ont demandé que la présente convention et
                  les documents s'y rattachant soient rédigés en anglais.
                </li>
              </ul>
            </section>

            <section id="contact">
              <h2>21. Contact and Complaints</h2>
              <p>Questions about these Terms, billing or a service issue:</p>
              <p className="mt-2">
                <strong>LegalXpress</strong>
                <br />
                <strong>Email:</strong> legal@legalxpress.ca
                <br />
                <strong>Privacy:</strong> privacy@legalxpress.ca
                <br />
                <strong>Mail:</strong> Toronto, Ontario, Canada
              </p>
              <p>
                We aim to acknowledge complaints within two business days and resolve them promptly.
                Concerns about the professional conduct of a licensee may be directed to the Law Society
                of Ontario.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
