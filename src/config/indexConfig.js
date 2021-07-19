import {
  Code,
  Smile,
  Router,
  Multiplatforme,
  Iot,
  Design,
  Accueil,
  Reference1 as BREN,
  Reference2 as PDP,
  Reference3 as SDLP,
  KnaufIndustrie,
  Gendarmerie,
  Elonglife
} from './StaticImagesExport.js'

const configFeatureContainer = [
  {
    delay: 0,
    img: {
      ...Code,
      alt: 'Icon balise html'
    },
    title: "Développement d'applications mobile & web",
    description:
      'Nous sommes spécialistes dans la conception et le développement de logiciels métier web et applications web et mobiles. '
  },
  {
    delay: 50,
    img: {
      ...Router,
      alt: 'Icon router'
    },
    title: 'IOT & Objets connectés',
    description:
      'Nous vous apportons notre expertise en IOT et nous vous aidons à créer des objets intelligents, connectés à vos outils informatiques.'
  },
  {
    delay: 100,
    img: {
      ...Smile,
      alt: 'Icon smiley content'
    },
    title: 'Conseil & expertises',
    description:
      'Nous vous accompagnons durant tout le processus de vie de votre projet et nous vous conseillons dans différents domaines (Design UX et UI, RGDP, ....).'
  }
]

const configPageTitle = {
  img: Accueil,
  title: "Création d'applications mobiles et d'objets connectés",
  description: 'Ubidreams vous accompagne dans la réalisation de vos projets',
  buttonDetails: [
    {
      name: 'Notre Expertise',
      path: '/expertises',
      class: 'btn-blue'
    },
    {
      name: "L'agence",
      path: '/agence',
      class: 'soft-blue'
    }
  ]
}

const configIntroduction = {
  title: 'Une agence basée à La Rochelle',
  subtitle: 'Ensemble réinventons le numérique',
  content:
    'Entreprise de Services Numériques (ESN) à votre service pour la création de solutions mobiles et logicielles sur mesure, Ubidreams vous accompagne dans chaque étape de votre transformation numérique. \n\n Nous nous appuyons sur nos savoir-faire en application web et mobile et en création d’objets connectés pour vous apporter conseils et expertises techniques dans les domaines transverses de la création d’applications et logiciels métiers.'
}

const configDataTechnos = {
  firstSection: [
    {
      img: {
        ...Multiplatforme,
        alt: 'Illustration compatibilité crossplateforme'
      },
      title: 'Votre application mobile multiplateforme avec',
      textLink: 'React Native',
      content: 'Nous développons des applications mobiles pour Android et IOS avec le framework React Native.'
    }
  ],
  secondSection: [
    {
      img: {
        ...Iot,
        alt: 'Illustration camion connecté'
      },
      title: 'Votre projet IoT avec',
      textLink: 'Beacon',
      content:
        'Nous créons des infrastructures connectées en nous basant sur des technologies de communication comme les Beacons'
    },
    {
      img: {
        ...Design,
        alt: 'Illustration web design'
      },
      title: 'Une utilisation optimisée grâce à l’',
      textLink: 'UX design',
      content:
        'Nous plaçons les utilisateurs finaux au centre du processus de création afin de leur offrir la meilleure expérience utilisateur possible.'
    }
  ]
}

const configTestimony = {
  introduction: {
    title: 'Ils nous font confiance',
    subtitle:
      'Découvrez les témoignages de nos clients et partenaires que nous avons accompagnés dans la conception et le développement de leurs projets.'
  },
  testimonials: [
    {
      img: {
        ...KnaufIndustrie,
        alt: 'Logo de Knauf industrie'
      },
      content:
        'Nous avons travaillé avec Ubidreams dans le cadre du développement d’une application mobile de prise de commande. Cette application intégrait également un back-office pour la réception de commande via une plateforme web pour nos ADV. L’application et le back-office sont pleinement opérationnels. Malgré de nombreuses modifications, à posteriori, du cahier des charges, la société Ubidreams a fait preuve de réactivité et de créativité pour rendre le système fonctionnel avec une prise en main très aisée.',
      footer: 'Knauf Industries \n Nicolas Pantzer, directeur Site de Guémené-sur-Scorff'
    },
    {
      img: {
        ...Gendarmerie,
        alt: 'Logo Gendarmerie de Lagord'
      },
      content:
        'Je suis satisfait du service rendu par Ubidreams. Le résultat est à la hauteur de ce qui était attendu. Parmi les points forts que je relèverai figurent l’accueil, l’écoute et le dynamisme qui ont permis à une jeune entreprise Rochelaise d’oser sortir des sentiers battus et de se mesurer aux administrations nationales. Un seul point à améliorer en ce qui me concerne dans la phase de réalisation : associer encore plus le client pour ajuster en temps réel les priorités et optimiser le temps passé sur chaque étape de programmation. Je recommande !',
      footer: 'Gendarmerie de LaGord \n M. Philip'
    },
    {
      img: {
        ...Elonglife,
        alt: 'Logo E-longlife par Bren-Tronics'
      },
      content:
        'La société Ubidreams avec laquelle nous travaillons depuis plus de 2 ans est une structure à taille humaine, très innovante et très flexible. Plus qu’une relation client fournisseur, nous avons avec l’équipe d’Ubidreams une véritable collaboration, et ce dès le départ du projet. C’est une équipe très flexible, réactive et jamais en panne de solutions innovantes.',
      footer: 'Bren-Tronics \n Yannick Boussard, Responsable industriel'
    }
  ]
}

const configReference = {
  introduction: {
    title: 'Nos dernières réalisations',
    subtitle: 'Découvrez nos derniers projets développés pour nos clients !'
  },
  references: [
    {
      img: SDLP,
      title: 'SDLP',
      subtitle: "Logiciel Web de scénario d'incendie"
    },
    {
      img: BREN,
      title: 'E-Longlife',
      subtitle: 'Logiciel Web pour les kits solaire'
    },
    {
      img: PDP,
      title: 'Application de prévente de produit',
      subtitle: 'Pré-ventes'
    }
  ]
}
export {
  configFeatureContainer,
  configPageTitle,
  configIntroduction,
  configDataTechnos,
  configTestimony,
  configReference
}
