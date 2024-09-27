import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "./Slider";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const res = await fetch("slider.json");
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        toast.error(error);
      }
    };
    loadSlides();
  }, []);

  return (
    <div>
      <Slider slides={slides} />
    </div>
  );
};

export default Banner;
