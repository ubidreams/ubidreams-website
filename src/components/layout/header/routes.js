// Arborescence des liens du menu
const routes = [
  {
    key: 'home'
  },
  {
    key: 'expertise',
    items: [
      {
        key: 'development'
      },
      {
        key: 'internet-of-things'
      },
      {
        key: 'consulting'
      },
      {
        key: 'design'
      },
      {
        key: 'expertises'
      }
    ]
  },
  {
    key: 'solution',
    items: [
      {
        key: 'ubishield'
      },
      {
        key: 'ubitrack'
      },
      {
        key: 'ubipoi'
      },
      {
        key: 'solutions-metiers-sur-mesure'
      }
    ]
  },
  {
    key: 'agency'
  },
  {
    key: 'references'
  },
  {
    key: 'blog'
  },
  {
    key: 'contact'
  }
]

export default routes
