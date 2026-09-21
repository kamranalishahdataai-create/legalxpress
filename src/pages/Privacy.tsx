import { Layout } from "@/components/layout/Layout";

const sections = [
  { id: "scope", title: "1. Scope and Who We Are" },
  { id: "collect", title: "2. Personal Information We Collect" },
  { id: "purposes", title: "3. Why We Collect It (Identified Purposes)" },
  { id: "consent", title: "4. Consent and Withdrawal" },
  { id: "privilege", title: "5. Solicitor-Client Privilege and Confidentiality" },
  { id: "payments", title: "6. Payments, Memberships and Billing Data" },
  { id: "ai", title: "7. AI-Assisted Tools and Automated Processing" },
  { id: "templates", title: "8. Contract Templates and Documents You Create" },
  { id: "sharing", title: "9. Disclosure to Service Providers and Third Parties" },
  { id: "transfers", title: "10. Cross-Border Storage and Transfers" },
  { id: "cookies", title: "11. Cookies, Analytics and Communications" },
  { id: "retention", title: "12. Retention and Destruction" },
  { id: "security", title: "13. Safeguards" },
  { id: "rights", title: "14. Your Privacy Rights" },
  { id: "breach", title: "15. Breach Notification" },
  { id: "children", title: "16. Children and Minors" },
  { id: "changes", title: "17. Changes to This Policy" },
  { id: "contact", title: "18. Privacy Officer and Complaints" },
];

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="font-body text-muted-foreground mb-10">
            Last updated: {updated} &middot; Applies to LegalXpress, its website, member portal,
            contract library, AI-assisted tools and legal services provided in Canada.
          </p>

          <nav
            aria-label="Privacy policy contents"
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

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-10 font-body [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_p]:leading-relaxed">
            <section id="scope">
              <h2>1. Scope and Who We Are</h2>
              <p>
                LegalXpress ("LegalXpress", "we", "us" or "our") is a Canadian legal services
                practice offering in-house legal services, memberships, consultations, an AI-assisted
                case analysis tool and a contract template library. This Privacy Policy explains how
                we collect, use, disclose, safeguard and retain personal information.
              </p>
              <p>
                We handle personal information in accordance with the{" "}
                <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and
                substantially similar provincial privacy legislation (including Quebec's Law 25,
                Alberta's PIPA, British Columbia's PIPA), as well as the professional confidentiality
                obligations imposed on licensees by the Law Society of Ontario. Where professional
                obligations are stricter than privacy legislation, the professional obligations apply.
              </p>
              <p>
                This policy does not apply to third-party websites, affiliate law firms or partner
                service providers that you engage directly. Those organizations maintain their own
                privacy practices.
              </p>
            </section>

            <section id="collect">
              <h2>2. Personal Information We Collect</h2>
              <h3>Information you provide</h3>
              <ul>
                <li>
                  <strong>Identity and contact data:</strong> name, email address, telephone number,
                  mailing address, organization or business name, and role.
                </li>
                <li>
                  <strong>Account data:</strong> login credentials (stored in hashed form by our
                  authentication provider), membership tier, preferences and language selection.
                </li>
                <li>
                  <strong>Matter data:</strong> facts, documents, correspondence, dates, parties,
                  opposing parties and any other information you submit when requesting a
                  consultation, a case analysis, a document review or another service.
                </li>
                <li>
                  <strong>Conflict-check data:</strong> the names of counterparties and related
                  entities needed to run a conflicts search before we can act for you.
                </li>
                <li>
                  <strong>Billing data:</strong> subscription plan, invoices, transaction history and
                  partial card details returned by our payment processor.
                </li>
                <li>
                  <strong>Support and chat data:</strong> messages you send through the site chat,
                  the AI legal assistant, contact forms and email.
                </li>
              </ul>
              <h3>Information collected automatically</h3>
              <ul>
                <li>Device and browser type, operating system, and approximate region.</li>
                <li>IP address, pages viewed, referring page, and session timestamps.</li>
                <li>
                  Product analytics events (for example, which templates were previewed or
                  downloaded) used to improve the service.
                </li>
              </ul>
              <h3>Information from third parties</h3>
              <ul>
                <li>Payment confirmation and subscription status from our payment processor.</li>
                <li>
                  Calendar availability and booking confirmations where you connect or book through a
                  scheduling integration.
                </li>
                <li>
                  Referral information where an existing member, affiliate partner or referring
                  lawyer introduces you to us.
                </li>
              </ul>
              <p>
                We ask that you do not submit sensitive personal information (such as health,
                biometric or financial account information) unless it is relevant to your legal
                matter and we have requested it.
              </p>
            </section>

            <section id="purposes">
              <h2>3. Why We Collect It (Identified Purposes)</h2>
              <ul>
                <li>To open and administer your account, membership and billing.</li>
                <li>
                  To run conflict-of-interest checks and client identification and verification
                  procedures required by law society rules.
                </li>
                <li>
                  To provide the legal services you request, including consultations, drafting,
                  reviews, notarial and commissioning services, and litigation support.
                </li>
                <li>To generate AI-assisted case summaries, memos and contract drafts you request.</li>
                <li>To deliver, personalize and localize contract templates (English and French).</li>
                <li>
                  To match you with an affiliate partner or referral lawyer where the service falls
                  outside our practice.
                </li>
                <li>
                  To send service messages: booking confirmations, receipts, renewal notices, deadline
                  reminders and security notices.
                </li>
                <li>
                  To send marketing communications where you have consented, with an unsubscribe link
                  in every message, in compliance with Canada's Anti-Spam Legislation (CASL).
                </li>
                <li>
                  To maintain the security, availability and integrity of the platform, detect fraud
                  and prevent abuse.
                </li>
                <li>
                  To comply with legal, regulatory, tax, insurance and law society record-keeping
                  obligations, and to establish or defend legal claims.
                </li>
              </ul>
              <p>
                We will not use your personal information for a new purpose that is materially
                different from those above without first obtaining your consent, unless permitted or
                required by law.
              </p>
            </section>

            <section id="consent">
              <h2>4. Consent and Withdrawal</h2>
              <p>
                By submitting information to us, you consent to the collection, use and disclosure of
                that information for the purposes described in this policy. Consent may be express
                (for example, ticking a box or signing an engagement letter) or implied by your use
                of a service where the purpose is obvious.
              </p>
              <p>
                You may withdraw consent at any time, subject to legal and contractual restrictions
                and reasonable notice. Withdrawing consent may mean we can no longer provide some or
                all of our services to you. We cannot delete information we are professionally or
                legally required to retain, including files relating to a retainer.
              </p>
            </section>

            <section id="privilege">
              <h2>5. Solicitor-Client Privilege and Confidentiality</h2>
              <p>
                Communications with a licensed lawyer or paralegal in the course of seeking or
                receiving legal advice are confidential and may be protected by solicitor-client
                privilege. We treat all client and prospective client information as confidential and
                disclose it only with your instructions or where required or permitted by law society
                rules or a court order.
              </p>
              <p>
                <strong>Important:</strong> Privilege attaches to legal advice from a licensee. It
                does not attach to general website browsing, marketing enquiries, public forum posts,
                or content generated by our AI tools where no licensee has been retained. Do not send
                highly sensitive material through unsecured channels before an engagement is in
                place.
              </p>
            </section>

            <section id="payments">
              <h2>6. Payments, Memberships and Billing Data</h2>
              <p>
                Payments are processed by a PCI-DSS compliant third-party payment processor. We do not
                store full payment card numbers, CVV codes or bank credentials on our systems. We
                receive and store a customer reference, subscription status, transaction amounts and
                the last digits and brand of the payment method for reconciliation, refunds, chargeback
                handling and accounting.
              </p>
              <p>
                Billing records are retained for the period required by applicable tax and accounting
                law, generally seven years.
              </p>
            </section>

            <section id="ai">
              <h2>7. AI-Assisted Tools and Automated Processing</h2>
              <p>
                Our case analysis tool, AI legal assistant and contract generation features use
                third-party artificial intelligence models. When you use those features, the content
                you submit is transmitted to the model provider to generate a response.
              </p>
              <ul>
                <li>
                  Outputs are informational only and are not legal advice. See the disclaimer shown
                  in the product and in our Terms of Service.
                </li>
                <li>
                  We instruct our providers not to use your submissions to train their public models
                  and rely on contractual commitments to that effect.
                </li>
                <li>
                  We may retain prompts and outputs associated with your account so you can revisit
                  your analyses, and to monitor quality, accuracy and abuse.
                </li>
                <li>
                  No decision producing legal effects about you is made solely by automated means.
                  Human licensees review any work product that is delivered as legal advice.
                </li>
                <li>
                  Do not paste information belonging to third parties that you are not authorized to
                  disclose.
                </li>
              </ul>
            </section>

            <section id="templates">
              <h2>8. Contract Templates and Documents You Create</h2>
              <p>
                Content you enter into a template, and documents you generate or download, remain
                yours. We store them, and the metadata associated with them, so you can access your
                library, manage versions and receive support. We do not sell, publish or license your
                documents to anyone.
              </p>
            </section>

            <section id="sharing">
              <h2>9. Disclosure to Service Providers and Third Parties</h2>
              <p>We disclose personal information only as follows:</p>
              <ul>
                <li>
                  <strong>Service providers (processors):</strong> cloud hosting and database,
                  authentication, email delivery, payment processing, scheduling and calendar,
                  analytics, e-signature and AI model providers. They act on our written instructions,
                  are bound by confidentiality, and may use the information only to deliver their
                  service to us.
                </li>
                <li>
                  <strong>Affiliate partners and referral lawyers:</strong> only with your consent,
                  and only the information needed to assess and respond to your request.
                </li>
                <li>
                  <strong>Professional advisers and insurers:</strong> where reasonably necessary,
                  including our professional liability insurer and auditors.
                </li>
                <li>
                  <strong>Regulators and courts:</strong> where required by a subpoena, warrant, court
                  order, law society investigation or other lawful demand.
                </li>
                <li>
                  <strong>Business transactions:</strong> in connection with a merger, practice
                  transfer or sale, subject to confidentiality obligations and applicable law society
                  requirements.
                </li>
              </ul>
              <p>We do not sell personal information and we do not rent contact lists.</p>
            </section>

            <section id="transfers">
              <h2>10. Cross-Border Storage and Transfers</h2>
              <p>
                Our infrastructure is Canada-focused, but some service providers may store or process
                data outside Canada, including in the United States and the European Union. When
                personal information is held in another jurisdiction, it may be accessible to the
                courts, law enforcement and national security authorities of that jurisdiction.
              </p>
              <p>
                We use contractual and technical measures to require a comparable level of protection.
                You may contact our Privacy Officer for information about our practices concerning
                service providers outside Canada.
              </p>
            </section>

            <section id="cookies">
              <h2>11. Cookies, Analytics and Communications</h2>
              <p>
                We use strictly necessary cookies for authentication and session management, and
                limited analytics cookies to understand aggregate usage. You can control cookies
                through your browser settings; disabling necessary cookies will break sign-in and
                member features.
              </p>
              <p>
                Commercial electronic messages are sent only with express or implied consent under
                CASL and always include an unsubscribe mechanism. Transactional and service messages
                (receipts, booking confirmations, security alerts) are not marketing and continue for
                as long as you hold an account.
              </p>
            </section>

            <section id="retention">
              <h2>12. Retention and Destruction</h2>
              <ul>
                <li>
                  <strong>Client and matter files:</strong> retained for at least the period required
                  by law society rules and the applicable limitation periods, generally a minimum of
                  ten years from the close of the file, and longer for trust records, real estate,
                  estates and minors' matters.
                </li>
                <li>
                  <strong>Financial and trust records:</strong> retained as required by the by-laws
                  governing licensees and by tax law.
                </li>
                <li>
                  <strong>Account, analytics and marketing data:</strong> retained while your account
                  is active and for a reasonable period afterwards.
                </li>
              </ul>
              <p>
                When information is no longer needed for an identified purpose or legal requirement,
                we destroy, erase or anonymize it securely.
              </p>
            </section>

            <section id="security">
              <h2>13. Safeguards</h2>
              <p>
                We maintain administrative, technical and physical safeguards appropriate to the
                sensitivity of the information, including encryption in transit, access controls and
                role-based permissions, row-level database security, least-privilege access for staff,
                logging, backups and confidentiality undertakings from everyone who works with us.
              </p>
              <p>
                No system is perfectly secure. You are responsible for keeping your credentials
                confidential and for notifying us immediately of any suspected unauthorized access to
                your account.
              </p>
            </section>

            <section id="rights">
              <h2>14. Your Privacy Rights</h2>
              <p>Subject to legal and professional limits, you may:</p>
              <ul>
                <li>Ask whether we hold personal information about you and request access to it.</li>
                <li>Request correction of inaccurate or incomplete information.</li>
                <li>Withdraw consent or ask us to stop a particular use.</li>
                <li>Request deletion of information we are not required to keep.</li>
                <li>Request a copy of your information in a portable format, where applicable.</li>
                <li>Unsubscribe from marketing at any time.</li>
              </ul>
              <p>
                We respond to written access requests within 30 days, or notify you if an extension is
                permitted. We may need to verify your identity first. Access may be refused where the
                information is subject to solicitor-client privilege, would reveal personal
                information about another person, or where an exception under privacy law applies; we
                will explain the reason in writing.
              </p>
            </section>

            <section id="breach">
              <h2>15. Breach Notification</h2>
              <p>
                If a breach of security safeguards creates a real risk of significant harm, we will
                notify affected individuals and the Office of the Privacy Commissioner of Canada as
                soon as feasible, keep records of breaches as required, and take steps to contain and
                remediate the incident.
              </p>
            </section>

            <section id="children">
              <h2>16. Children and Minors</h2>
              <p>
                Our services are intended for individuals 18 years of age or older. We do not knowingly
                collect personal information from children without the consent of a parent or guardian,
                except where a minor is the subject of a legal matter handled on instructions from an
                authorized adult.
              </p>
            </section>

            <section id="changes">
              <h2>17. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. The "Last updated" date reflects the most
                recent version. Material changes will be communicated by email or by a prominent notice
                on the site before they take effect. Continued use after the effective date constitutes
                acceptance.
              </p>
            </section>

            <section id="contact">
              <h2>18. Privacy Officer and Complaints</h2>
              <p>
                Direct any question, access request or complaint to our Privacy Officer. We will
                acknowledge your complaint, investigate, and respond in writing.
              </p>
              <p className="mt-2">
                <strong>Privacy Officer, LegalXpress</strong>
                <br />
                <strong>Email:</strong> privacy@legalxpress.ca
                <br />
                <strong>Mail:</strong> Toronto, Ontario, Canada
              </p>
              <p>
                If you are not satisfied with our response, you may contact the Office of the Privacy
                Commissioner of Canada, or the privacy regulator in your province. Complaints about the
                professional conduct of a licensee may be made to the Law Society of Ontario.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
