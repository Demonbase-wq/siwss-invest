"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

const Testimonials = () => {
  return (
    <div className="bg-primary pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4">
          <h2 className="text-center text-[21px] md:text-4xl font-bold text-[#fff] mb-12">
          What Our Investors Are Saying
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
                “SwissPipsAI has completely transformed the way I invest. The platform’s AI precision is unmatched, and I always achieve the promised ROI. Their support team is incredibly responsive, making the entire process stress-free.”

                </p>
                <h4 className="font-semibold text-[#fff]">John D.</h4>
                <p className="text-sm">Financial Consultant</p>
              </div>
            </SwiperSlide>

            {/* Testimonial 2 */}
            <SwiperSlide>
              <div className="bg-[#150550] p-8 rounded-lg">
                <FaQuoteLeft className="text-accent text-3xl mb-4" />
                <p className="mb-4">
                “The transparency and reliability of SwissPipsAI are what stand out to me the most. The user-friendly interface, combined with instant withdrawals, gives me total confidence in my investments.”

                </p>
                <h4 className="font-semibold text-[#fff]">Sarah K.</h4>
                <p className="text-sm">Entrepreneur</p>
              </div>
            </SwiperSlide>

            {/* Testimonial 3 */}
            <SwiperSlide>
              <div className="bg-[#150550] p-8 rounded-lg">
                <FaQuoteLeft className="text-accent text-3xl mb-4" />
                <p className="mb-4">
                “SwissPipsAI delivers on its promises! The AI algorithm ensures my investments grow exactly as expected, and their support team is always there to help. I highly recommend this platform to anyone serious about growing their wealth.”

                </p>
                <h4 className="font-semibold text-[#fff]">Michael P.</h4>
                <p className="text-sm">Software Engineer</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
