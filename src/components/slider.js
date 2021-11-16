import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const SliderComponent = ({ children, className, showArrow = { show: true, break1000: false }, option = {} }) => {
  let optionArrow = {}
  let optionResponsive = {}

  if (showArrow.show) {
    optionArrow = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }
  }

  if (showArrow.break1000) {
    optionResponsive = {
      breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 1,
        nextArrow: <SampleNextArrow display='d-none' />,
        prevArrow: <SamplePrevArrow display='d-none' />
      }
    }
  }

  const settings = {
    ...option,
    ...optionArrow,
    dots: true,
    className: className,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    responsive: [
      optionResponsive,
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          nextArrow: <SampleNextArrow display='d-none' />,
          prevArrow: <SamplePrevArrow display='d-none' />
        }
      }
    ]
  }

  return <Slider {...settings}>{children}</Slider>
}

export default SliderComponent

const SamplePrevArrow = (props) => {
  const { display = '', onClick } = props
  return (
    <div className={`${display} slick-prev-custom icon-circle bg-blue text-white`} onClick={onClick}>
      <i className='fe fe-arrow-left' />
    </div>
  )
}

const SampleNextArrow = (props) => {
  const { display = '', onClick } = props
  return (
    <div className={`${display} slick-next-custom icon-circle bg-blue text-white`} onClick={onClick}>
      <i className='fe fe-arrow-right mx-auto my-auto' />
    </div>
  )
}
