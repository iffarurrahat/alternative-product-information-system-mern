/* eslint-disable react-hooks/exhaustive-deps */
import CountUp from "react-countup";
import { FaRegStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import { LiaAwardSolid } from "react-icons/lia";
import { RiCompasses2Line } from "react-icons/ri";
import { MdOutlineDiamond } from "react-icons/md";

// Custom hook to detect when an element is in the viewport
const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

const Counter = () => {
  const counterRef = useRef(null);
  const counterOn = useOnScreen(counterRef);

  // New state to ensure the counter runs only once after coming into view
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    if (counterOn && !hasCounted) {
      setHasCounted(true); // Set flag to true after counter starts
    }
  }, [counterOn, hasCounted]);

  return (
    <Container>
      <div className="counter mb-8 sm:mb-12 md:mb-20 py-5 sm:py-8 md:py-12 lg:py-16 rounded bg-primary">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <MdOutlineDiamond className="text-3xl sm:text-5xl" />
              </p>
            </div>
            <div ref={counterRef} className="relative">
              {/* Ensure that counter runs only once */}
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center my-1.5 md:my-3">
                {hasCounted && (
                  <CountUp start={0} end={368} duration={5} delay={0.3} />
                )}{" "}
                <span className="text-sm sm:text-xl absolute ml-2">+</span>
              </p>
            </div>
            <p className="font-semibold text-center">Queries Analyzed</p>
          </div>

          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <RiCompasses2Line className="text-3xl sm:text-5xl" />
              </p>
            </div>
            <div ref={counterRef} className="relative">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center my-1.5 md:my-3">
                {hasCounted && (
                  <CountUp start={0} end={785} duration={5} delay={0.3} />
                )}{" "}
                <span className="text-sm sm:text-xl absolute ml-2">+</span>
              </p>
            </div>
            <p className="font-semibold text-center">Ethical Consultants</p>
          </div>

          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <FaRegStar className="text-3xl sm:text-5xl" />
              </p>
            </div>
            <div ref={counterRef} className="relative">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center my-1.5 md:my-3">
                {hasCounted && (
                  <CountUp start={0} end={896} duration={5} delay={0.3} />
                )}{" "}
                <span className="text-sm sm:text-xl absolute ml-2">+</span>
              </p>
            </div>
            <p className="font-semibold text-center">5-Star Reviews</p>
          </div>

          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <LiaAwardSolid className="text-3xl sm:text-5xl" />
              </p>
            </div>
            <div ref={counterRef} className="relative">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center my-1.5 md:my-3">
                {hasCounted && (
                  <CountUp start={0} end={125} duration={5} delay={0.3} />
                )}{" "}
                <span className="text-sm sm:text-xl absolute ml-2">+</span>
              </p>
            </div>
            <p className="font-semibold text-center">Awards for Ethical</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Counter;
