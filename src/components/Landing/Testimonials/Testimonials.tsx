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
          <h2 className="text-center text-2xl md:text-4xl font-bold text-[#fff] mb-12">
            What Our Users Are Saying
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
                  “I&apos;ve been trading with this platform for months, and I
                  couldn&apos;t be happier. The process is straightforward, the
                  customer support is top-notch, and my investments are always
                  secure. Highly recommend for anyone serious about trading!”
                </p>
                <h4 className="font-semibold text-[#fff]">John D.</h4>
                <p className="text-sm">Professional Trader</p>
              </div>
            </SwiperSlide>

            {/* Testimonial 2 */}
            <SwiperSlide>
              <div className="bg-[#150550] p-8 rounded-lg">
                <FaQuoteLeft className="text-accent text-3xl mb-4" />
                <p className="mb-4">
                  “What I love most about this broker is the transparency. The
                  platform is user-friendly, and the withdrawal process is
                  lightning fast. It&apos;s clear they prioritize both security
                  and ease of use, which gives me the confidence to invest
                  more.”
                </p>
                <h4 className="font-semibold text-[#fff]">Sarah K.</h4>
                <p className="text-sm">Entrepreneur & Investor</p>
              </div>
            </SwiperSlide>

            {/* Testimonial 3 */}
            <SwiperSlide>
              <div className="bg-[#150550] p-8 rounded-lg">
                <FaQuoteLeft className="text-accent text-3xl mb-4" />
                <p className="mb-4">
                  “I&apos;ve worked with multiple brokers, but none compare to the
                  level of support and service I&apos;ve received here. They were
                  always there to answer my questions and help me navigate
                  tricky trades. This is my go-to platform from now on.”
                </p>
                <h4 className="font-semibold text-[#fff]">Michael P.</h4>
                <p className="text-sm">Data Analyst</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
