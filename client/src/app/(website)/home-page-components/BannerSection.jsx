"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSection({ sliderDataList, sliderStaticPath }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full bg-white">
      <style>{`
        .slick-dots {
         bottom: 25px !important;
        }
        .slick-dots li {
          margin: 0 0.5px !important;
        }
        .slick-dots li button:before {
          font-size: 8px !important;
          color: #ffffff !important;
          opacity: 0.7;
        }
        .slick-dots li.slick-active button:before {
          font-size: 14px !important;
          color: #ff6f00 !important;
          opacity: 1;
        }
  `}</style>
      {
        <Slider {...settings}>
          {sliderDataList.map((items, index) => {
            return (
              items.sliderStatus ? (
                <div>
                  <img
                    src={sliderStaticPath + items.sliderImage}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              ): null
            );
          })}
        </Slider>
      }
    </div>
  );
}
