/* FRAGMENTS */

/**
 * fragment de requête pour récupérer les images
 */
export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

/**
 * fragment de requête pour récupérer média de type svg
 */
export const svgFragment = `
  fragment svgFieldFragment on FileField {
    alt
    filename
    url
    filename
    title
    height
    width
  }
`

/**
 * fragment de requête pour récupérer les données d'un collaborateur
 */
export const expertFragment = `
  fragment MembreRecordFragment on MembreRecord {
    title
    subtitle
    presentation
    cardCover {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
  }
`

/**
 * fragment de requête pour récupérer des données de type miniature de référence
 */
export const referenceFragment = `
  fragment ReferenceRecordFragment on ReferenceRecord {
    id
    title
    subtitle
    slug
    cardCover {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
  }
`

/**
 * fragment de requête pour récupérer des données de type miniature de page
 */
export const miniaturePageFragment = `
  fragment MiniaturePageFieldFragment on PageModelMiniaturePageField {
    value
    links {
      slug
      categorie
      id
    }
  }
`

/**
 * fragment de requête pour récupérer les tags SEO
 */
export const tagSeoFragment = `
  fragment TagFragment on Tag {
    attributes
    content
    tag
  }
`
