// External Librairies
import Slider from 'react-slick'

// Styles
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

/**
 * SLIDER COMPONENT : Composant slider global auquel nous passons les enfants
 * @param children Composants enfants du slider
 * @param className string pour les class de style du slider
 * @param showArrow objet permettant d'afficher ou non les flèches latérales d'un slider selon la taille de l'écran
 * @param option options du slider
 */
const SliderComponent = ({ children, className, showArrow = { show: true, break1000: false }, option = {} }) => {
  // Initialisation des options du composant
  let optionArrow = {}
  let optionResponsive = {}

  // Si les flèches sont nécessaires alors je surcharge leur apparence avec des composants customs
  if (showArrow.show) {
    optionArrow = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }
  }

  // J'adapte les options de mon slider en fonction du breakpoint de responsive définit
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

  // Synthèse des paramètres du slider
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

// FLECHE SLIDE PRECEDENTE
const SamplePrevArrow = (props) => {
  const { display = '', onClick } = props
  return (
    <div className={`${display} slick-prev-custom icon-circle bg-blue text-white`} onClick={onClick}>
      <i className='fe fe-arrow-left' />
    </div>
  )
}

// FLECHE SLIDE SUIVANTE
const SampleNextArrow = (props) => {
  const { display = '', onClick } = props
  return (
    <div className={`${display} slick-next-custom icon-circle bg-blue text-white`} onClick={onClick}>
      <i className='fe fe-arrow-right mx-auto my-auto' />
    </div>
  )
}
