import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileDown, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";



interface ContractTemplate {
  id: string;
  name: string;
  description: string | null;
  category: string;
  jurisdiction: string;
}

interface Props {
  contract: ContractTemplate | null;
  onClose: () => void;
  hasSubscription: boolean;
  language?: "en" | "fr";
}

function getJurisdictionText(_j: string) {
  return "the Province of [PROVINCE], Canada";
}

function getCategorySpecificClauses(category: string, name: string) {
  const base = {
    Employment: [
      { title: "Position and Duties", body: "The Employee shall serve in the capacity of [JOB TITLE] and shall perform all duties and responsibilities customarily associated with such position, as well as any additional duties reasonably assigned by the Employer from time to time. The Employee shall devote their full professional time, attention, and best efforts to the performance of their duties." },
      { title: "Compensation and Benefits", body: "In consideration of the services rendered, the Employer shall pay the Employee a base salary of $[AMOUNT] per annum, payable in accordance with the Employer's standard payroll schedule, less applicable withholdings and deductions. The Employee shall also be entitled to participate in any benefit plans, programs, or arrangements made available to similarly situated employees, subject to the terms and conditions of such plans." },
      { title: "Work Schedule and Location", body: "The Employee's regular working hours shall be [HOURS] per week. The primary place of work shall be [LOCATION]. Remote work arrangements, if applicable, shall be subject to the Employer's remote work policy as amended from time to time." },
      { title: "Probationary Period", body: "The Employee shall be subject to a probationary period of [NUMBER] months commencing from the date of hire. During this period, either party may terminate this Agreement with [NUMBER] days' written notice. Successful completion of the probationary period does not alter the at-will nature of this employment where applicable by law." },
      { title: "Vacation and Leave", body: "The Employee shall be entitled to [NUMBER] days of paid vacation per calendar year, accrued on a pro-rata basis. Additionally, the Employee shall receive statutory holidays and sick leave in accordance with applicable employment standards legislation. Unused vacation days shall be governed by the Employer's vacation carry-over policy." },
      { title: "Intellectual Property", body: "All work product, inventions, discoveries, and intellectual property created by the Employee during the course of employment and relating to the Employer's business shall be the sole and exclusive property of the Employer. The Employee hereby assigns all rights, title, and interest in such intellectual property to the Employer." },
    ],
    Business: [
      { title: "Scope of Agreement", body: "This Agreement sets forth the complete terms and conditions governing the business relationship between the Parties. Each Party represents that it has full power and authority to enter into this Agreement and to perform its obligations hereunder without conflict with any other agreement or obligation." },
      { title: "Obligations of the Parties", body: "Each Party shall perform its obligations under this Agreement in a professional and workmanlike manner, in accordance with generally accepted industry standards and practices. The Parties shall cooperate in good faith and provide timely access to information, resources, and personnel reasonably necessary for the performance of this Agreement." },
      { title: "Payment Terms", body: "All amounts due under this Agreement shall be payable within [NUMBER] days of receipt of a properly submitted invoice. Late payments shall bear interest at the rate of [PERCENTAGE]% per month or the maximum rate permitted by law, whichever is less. All fees are exclusive of applicable taxes, which shall be the responsibility of the paying Party." },
      { title: "Representations and Warranties", body: "Each Party represents and warrants that: (a) it is duly organized and validly existing under the laws of its jurisdiction of organization; (b) the execution and performance of this Agreement has been duly authorized; (c) this Agreement constitutes a legal, valid, and binding obligation enforceable in accordance with its terms." },
    ],
    "Real Estate": [
      { title: "Property Description", body: "The Landlord hereby leases to the Tenant the premises located at [FULL ADDRESS] (the \"Premises\"), including all fixtures, improvements, and appurtenances thereto, together with the right to use common areas as designated by the Landlord. The legal description of the Premises is as set forth in Schedule \"A\" attached hereto." },
      { title: "Lease Term", body: "The term of this Lease shall commence on [START DATE] and expire on [END DATE] (the \"Term\"), unless sooner terminated in accordance with the provisions hereof. The Tenant shall have the option to renew this Lease for [NUMBER] additional term(s) of [DURATION] each, upon written notice delivered to the Landlord no later than [NUMBER] days prior to the expiration of the then-current term." },
      { title: "Rent and Security Deposit", body: "The Tenant shall pay to the Landlord a monthly rent of $[AMOUNT] (the \"Rent\"), due on the [DAY] of each calendar month, without demand, deduction, or set-off. Upon execution of this Lease, the Tenant shall deposit with the Landlord the sum of $[AMOUNT] as a security deposit, to be held and returned in accordance with applicable law." },
      { title: "Maintenance and Repairs", body: "The Tenant shall maintain the Premises in good condition and repair, ordinary wear and tear excepted. The Landlord shall be responsible for structural repairs and maintenance of common areas, building systems, and the building exterior. The Tenant shall promptly notify the Landlord of any condition requiring the Landlord's attention." },
      { title: "Use and Occupancy", body: "The Premises shall be used and occupied solely for [PURPOSE] and for no other purpose without the prior written consent of the Landlord. The Tenant shall comply with all applicable laws, regulations, ordinances, and rules pertaining to the use, condition, and occupancy of the Premises." },
    ],
    Corporate: [
      { title: "Capital Structure", body: "The authorized share capital of the Corporation shall consist of [NUMBER] common shares with a par value of $[AMOUNT] per share. Additional classes of shares may be created by amendment to the articles of incorporation with the requisite shareholder approval. The rights, privileges, restrictions, and conditions attached to each class of shares shall be as set forth in this Agreement." },
      { title: "Management and Governance", body: "The business and affairs of the Corporation shall be managed by or under the direction of the Board of Directors. The Board shall consist of [NUMBER] directors, elected annually by the shareholders at the annual general meeting. A quorum for the transaction of business at any meeting of the Board shall consist of a majority of the directors then in office." },
      { title: "Transfer Restrictions", body: "No shareholder may transfer, assign, pledge, or otherwise dispose of any shares except in compliance with this Agreement. Any proposed transfer shall be subject to the right of first refusal in favour of the remaining shareholders, to be exercised within [NUMBER] days of receipt of a transfer notice, on the terms set forth herein." },
      { title: "Distributions and Dividends", body: "The Board of Directors may declare and pay dividends out of the surplus profits of the Corporation as it deems advisable, subject to applicable law. Dividends shall be paid to shareholders of record as of the date fixed by the Board, on a pro-rata basis according to their respective shareholdings." },
    ],
    Service: [
      { title: "Scope of Services", body: "The Service Provider shall provide the services described in Schedule \"A\" (the \"Services\") in accordance with the terms and conditions of this Agreement. The Service Provider shall perform the Services with due care, skill, and diligence, consistent with best industry practices and professional standards." },
      { title: "Service Standards and Deliverables", body: "The Service Provider shall deliver all work product and deliverables in accordance with the specifications, timelines, and milestones set forth in Schedule \"B\". All deliverables shall meet the acceptance criteria defined therein. The Client shall have [NUMBER] business days to review and accept or reject each deliverable." },
      { title: "Fees and Expenses", body: "In consideration for the Services, the Client shall pay the Service Provider fees as set forth in Schedule \"C\". The Service Provider shall be entitled to reimbursement of reasonable, pre-approved out-of-pocket expenses incurred in connection with the performance of the Services, supported by appropriate documentation." },
      { title: "Independent Contractor Status", body: "The Service Provider is an independent contractor and nothing in this Agreement shall be construed to create a partnership, joint venture, agency, or employment relationship between the Parties. The Service Provider shall be solely responsible for all taxes, contributions, and assessments arising from compensation received under this Agreement." },
    ],
    Partnership: [
      { title: "Formation and Name", body: "The Partners hereby form a [general/limited] partnership (the \"Partnership\") under the name \"[PARTNERSHIP NAME]\" pursuant to the applicable partnership legislation. The Partnership shall be registered in accordance with applicable law and shall operate under said name or such other name as the Partners may agree upon in writing." },
      { title: "Capital Contributions", body: "Each Partner shall contribute to the capital of the Partnership the amounts set forth in Schedule \"A\" (the \"Initial Capital Contributions\"). Additional capital contributions may be required upon unanimous written consent of all Partners. No Partner shall be entitled to interest on their capital contribution or to withdraw any portion of their capital contribution without the unanimous consent of the other Partners." },
      { title: "Profit and Loss Allocation", body: "The net profits and net losses of the Partnership shall be allocated among the Partners in proportion to their respective partnership interests as set forth in Schedule \"B\", unless otherwise unanimously agreed in writing. Distributions of available cash shall be made at such times and in such amounts as determined by a majority vote of the Partners." },
      { title: "Management and Decision-Making", body: "The Partners shall have equal rights in the management and conduct of the Partnership business, unless otherwise agreed. Decisions in the ordinary course of business shall be made by majority vote. Extraordinary decisions, including but not limited to the admission of new partners, incurring debt exceeding $[AMOUNT], and the sale of substantial assets, shall require unanimous consent." },
    ],
    Procurement: [
      { title: "Scope of Procurement and Statement of Work", body: "The Supplier shall furnish the goods, services, deliverables and licences described in each Statement of Work, Purchase Order or Order Form issued under this Agreement (each, an \"Order\"). Each Order forms part of this Agreement and is governed by these terms; in the event of conflict, this Agreement prevails over any Order, invoice or supplier standard terms unless expressly amended in writing signed by both Parties." },
      { title: "Pricing, Invoicing and Purchase Orders", body: "Pricing shall be as set out in the applicable Order and shall be firm for the term of that Order. No amounts are payable without a valid Purchase Order reference. The Supplier shall invoice monthly in arrears, and the Client shall pay undisputed invoices within [NUMBER] days of receipt. The Client may withhold payment of any amount reasonably disputed in good faith pending resolution, and may set off amounts owed by the Supplier." },
      { title: "Service Levels and Performance Remedies", body: "The Supplier shall meet or exceed the service levels set out in Schedule \"A\" (the \"Service Levels\"). Failure to meet a Service Level entitles the Client to the service credits specified therein, which are a genuine pre-estimate of loss and not a penalty, without limiting any other remedy. Persistent failure to meet Service Levels in [NUMBER] consecutive measurement periods constitutes a material breach permitting termination for cause." },
      { title: "Subcontracting and Flow-Down Obligations", body: "The Supplier shall not subcontract any part of its obligations without the Client's prior written consent. Where subcontracting is permitted, the Supplier shall flow down all applicable terms of this Agreement to each subcontractor and remains fully liable for the acts, omissions and performance of its subcontractors as if they were its own." },
      { title: "Intellectual Property and Licence Grant", body: "All deliverables created specifically for the Client under an Order shall vest in the Client upon payment, and the Supplier hereby assigns all right, title and interest therein and waives all moral rights. The Supplier retains ownership of its pre-existing and background intellectual property and grants the Client a perpetual, irrevocable, non-exclusive, royalty-free licence to use such materials to the extent necessary to enjoy the deliverables. For subscription software, the Supplier grants a non-exclusive, non-transferable right to access and use the hosted service during the subscription term." },
      { title: "Data Protection, Security and Audit", body: "The Supplier shall process Client data only on documented instructions from the Client, shall maintain administrative, technical and physical safeguards consistent with recognized industry standards, and shall notify the Client without undue delay and in any event within [NUMBER] hours of becoming aware of any security incident. The Supplier shall store and process personal information in Canada unless otherwise agreed in writing, and shall permit the Client to audit compliance upon reasonable notice not more than once per year." },
      { title: "Compliance, Conflict of Interest and Anti-Bribery", body: "The Supplier represents that it complies with all applicable laws, including anti-corruption, sanctions, labour, health and safety, accessibility and supply chain transparency legislation, and that neither it nor its personnel has any actual or potential conflict of interest in respect of this procurement. The Supplier shall promptly disclose any circumstance that could reasonably be perceived as a conflict of interest or a bid-rigging or collusion risk." },
      { title: "Insurance, Indemnity and Termination for Convenience", body: "The Supplier shall maintain commercial general liability, professional liability (errors and omissions) and, where applicable, cyber liability insurance each in an amount not less than $[AMOUNT] per occurrence, naming the Client as additional insured, and shall provide certificates on request. The Supplier shall indemnify the Client against third-party claims arising from the Supplier's negligence, wilful misconduct or infringement of intellectual property rights. The Client may terminate this Agreement or any Order for convenience on [NUMBER] days' written notice, paying only for services properly rendered and non-cancellable commitments incurred to the effective date of termination." },
    ],
  };

  return base[category as keyof typeof base] || base.Business;
}


