const Section = ({
  bgColor = "",
  children,
  customStyle = {},
  display = "container",
}) => {
  return (
    <section
      className={"bg-between py-8 py-md-11" + " " + bgColor}
      style={customStyle}
    >
      <div className={`${display}`}>{children}</div>
    </section>
  );
};

export default Section;
