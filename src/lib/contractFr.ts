// French (Français) translations for the Canadian contract library.
// Keyed by contract id from the fallback catalogue in src/pages/Contracts.tsx.

export interface FrEntry {
  name: string;
  description: string;
}

export const CATEGORY_FR: Record<string, string> = {
  All: "Toutes",
  Business: "Affaires",
  Employment: "Emploi",
  "Real Estate": "Immobilier",
  Family: "Famille",
  "Estate Planning": "Planification successorale",
  Financial: "Finance",
  Loans: "Prêts",
  Service: "Services",
  Partnership: "Société de personnes",
  Corporate: "Sociétés par actions",
  "IP & Releases": "PI et décharges",
  Procurement: "Approvisionnement",
};

export const CONTRACTS_FR: Record<string, FrEntry> = {
  // ---------- Business ----------
  b1: { name: "Entente de confidentialité (NDA)", description: "Entente de confidentialité mutuelle ou unilatérale" },
  b2: { name: "Contrat d'entrepreneur indépendant", description: "Retenir les services d'un entrepreneur" },
  b3: { name: "Contrat de service", description: "Entente générale de prestation de services" },
  b4: { name: "Contrat de consultation", description: "Services de consultation professionnelle" },
  b5: { name: "Contrat de vente", description: "Vente de biens entre acheteur et vendeur" },
  b6: { name: "Acte de vente", description: "Transfert de propriété d'un bien meuble" },
  b7: { name: "Contrat d'achat d'entreprise", description: "Vente d'une entreprise existante" },
  b8: { name: "Contrat d'achat d'actifs", description: "Acheter ou vendre des actifs d'entreprise" },
  b9: { name: "Lettre d'intention", description: "Énoncer les modalités préliminaires d'une transaction" },
  b10: { name: "Protocole d'entente (PE)", description: "Énoncé d'intention non contraignant" },
  b11: { name: "Contrat de coentreprise", description: "Deux parties collaborant à un projet" },
  b12: { name: "Contrat de franchise", description: "Octroyer le droit d'exploiter une franchise" },
  b13: { name: "Contrat de distribution", description: "Distribuer des produits sur un territoire" },
  b14: { name: "Contrat de revendeur", description: "Autoriser la revente de produits ou services" },
  b15: { name: "Contrat de commandite", description: "Commanditer un événement, une personne ou une entité" },
  b16: { name: "Contrat d'affiliation", description: "Verser des commissions sur les ventes référées" },
  b17: { name: "Contrat d'abonnement", description: "Abonnement récurrent à un produit ou service" },
  b18: { name: "Contrat de traiteur", description: "Services de restauration pour événements" },
  b19: { name: "Contrat de fournisseur événementiel", description: "Fournisseur offrant des services lors d'un événement" },
  b20: { name: "Contrat de photographie", description: "Services de photographie professionnelle" },

  // ---------- Corporate / Partnership ----------
  c1: { name: "Contrat de société de personnes", description: "Créer une société en nom collectif" },
  c2: { name: "Contrat de société en commandite", description: "Structure de commanditaires et commandités" },
  c3: { name: "Convention entre actionnaires", description: "Droits et obligations des actionnaires" },
  c5: { name: "Statuts constitutifs", description: "Constituer une société par actions" },
  c6: { name: "Règlements administratifs", description: "Règles internes d'une société par actions" },
  c7: { name: "Résolution du conseil d'administration", description: "Consigner les décisions officielles du conseil" },
  c8: { name: "Procès-verbal d'assemblée des actionnaires", description: "Compte rendu des assemblées d'actionnaires" },
  c9: { name: "Convention d'achat d'actions", description: "Acheter ou vendre des actions de la société" },
  c10: { name: "Formulaire de transfert d'actions", description: "Transférer la propriété d'actions" },
  c11: { name: "Convention d'achat-vente", description: "Encadrer les transferts d'actions entre propriétaires" },
  c12: { name: "Modèle de plan d'affaires", description: "Document structuré de plan d'affaires" },

  // ---------- Employment ----------
  e1: { name: "Contrat de travail", description: "Entente d'emploi à temps plein ou partiel" },
  e2: { name: "Lettre d'offre d'emploi", description: "Offre d'emploi officielle" },
  e3: { name: "Lettre de congédiement", description: "Congédiement officiel d'un employé" },
  e4: { name: "Lettre de démission", description: "Modèle de démission d'un employé" },
  e5: { name: "Clause de non-concurrence", description: "Limiter la concurrence après l'emploi" },
  e6: { name: "Clause de non-sollicitation", description: "Limiter la sollicitation de clients ou d'employés" },
  e7: { name: "Entente de confidentialité de l'employé", description: "Confidentialité applicable aux employés" },
  e8: { name: "Manuel de l'employé", description: "Politiques et procédures en milieu de travail" },
  e9: { name: "Contrat de stage", description: "Modalités d'un stage rémunéré ou non" },
  e10: { name: "Entente d'indemnité de départ", description: "Modalités de cessation d'emploi et quittance" },
  e11: { name: "Entente de commission", description: "Structure de commissions sur les ventes" },

  // ---------- Real Estate ----------
  r1: { name: "Bail résidentiel", description: "Location à long terme d'une résidence" },
  r2: { name: "Bail mensuel", description: "Location résidentielle périodique" },
  r3: { name: "Bail commercial", description: "Location de locaux commerciaux" },
  r4: { name: "Contrat de sous-location", description: "Sous-louer des locaux loués" },
  r5: { name: "Entente de colocation", description: "Modalités de vie en colocation" },
  r6: { name: "Demande de location", description: "Formulaire de sélection des locataires" },
  r7: { name: "Avis d'éviction", description: "Avis de quitter les lieux" },
  r8: { name: "Avis de payer le loyer ou de quitter", description: "Mise en demeure pour loyer en retard" },
  r9: { name: "Lettre de résiliation de bail", description: "Mettre fin à un bail par anticipation ou sur avis" },
  r10: { name: "Modification de bail", description: "Modifier un bail existant" },
  r11: { name: "Cession de bail", description: "Céder un bail à un nouveau locataire" },
  r12: { name: "Contrat d'achat immobilier", description: "Acheter ou vendre une propriété résidentielle" },
  r13: { name: "Promesse d'achat immobilier", description: "Offre d'achat initiale" },
  r16: { name: "Contrat hypothécaire", description: "Garantir un prêt immobilier" },
  r18: { name: "Contrat de gestion immobilière", description: "Retenir les services d'un gestionnaire d'immeuble" },
  r19: { name: "Contrat de location de vacances", description: "Modalités de location de courte durée" },
  r20: { name: "Bail d'espace d'entreposage", description: "Louer un espace ou une unité d'entreposage" },
  r21: { name: "Bail de place de stationnement", description: "Louer une place de stationnement" },

  // ---------- Estate Planning ----------
  es1: { name: "Testament", description: "Répartir votre succession selon vos volontés" },
  es2: { name: "Codicille au testament", description: "Modifier un testament existant" },
  es3: { name: "Directives médicales anticipées", description: "Volontés médicales de fin de vie" },
  es4: { name: "Fiducie entre vifs", description: "Fiducie entre vifs révocable" },
  es5: { name: "Procuration générale", description: "Nommer un mandataire" },
  es6: { name: "Procuration (affaires financières)", description: "Pouvoirs sur les questions financières" },
  es7: { name: "Procuration (soins médicaux)", description: "Pouvoir de décision en matière de santé" },
  es8: { name: "Révocation de procuration", description: "Révoquer une procuration antérieure" },
  es9: { name: "Feuille de travail successorale", description: "Organiser les renseignements successoraux" },

  // ---------- Family ----------
  f1: { name: "Contrat de mariage (prénuptial)", description: "Entente patrimoniale avant le mariage" },
  f2: { name: "Entente postnuptiale", description: "Entente patrimoniale après le mariage" },
  f3: { name: "Contrat de vie commune", description: "Conjoints de fait vivant ensemble" },
  f4: { name: "Convention de séparation", description: "Modalités de la séparation conjugale" },
  f5: { name: "Convention de règlement de divorce", description: "Régler les questions liées au divorce" },
  f6: { name: "Entente de garde d'enfants", description: "Plan de garde et de temps parental" },
  f7: { name: "Entente de pension alimentaire pour enfants", description: "Soutien financier des enfants" },
  f8: { name: "Plan parental", description: "Calendrier détaillé de coparentalité" },
  f9: { name: "Entente de garde d'animal de compagnie", description: "Garde partagée des animaux" },
  f10: { name: "Avis de changement de nom", description: "Aviser les parties d'un changement de nom légal" },

  // ---------- Financial / Loans ----------
  l1: { name: "Billet à ordre", description: "Promesse écrite de rembourser une dette" },
  l2: { name: "Contrat de prêt", description: "Modalités d'un prêt personnel ou commercial" },
  l3: { name: "Reconnaissance de dette", description: "Simple reconnaissance d'une dette" },
  l4: { name: "Cautionnement personnel", description: "Garantir l'obligation d'autrui" },
  l5: { name: "Entente de règlement de dette", description: "Régler une dette impayée" },
  l6: { name: "Mise en demeure de payer", description: "Exiger le remboursement des sommes dues" },
  l7: { name: "Contrat de sûreté", description: "Accorder une sûreté sur des biens" },
  l8: { name: "Décharge de responsabilité (renonciation)", description: "Renoncer à des recours contre une autre partie" },
  l9: { name: "Modèle de reçu", description: "Accuser réception d'un paiement" },
  l10: { name: "Modèle de facture", description: "Facturer des biens ou des services" },

  // ---------- IP & Releases ----------
  ip1: { name: "Cession de droit d'auteur", description: "Transférer la titularité du droit d'auteur" },
  ip2: { name: "Licence de droit d'auteur", description: "Concéder l'utilisation d'une œuvre protégée" },
  ip3: { name: "Licence de marque de commerce", description: "Concéder l'usage d'une marque de commerce" },
  ip4: { name: "Cession de marque de commerce", description: "Transférer la propriété d'une marque" },
  ip5: { name: "Autorisation photo / mannequin", description: "Permission d'utiliser l'image d'une personne" },
  ip6: { name: "Formulaire d'autorisation vidéo", description: "Permission d'utiliser des séquences vidéo" },
  ip7: { name: "Formulaire d'autorisation médiatique", description: "Consentement général à l'utilisation médiatique" },
  ip8: { name: "Conditions d'utilisation du site Web", description: "Encadrer l'utilisation d'un site Web" },
  ip9: { name: "Politique de confidentialité", description: "Divulguer les pratiques de collecte de données" },
  ip10: { name: "CLUF (contrat de licence d'utilisateur final)", description: "Modalités de licence d'un logiciel" },

  // ---------- Misc Service ----------
  s1: { name: "Contrat de garde d'enfants / gardienne", description: "Services de garde à domicile" },
  s2: { name: "Contrat de soins pour animaux", description: "Services de gardiennage ou de pension d'animaux" },
  s3: { name: "Contrat de services de nettoyage", description: "Nettoyage résidentiel ou commercial" },
  s4: { name: "Contrat d'aménagement paysager", description: "Entretien de la pelouse et du jardin" },
  s5: { name: "Contrat de rénovation résidentielle", description: "Travaux de construction résidentielle" },
  s6: { name: "Contrat de construction", description: "Entente générale de construction" },
  s7: { name: "Acte de vente de véhicule", description: "Vendre ou acheter un véhicule" },
  s8: { name: "Contrat de location de véhicule", description: "Louer un véhicule personnel" },
  s9: { name: "Acte de vente de bateau", description: "Vendre ou acheter un bateau" },
  s10: { name: "Contrat de location d'équipement", description: "Louer des outils ou de l'équipement" },

  // ---------- Approvisionnement ----------
  p1: { name: "Contrat-cadre de services (MSA)", description: "Modalités générales encadrant tous les mandats d'un fournisseur" },
  p2: { name: "Contrat d'abonnement SaaS", description: "Modalités d'abonnement et de licence à un logiciel infonuagique" },
  p3: { name: "Contrat de consultation en approvisionnement", description: "Retenir un consultant pour un mandat d'approvisionnement" },
  p4: { name: "Contrat de sous-traitance", description: "Transposer les modalités du contrat principal au sous-traitant" },
  p5: { name: "Énoncé des travaux (EDT)", description: "Portée, livrables, jalons et critères d'acceptation" },
  p6: { name: "Modèle de demande de propositions (DP)", description: "Lancer un appel de propositions concurrentiel" },
  p7: { name: "Modèle de demande de prix (DDP)", description: "Solliciter des soumissions de prix auprès des fournisseurs" },
  p8: { name: "Conditions générales de bon de commande", description: "Modalités types jointes aux bons de commande" },
  p9: { name: "Contrat de fournisseur", description: "Fourniture continue de biens ou de services" },
  p10: { name: "Entente de niveau de service (ENS)", description: "Cibles de rendement, crédits et recours" },
  p11: { name: "Entente de soumission d'appel d'offres", description: "Modalités régissant le dépôt d'une soumission" },
  p12: { name: "Entente de traitement des données", description: "Obligations du fournisseur en matière de vie privée et de données" },
  p13: { name: "Contrat de fourniture de biens", description: "Fourniture récurrente de biens avec modalités de livraison" },
  p14: { name: "Code de conduite des fournisseurs", description: "Normes d'éthique, de travail et de conformité des fournisseurs" },
  p15: { name: "Ordre de modification / avenant au contrat", description: "Modifier la portée, le prix ou l'échéancier d'un contrat" },
  p16: { name: "Entente de consortium (soumission conjointe)", description: "Soumission conjointe entre entrepreneurs" },
};

/**
 * Contract listing names/descriptions stay in English even in French mode —
 * only the generated contract document itself is translated.
 */
export function localizeContract<T extends { id: string; name: string; description: string | null; category: string }>(
  contract: T,
  _language: "en" | "fr",
): T {
  return contract;
}

/** Category labels also stay in English. */
export function localizeCategory(category: string, _language: "en" | "fr") {
  return category;
}

/** French name/description used only inside the generated document/preview. */
export function frenchContractEntry(id: string): FrEntry | undefined {
  return CONTRACTS_FR[id];
}
