import { Code, Smile, Router, Multiplatforme, Iot, Design, Accueil } from './StaticImagesExport.js'

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
  }
}

const configReference = {
  introduction: {
    title: 'Nos dernières réalisations',
    subtitle: 'Découvrez nos derniers projets développés pour nos clients !'
  }
}
export {
  configFeatureContainer,
  configPageTitle,
  configIntroduction,
  configDataTechnos,
  configTestimony,
  configReference
}
