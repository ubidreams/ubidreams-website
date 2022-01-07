/* FRAGMENTS */
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

export const tagSeoFragment = `
  fragment TagFragment on Tag {
    attributes
    content
    tag
  }
`