function getCategorySpecificClausesFr(category: string) {
  const base: Record<string, { title: string; body: string }[]> = {
    Employment: [
      { title: "Fonctions et responsabilités", body: "L'Employé occupe le poste de [TITRE DU POSTE] et exerce l'ensemble des fonctions et responsabilités habituellement rattachées à ce poste, ainsi que toute autre tâche raisonnablement confiée par l'Employeur. L'Employé consacre tout son temps professionnel, son attention et ses meilleurs efforts à l'exécution de ses fonctions." },
      { title: "Rémunération et avantages sociaux", body: "En contrepartie des services rendus, l'Employeur verse à l'Employé un salaire de base de [MONTANT] $ par année, payable selon le calendrier de paie habituel de l'Employeur, sous réserve des retenues applicables. L'Employé peut également participer aux régimes d'avantages sociaux offerts aux employés de même catégorie, selon les modalités de ces régimes." },
      { title: "Horaire et lieu de travail", body: "L'horaire régulier de l'Employé est de [HEURES] heures par semaine. Le lieu principal de travail est [LIEU]. Le télétravail, le cas échéant, est assujetti à la politique de télétravail de l'Employeur, telle que modifiée de temps à autre." },
      { title: "Période de probation", body: "L'Employé est assujetti à une période de probation de [NOMBRE] mois à compter de la date d'embauche. Pendant cette période, chaque partie peut mettre fin au présent contrat moyennant un préavis écrit de [NOMBRE] jours, sous réserve des normes du travail applicables." },
      { title: "Vacances et congés", body: "L'Employé a droit à [NOMBRE] jours de vacances payées par année civile, accumulés au prorata. L'Employé bénéficie en outre des jours fériés et des congés de maladie prévus par la législation applicable en matière de normes du travail." },
      { title: "Propriété intellectuelle", body: "Toute œuvre, invention, découverte et propriété intellectuelle créée par l'Employé dans le cadre de son emploi et se rapportant aux activités de l'Employeur demeure la propriété exclusive de l'Employeur. L'Employé cède par les présentes tous ses droits, titres et intérêts s'y rattachant." },
    ],
    Business: [
      { title: "Portée de l'entente", body: "La présente entente énonce l'ensemble des modalités régissant la relation d'affaires entre les Parties. Chaque Partie déclare disposer de la pleine capacité et des pouvoirs requis pour conclure la présente entente et exécuter ses obligations sans contrevenir à un autre engagement." },
      { title: "Obligations des Parties", body: "Chaque Partie exécute ses obligations avec professionnalisme et diligence, conformément aux normes et pratiques généralement reconnues dans l'industrie. Les Parties collaborent de bonne foi et fournissent en temps utile les renseignements et ressources raisonnablement nécessaires à l'exécution de la présente entente." },
      { title: "Modalités de paiement", body: "Toute somme exigible en vertu de la présente entente est payable dans les [NOMBRE] jours suivant la réception d'une facture conforme. Les paiements en retard portent intérêt au taux de [POURCENTAGE] % par mois, ou au taux maximal permis par la loi, selon le moindre des deux. Les honoraires excluent les taxes applicables." },
      { title: "Déclarations et garanties", body: "Chaque Partie déclare et garantit : a) qu'elle est dûment constituée et existe validement selon les lois de son territoire; b) que la signature et l'exécution de la présente entente ont été dûment autorisées; c) que la présente entente constitue une obligation légale, valide et exécutoire selon ses modalités." },
    ],
    "Real Estate": [
      { title: "Désignation du bien", body: "Le Locateur loue au Locataire les lieux situés au [ADRESSE COMPLÈTE] (les « Lieux »), y compris les installations, améliorations et accessoires s'y rattachant, ainsi que le droit d'utiliser les aires communes désignées par le Locateur." },
      { title: "Durée du bail", body: "La durée du présent bail commence le [DATE DE DÉBUT] et se termine le [DATE DE FIN] (la « Durée »), sous réserve d'une résiliation anticipée prévue aux présentes. Le Locataire peut renouveler le bail pour [NOMBRE] période(s) additionnelle(s) de [DURÉE] chacune, sur avis écrit transmis au moins [NOMBRE] jours avant l'échéance." },
      { title: "Loyer et dépôt de garantie", body: "Le Locataire verse au Locateur un loyer mensuel de [MONTANT] $ (le « Loyer »), payable le [JOUR] de chaque mois, sans demande, déduction ni compensation. À la signature, le Locataire remet au Locateur la somme de [MONTANT] $ à titre de dépôt, détenue et remise conformément à la loi applicable." },
      { title: "Entretien et réparations", body: "Le Locataire maintient les Lieux en bon état, l'usure normale exceptée. Le Locateur est responsable des réparations structurales ainsi que de l'entretien des aires communes, des systèmes de l'immeuble et de l'extérieur du bâtiment. Le Locataire avise promptement le Locateur de toute situation nécessitant son intervention." },
      { title: "Usage et occupation", body: "Les Lieux sont utilisés exclusivement à des fins de [USAGE] et à aucune autre fin sans le consentement écrit préalable du Locateur. Le Locataire respecte l'ensemble des lois, règlements et règles applicables à l'usage et à l'occupation des Lieux." },
    ],
    Corporate: [
      { title: "Structure du capital", body: "Le capital-actions autorisé de la Société est composé de [NOMBRE] actions ordinaires d'une valeur nominale de [MONTANT] $ chacune. D'autres catégories d'actions peuvent être créées par modification des statuts, avec l'approbation requise des actionnaires. Les droits, privilèges, restrictions et conditions rattachés à chaque catégorie sont énoncés aux présentes." },
      { title: "Gestion et gouvernance", body: "Les activités et affaires internes de la Société sont administrées par le conseil d'administration ou sous sa direction. Le conseil est composé de [NOMBRE] administrateurs élus annuellement par les actionnaires lors de l'assemblée générale annuelle. Le quorum est constitué de la majorité des administrateurs en poste." },
      { title: "Restrictions au transfert", body: "Aucun actionnaire ne peut céder, transférer, nantir ou autrement disposer de ses actions autrement qu'en conformité avec la présente convention. Tout transfert projeté est assujetti à un droit de premier refus en faveur des actionnaires restants, exerçable dans les [NOMBRE] jours de la réception de l'avis de transfert." },
      { title: "Distributions et dividendes", body: "Le conseil d'administration peut déclarer et verser des dividendes à même les bénéfices non répartis de la Société, sous réserve de la loi applicable. Les dividendes sont versés aux actionnaires inscrits à la date fixée par le conseil, au prorata de leur participation." },
    ],
    Service: [
      { title: "Portée des services", body: "Le Prestataire fournit les services décrits à l'Annexe « A » (les « Services ») conformément aux modalités de la présente entente. Le Prestataire exécute les Services avec soin, compétence et diligence, conformément aux meilleures pratiques et normes professionnelles de l'industrie." },
      { title: "Normes de service et livrables", body: "Le Prestataire remet tous les livrables conformément aux spécifications, échéanciers et jalons prévus à l'Annexe « B ». Les livrables doivent satisfaire aux critères d'acceptation qui y sont définis. Le Client dispose de [NOMBRE] jours ouvrables pour examiner et accepter ou refuser chaque livrable." },
      { title: "Honoraires et dépenses", body: "En contrepartie des Services, le Client verse au Prestataire les honoraires prévus à l'Annexe « C ». Le Prestataire a droit au remboursement des dépenses raisonnables préautorisées engagées dans le cadre des Services, sur présentation des pièces justificatives." },
      { title: "Statut d'entrepreneur indépendant", body: "Le Prestataire agit à titre d'entrepreneur indépendant et rien dans la présente entente ne crée de société, de coentreprise, de mandat ou de relation d'emploi entre les Parties. Le Prestataire est seul responsable des impôts, cotisations et prélèvements découlant de la rémunération reçue." },
    ],
    Partnership: [
      { title: "Constitution et dénomination", body: "Les Associés constituent par les présentes une société [en nom collectif / en commandite] (la « Société ») sous la dénomination « [NOM DE LA SOCIÉTÉ] », conformément à la législation applicable. La Société est immatriculée conformément à la loi et exerce ses activités sous cette dénomination." },
      { title: "Apports en capital", body: "Chaque Associé verse au capital de la Société les montants prévus à l'Annexe « A » (les « Apports initiaux »). Tout apport additionnel requiert le consentement écrit unanime des Associés. Aucun Associé n'a droit à des intérêts sur son apport ni au retrait de celui-ci sans le consentement unanime des autres Associés." },
      { title: "Partage des profits et des pertes", body: "Les profits nets et les pertes nettes de la Société sont répartis entre les Associés au prorata de leurs parts respectives, telles qu'indiquées à l'Annexe « B », sauf entente écrite unanime contraire. Les distributions sont effectuées aux moments et pour les montants déterminés par vote majoritaire des Associés." },
      { title: "Gestion et prise de décision", body: "Les Associés disposent de droits égaux dans la gestion et la conduite des affaires de la Société, sauf entente contraire. Les décisions courantes sont prises à la majorité. Les décisions extraordinaires, notamment l'admission de nouveaux associés, l'endettement supérieur à [MONTANT] $ et la vente d'actifs importants, requièrent l'unanimité." },
    ],
    Procurement: [
      { title: "Portée de l'approvisionnement et énoncé des travaux", body: "Le Fournisseur fournit les biens, services, livrables et licences décrits dans chaque énoncé des travaux, bon de commande ou formulaire de commande émis en vertu de la présente entente (chacun, une « Commande »). Chaque Commande fait partie intégrante de la présente entente. En cas de conflit, la présente entente prévaut sur toute Commande, facture ou condition type du fournisseur, sauf modification écrite signée par les deux Parties." },
      { title: "Prix, facturation et bons de commande", body: "Les prix sont ceux indiqués à la Commande applicable et demeurent fermes pour la durée de celle-ci. Aucune somme n'est payable sans référence à un bon de commande valide. Le Fournisseur facture mensuellement à terme échu et le Client acquitte les factures non contestées dans les [NOMBRE] jours suivant leur réception. Le Client peut retenir toute somme raisonnablement contestée de bonne foi et opérer compensation." },
      { title: "Niveaux de service et recours en cas de non-rendement", body: "Le Fournisseur doit atteindre ou dépasser les niveaux de service prévus à l'Annexe « A » (les « Niveaux de service »). Tout manquement donne droit au Client aux crédits de service qui y sont prévus, lesquels constituent une évaluation préalable et raisonnable du préjudice et non une pénalité, sans limiter les autres recours. Un manquement répété pendant [NOMBRE] périodes de mesure consécutives constitue un défaut important permettant la résiliation pour cause." },
      { title: "Sous-traitance et transposition des obligations", body: "Le Fournisseur ne peut sous-traiter aucune de ses obligations sans le consentement écrit préalable du Client. Lorsque la sous-traitance est autorisée, le Fournisseur transpose à chaque sous-traitant toutes les modalités applicables de la présente entente et demeure entièrement responsable des actes, omissions et prestations de ses sous-traitants." },
      { title: "Propriété intellectuelle et licence", body: "Tous les livrables créés spécifiquement pour le Client en vertu d'une Commande appartiennent au Client dès leur paiement; le Fournisseur cède par les présentes tous ses droits, titres et intérêts s'y rattachant et renonce à ses droits moraux. Le Fournisseur conserve la propriété de sa propriété intellectuelle préexistante et accorde au Client une licence perpétuelle, irrévocable, non exclusive et libre de redevances lui permettant d'utiliser ces éléments dans la mesure nécessaire. Pour les logiciels par abonnement, le Fournisseur accorde un droit non exclusif et incessible d'accès et d'utilisation du service hébergé pendant la durée de l'abonnement." },
      { title: "Protection des données, sécurité et vérification", body: "Le Fournisseur traite les données du Client uniquement selon les instructions documentées de celui-ci, maintient des mesures de sécurité administratives, techniques et physiques conformes aux normes reconnues de l'industrie et avise le Client sans délai indu, et au plus tard dans les [NOMBRE] heures, de tout incident de sécurité. Les renseignements personnels sont hébergés et traités au Canada, sauf entente écrite contraire. Le Client peut vérifier la conformité sur préavis raisonnable, au plus une fois par année." },
      { title: "Conformité, conflits d'intérêts et lutte contre la corruption", body: "Le Fournisseur déclare respecter l'ensemble des lois applicables, notamment en matière de lutte contre la corruption, de sanctions, de normes du travail, de santé et sécurité, d'accessibilité et de transparence des chaînes d'approvisionnement, et déclare qu'aucun conflit d'intérêts réel ou potentiel n'existe à l'égard du présent approvisionnement. Le Fournisseur divulgue promptement toute situation pouvant raisonnablement être perçue comme un conflit d'intérêts, un truquage d'offres ou une collusion." },
      { title: "Assurances, indemnisation et résiliation pour convenance", body: "Le Fournisseur maintient une assurance responsabilité civile générale, une assurance responsabilité professionnelle (erreurs et omissions) et, le cas échéant, une assurance cyberrisques, chacune d'un montant d'au moins [MONTANT] $ par sinistre, désignant le Client comme assuré additionnel, et remet les certificats sur demande. Le Fournisseur indemnise le Client à l'égard de toute réclamation de tiers découlant de sa négligence, de sa faute intentionnelle ou d'une violation de droits de propriété intellectuelle. Le Client peut résilier la présente entente ou toute Commande pour convenance sur préavis écrit de [NOMBRE] jours, en ne payant que les services dûment rendus et les engagements non annulables engagés jusqu'à la date de prise d'effet." },
    ],
  };

  return base[category] || base.Business;
}

