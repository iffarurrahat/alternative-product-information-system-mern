import { useEffect, useState } from "react";
import Container from "../ui/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./Testimonial.css";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <div className="mb-6 sm:mb-10 md:mb-16">
      <Container>
        <div className="flex justify-center">
          <div className="mb-4 md:mb-8 text-center">
            <h3 className="text-3xl md:text-5xl mb-2 md:mb-3 font-semibold">
              Testimonial
            </h3>
            <p>See What people are saying</p>
          </div>
        </div>
        {/*  testimonial */}
        <Swiper
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          className="relative testimonial-slide"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="md:flex items-center md:gap-24 py-8 sm:px-5 md:px-20 lg:px-24">
                <div className="thumbnail mx-auto md:mx-0">
                  <img
                    src={review.image}
                    alt="review image"
                    // className="md:h-36 md:w-36"
                  />
                </div>
                <div className="aside relative mt-8 md:mt-16 mx-8 md:mx-0">
                  <p className="p-1 before:content-[open-quote] before:-top-6 md:before:-top-12 text-sm sm:text-base">
                    {review.review}
                  </p>
                  <h3 className="mt-4 md:mt-8 text-blue-700 font-bold text-lg md:tex-2xl">
                    {review.name}
                  </h3>
                  <p className="text-xs font-medium mt-0.5">{review.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="button-prev-slide top-[50%] left-0 absolute z-10 w-6 h-6 rounded-full bg-primary text-white grid place-items-center cursor-pointer">
            <HiOutlineArrowNarrowRight />
          </div>
          <div className=" button-next-slide top-[50%] right-0 absolute z-10 w-6 h-6 rounded-full bg-primary text-white grid place-items-center cursor-pointer">
            <HiOutlineArrowNarrowLeft />
          </div>
        </Swiper>
      </Container>
    </div>
  );
};

export default Testimonial;
