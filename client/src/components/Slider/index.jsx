import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Styled from "./styled";

import SliderPrevArrow from '../../components/SliderPrevArrow';
import SliderNextArrow from '../../components/SliderNextArrow';
import SliderFilmCard from "../SliderFilmCard";

const SlickSlider = ({ films }) => {
   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: films.length - 1,
      slidesToScroll: 1,
      initialSlide: 0,
      centerMode: true,
      prevArrow: <SliderPrevArrow />,
      nextArrow: <SliderNextArrow />,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               infinite: true
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               initialSlide: 2
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }
      ]
   };

   return (
      <>
         <Slider {...settings}>
            {films.map((film) => <SliderFilmCard key={film.id} film={film} />)}
         </Slider>
      </>
   );
}

export default SlickSlider;