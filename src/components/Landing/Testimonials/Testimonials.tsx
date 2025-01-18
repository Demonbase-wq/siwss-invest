"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "@/translations/provider";

const Testimonials = () => {
      const { translations } = useTranslation();
  
  return (
    <div className="bg-primary text-gray-300 pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4">
          <h2 className="text-center text-[21px] md:text-4xl font-bold text-[#fff] mb-12">
          {translations?.testimonials?.textOne}
          </h2>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="mySwiper bg-transparent"
          >
            {/* Testimonial 1 */}
            <SwiperSlide>
              <div className="bg-[#150550] p-8 rounded-lg">
                <FaQuoteLeft className="text-accent text-3xl mb-4" />
                <p className="mb-4">
                  "{translations?.testimonials?.textTwo}"
                </p>
                <h4 className="font-semibold text-[#fff]">John D.</h4>
                <p className="text-sm">{translations?.testimonials?.textThree}</p>
              </div>
            </SwiperSlide>

            {/* Testimonial 2 */}
            <SwiperSlide>
              <div className="bg-[#150550] p-8 rounded-lg">
                <FaQuoteLeft className="text-accent text-3xl mb-4" />
                <p className="mb-4">
                  "{translations?.testimonials?.textFour}"
                </p>
                <h4 className="font-semibold text-[#fff]">Sarah K.</h4>
                <p className="text-sm">{translations?.testimonials?.textFive}</p>
              </div>
            </SwiperSlide>

            {/* Testimonial 3 */}
            <SwiperSlide>
              <div className="bg-[#150550] p-8 rounded-lg">
                <FaQuoteLeft className="text-accent text-3xl mb-4" />
                <p className="mb-4">
                  "{translations?.testimonials?.textSix}"
                </p>
                <h4 className="font-semibold text-[#fff]">Michael P.</h4>
                <p className="text-sm">{translations?.testimonials?.textSeven}</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
