// External Librairires
import { isHeading, isParagraph, isSpan } from 'datocms-structured-text-utils'
import { includes, isNull } from 'lodash'
import { Image, renderRule, StructuredText } from 'react-datocms'

// Components
import { LinkBeautify } from './link-beautify'

/**
  CARD : card globale
  Permet d'afficher un ensemble de données sous le format de carte avec un texte et une image
    @param config objet contenant les données à afficher dans le composant
    @param reverse booléen afin de déterminer l'affichage des cards (texte à droite ou à gauche de l'image)
    @param showShadows booléen pour indiquer l'ajout de shadow autour de la card
    @param textJustify string avec un mot clé (center, left, right) pour justifier le texte
    @param large number détermine la card (via l'index) qui sera la plus large
*/
const Card = ({ config = {}, reverse = false, showShadows = false, textJustify = '', large = 1 }) => {
  return config.map((contentCard, index) => {
    // J'extrais les données nécessaires
    const { image, content } = contentCard
    //Si le reverse est passé en props (true) alors le reverse par défaut est inversé
    const conditionReverse = !reverse ? index % 2 == 1 : index / 2 == 1

    // Si le content n'est pas null alors j'affiche le rendu
    // Les différentes valeurs booléennes récupérées permettent de conditionner le rendu du composant
    if (!isNull(content)) {
      return (
        <div
          key={index}
          className={`p-3 mb-3 mw-md-${index == large - 1 ? '100' : '50'}
          ${showShadows ? 'shadow-light-lg' : ''}
          `}
        >
          <div
            className={`d-md-flex flex-md-row  align-items-center card h-100 ${
              conditionReverse ? 'flex-md-row-reverse' : ''
            }`}
          >
            {/* Affichage de l'image */}
            <div className='w-md-50 start-3 p-4 text-center position-relative' style={{ maxWidth: '12em' }}>
              <Image data={image.responsiveImage} alt='' />
            </div>
            <div
              className={`w-100 h-100 w-md-75 d-flex flex-column p-5 text-left 
            ${textJustify}`}
            >
              <div>
                {/* RENDU CONTENU */}
                <StructuredText
                  data={content}
                  renderLinkToRecord={({ record, children, transformedMeta }) => {
                    // Rendu custom des liens vers les autres pages (contraintes de réécriture des urls avec les "catégories") CF. LinkBeautify
                    return (
                      <LinkBeautify record={record} meta={transformedMeta}>
                        {children}
                      </LinkBeautify>
                    )
                  }}
                  customRules={[
                    // Rendu custom de texte en gras
                    renderRule(isSpan, ({ node, key }) => {
                      if (node.marks && includes(node.marks, 'highlight')) {
                        return (
                          <node.type key={key} className='text-black'>
                            {node.value}
                          </node.type>
                        )
                      }

                      if (node.marks && includes(node.marks, 'strong')) {
                        return (
                          <node.type key={key} className='fw-bold'>
                            {node.value}
                          </node.type>
                        )
                      }

                      return <node.type key={key}>{node.value}</node.type>
                    }),
                    // Rendu custom de titre
                    renderRule(isHeading, ({ node, children, key }) => {
                      const HeadingTag = `h${node.level}`
                      return (
                        <HeadingTag key={key} className='fs-4 fw-bolder'>
                          {children}
                        </HeadingTag>
                      )
                    }),
                    // Rendu custom de paragraphe de texte
                    renderRule(isParagraph, ({ children, key }) => {
                      return (
                        <p key={key} className='text-muted'>
                          {children}
                        </p>
                      )
                    })
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  })
}

export default Card
