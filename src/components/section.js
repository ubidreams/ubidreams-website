const Section = ({ bgClass = '', children, customStyle = {}, display = 'container', ...props }) => {
  return (
    <section className={'py-8 py-md-11' + ' ' + bgClass} style={customStyle} {...props}>
      <div className={`${display}`}>{children}</div>
    </section>
  )
}

export default Section