export function ContractPreviewDialog({ contract, onClose, hasSubscription, language = "en" }: Props) {
  if (!contract) return null;

  const isFrench = language === "fr";
  const price = isFrench ? "5.99" : "4.99";
  const langLabel = isFrench ? "Français (French)" : "English";

  const clauses = isFrench
    ? getCategorySpecificClausesFr(contract.category)
    : getCategorySpecificClauses(contract.category, contract.name);
  // Titles/descriptions stay in English — only the contract body is French.
  const title = contract.name;
  const summary = contract.description;
  const jurisdictionText = getJurisdictionText(contract.jurisdiction);
  // Only show the first category-specific clause in preview
  const previewClauses = clauses.slice(0, 1);
  let clauseNum = 0;


  return (
    <Dialog open={!!contract} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {title} — Preview <span className="text-sm font-body text-muted-foreground">({langLabel})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative select-none" onCopy={(e) => e.preventDefault()}>
          {/* Repeating watermark grid */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center" style={{ height: "12.5%" }}>
                <span className="text-4xl md:text-5xl font-bold text-muted-foreground/10 rotate-[-30deg] select-none whitespace-nowrap">
                  SAMPLE — NOT FOR USE
                </span>
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-6 md:p-10 bg-card space-y-6 text-sm leading-relaxed font-body text-foreground/80">
            {/* Header */}
            <div className="text-center space-y-3 pb-4 border-b border-border">
              <h2 className="text-xl font-display font-bold text-foreground uppercase tracking-wide">
                {title}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isFrench ? "Régi par le droit canadien" : "Governed by Canadian Law"}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {isFrench
                  ? "Copie d'aperçu — filigranée — ne peut être utilisée à des fins juridiques"
                  : "Preview Copy — Watermarked — Not for Legal Use"}
              </p>
            </div>

            {/* Recitals */}
            {isFrench ? (
              <>
                <div className="space-y-3">
                  <p>
                    <strong>LE PRÉSENT {title.toUpperCase()}</strong> (l'« Entente ») est conclu le [JOUR] jour de [MOIS] [ANNÉE] (la « Date d'entrée en vigueur »),
                  </p>
                  <p className="font-semibold">ENTRE :</p>
                  <div className="pl-4 space-y-3 border-l-2 border-secondary/30">
                    <div>
                      <p><strong>Partie A / Première partie :</strong></p>
                      <p>[NOM LÉGAL COMPLET], [société par actions / personne physique / société de personnes] constituée et existant sous le régime des lois de [PROVINCE], ayant son adresse principale au [ADRESSE COMPLÈTE] (ci-après « [NOM ABRÉGÉ PARTIE A] »)</p>
                    </div>
                    <p className="font-semibold text-center">— ET —</p>
                    <div>
                      <p><strong>Partie B / Deuxième partie :</strong></p>
                      <p>[NOM LÉGAL COMPLET], [société par actions / personne physique / société de personnes] constituée et existant sous le régime des lois de [PROVINCE], ayant son adresse principale au [ADRESSE COMPLÈTE] (ci-après « [NOM ABRÉGÉ PARTIE B] »)</p>
                    </div>
                  </div>
                  <p>(individuellement une « Partie » et collectivement les « Parties »)</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-bold text-foreground uppercase text-xs tracking-widest">Préambule</h3>
                  <p><strong>ATTENDU QUE</strong> la Partie A souhaite {summary?.toLowerCase() || "conclure l'arrangement décrit aux présentes"} avec la Partie B, selon les modalités énoncées dans la présente Entente;</p>
                  <p><strong>ATTENDU QUE</strong> la Partie B possède l'expertise, les qualifications et la capacité requises pour remplir ses obligations aux termes de la présente Entente;</p>
                  <p><strong>ATTENDU QUE</strong> les Parties souhaitent consigner par écrit leurs droits et obligations respectifs;</p>
                  <p><strong>EN CONSÉQUENCE,</strong> en contrepartie des engagements et promesses réciproques énoncés aux présentes, et pour toute autre contrepartie valable dont la réception et la suffisance sont reconnues, les Parties conviennent de ce qui suit :</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-semibold text-foreground">Article {++clauseNum} — Définitions et interprétation</h3>
                  <p>{clauseNum}.1 Dans la présente Entente, à moins que le contexte n'exige une autre interprétation, les termes suivants ont le sens qui leur est attribué ci-dessous :</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>« Entente »</strong> désigne le présent {title}, y compris toutes les annexes et modifications s'y rattachant.</li>
                    <li><strong>« Jour ouvrable »</strong> désigne tout jour autre qu'un samedi, un dimanche ou un jour férié dans la province applicable.</li>
                    <li><strong>« Renseignements confidentiels »</strong> désigne tout renseignement, écrit, verbal, électronique ou autre, communiqué par une Partie à l'autre et désigné comme confidentiel ou dont le caractère confidentiel devrait raisonnablement être présumé.</li>
                    <li><strong>« Date d'entrée en vigueur »</strong> désigne la date indiquée en tête des présentes.</li>
                    <li><strong>« Durée »</strong> désigne la période pendant laquelle la présente Entente demeure en vigueur.</li>
                  </ul>
                  <p>{clauseNum}.2 Les titres ne servent qu'à la commodité et n'influent pas sur l'interprétation de la présente Entente. Le singulier comprend le pluriel et inversement. Les renvois à une loi comprennent ses modifications.</p>
                </div>
              </>
            ) : (
              <>
            <div className="space-y-3">
              <p>
                <strong>THIS {contract.name.toUpperCase()}</strong> (the "Agreement") is made and entered into as of the [DAY] day of [MONTH], [YEAR] (the "Effective Date"),
              </p>
              <p className="font-semibold">BY AND BETWEEN:</p>
              <div className="pl-4 space-y-3 border-l-2 border-secondary/30">
                <div>
                  <p><strong>Party A / First Party:</strong></p>
                  <p>[FULL LEGAL NAME], a [corporation/individual/partnership] organized and existing under the laws of [JURISDICTION], with a principal address at [FULL ADDRESS] (hereinafter referred to as "[PARTY A SHORT NAME]")</p>
                </div>
                <p className="font-semibold text-center">— AND —</p>
                <div>
                  <p><strong>Party B / Second Party:</strong></p>
                  <p>[FULL LEGAL NAME], a [corporation/individual/partnership] organized and existing under the laws of [JURISDICTION], with a principal address at [FULL ADDRESS] (hereinafter referred to as "[PARTY B SHORT NAME]")</p>
                </div>
              </div>
              <p>(each individually a "Party" and collectively the "Parties")</p>
            </div>

            {/* Whereas */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-foreground uppercase text-xs tracking-widest">Recitals</h3>
              <p><strong>WHEREAS,</strong> Party A desires to {contract.description?.toLowerCase() || "engage in the arrangement described herein"} with Party B on the terms and conditions set forth in this Agreement;</p>
              <p><strong>WHEREAS,</strong> Party B has the requisite expertise, qualifications, and capacity to fulfil its obligations under this Agreement;</p>
              <p><strong>WHEREAS,</strong> the Parties wish to set forth their respective rights and obligations in writing;</p>
              <p><strong>NOW, THEREFORE,</strong> in consideration of the mutual covenants, promises, and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:</p>
            </div>

            {/* Definitions */}
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-foreground">Article {++clauseNum} — Definitions and Interpretation</h3>
              <p>{clauseNum}.1 In this Agreement, unless the context otherwise requires, the following terms shall have the meanings ascribed to them:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>"Agreement"</strong> means this {contract.name}, including all schedules, exhibits, and amendments hereto.</li>
                <li><strong>"Business Day"</strong> means any day other than a Saturday, Sunday, or statutory holiday in the applicable jurisdiction.</li>
                <li><strong>"Confidential Information"</strong> means all information, whether written, oral, electronic, or otherwise, disclosed by one Party to the other that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information.</li>
                <li><strong>"Effective Date"</strong> means the date first written above.</li>
                <li><strong>"Term"</strong> means the period during which this Agreement remains in force and effect.</li>
              </ul>
              <p>{clauseNum}.2 Headings are for convenience only and shall not affect the interpretation of this Agreement. Words importing the singular include the plural and vice versa. References to legislation include amendments thereto.</p>
            </div>

              </>
            )}

            {/* First category-specific clause only */}
            {previewClauses.map((clause) => (
              <div key={clause.title} className="space-y-2">
                <h3 className="font-display font-semibold text-foreground">Article {++clauseNum} — {clause.title}</h3>
                <p>{clauseNum}.1 {clause.body}</p>
              </div>
            ))}
          </div>

          {/* Fade-out overlay to indicate more content */}
          <div className="relative -mt-24 h-32 bg-gradient-to-t from-background via-background/95 to-transparent z-20 pointer-events-none" />

          {/* Legal disclaimer */}
          <div className="relative z-20 -mt-4">
            <LegalDisclaimer context="contracts" variant="compact" />
          </div>

          {/* Subscribe CTA */}
          <div className="relative z-20 mt-4 p-6 rounded-lg bg-secondary/10 border border-secondary/20 text-center space-y-4">

            <div className="space-y-2">
              <p className="text-base font-display font-semibold text-foreground">
                {clauses.length - 1 + 8} more sections available in the full version
              </p>
              <p className="text-sm font-body text-muted-foreground">
                Subscribe to download the complete, editable contract without watermarks — including all articles, schedules, and signature blocks.
              </p>
            </div>
            {hasSubscription ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
                    <Download className="h-4 w-4" />
                    Download Full Version
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <FileDown className="h-4 w-4" />
                    Download as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    Download as Word (.docx)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <Link to={`/checkout?plan=contracts&lang=${language}`}>
                  <span className="whitespace-nowrap">
                    Subscribe ${price}/mo · {isFrench ? "French" : "English"} · Unlimited Downloads
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ContractPreviewDialog;
