import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderComponent = ({ children, className }) => {
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
    <div className={display + ' ' + 'slick-prev-custom icon-circle bg-blue text-white'} onClick={onClick}>
      <i className='fe fe-arrow-left' />
    </div>
  )
}

const SampleNextArrow = (props) => {
  const { display = '', onClick } = props
  return (
    <div className={display + ' ' + 'slick-next-custom icon-circle bg-blue text-white'} onClick={onClick}>
      <i className='fe fe-arrow-right mx-auto my-auto' />
    </div>
  )
}
