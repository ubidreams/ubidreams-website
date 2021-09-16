import { includes, isNull } from 'lodash'
import { Image, renderRule, StructuredText } from 'react-datocms'
import { isSpan, isHeading, isParagraph } from 'datocms-structured-text-utils'
import { LinkBeautify } from './link-beautify'

const Card = ({ config = {}, reverse = false, showShadows = false, textJustify = '', large = 1 }) => {
  return config.map((contentCard, index) => {
    const { image, content } = contentCard
    //Si le reverse est passé en props (true) alors le reverse par défault est inversé
    const conditionReverse = !reverse ? index % 2 == 1 : index / 2 == 1

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
            <div className='w-md-50 start-3 p-4 text-center position-relative' style={{ maxWidth: '12em' }}>
              <Image data={image.responsiveImage} alt='' />
            </div>
            <div
              className={`w-100 h-100 w-md-75 d-flex flex-column p-5 text-left 
            ${textJustify}`}
            >
              <div>
                <StructuredText
                  data={content}
                  renderLinkToRecord={({ record, children, transformedMeta }) => {
                    return (
                      <LinkBeautify record={record} meta={transformedMeta}>
                        {children}
                      </LinkBeautify>
                    )
                  }}
                  customRules={[
                    renderRule(isSpan, ({ node, children, key }) => {
                      if (node.marks && includes(node.marks, 'highlight')) {
                        return (
                          <node.type key={key} className='text-green'>
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
                    renderRule(isHeading, ({ node, children, key }) => {
                      const HeadingTag = `h${node.level}`
                      return (
                        <HeadingTag key={key} className='fs-4 fw-bolder'>
                          {children}
                        </HeadingTag>
                      )
                    }),
                    renderRule(isParagraph, ({ node, children, key }) => {
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
