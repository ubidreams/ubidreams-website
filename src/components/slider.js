import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderComponent = ({ children, className, slideArrow900 = true }) => {
  const responsive_900 = {
    breakpoint: 1024,
    settings: {
      dots: true,
      nextArrow: <SampleNextArrow display='d-none' />,
      prevArrow: <SamplePrevArrow display='d-none' />
    }
  }

  const optionResponsive = slideArrow900 ? {} : responsive_900

  const settings = {
    dots: true,
    className: className,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    swipeToSlide: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      optionResponsive,
      {
        breakpoint: 480,
        settings: {
          dots: true,
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
