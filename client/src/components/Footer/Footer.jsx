import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "./../../components/ui/Container";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#121212] py-10 md:py-16">
      <Container>
        <div className="mb-5 md:mb-8">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 md:h-14 mx-auto" />
          </Link>
        </div>
        <ul className="flex flex-wrap justify-center gap-5 text-[#ffffff99] text-sm md:text-base">
          <Link to="/">Home</Link>
          <Link to="/queries">Queries</Link>
          <Link to="/recommendations-for-me">Recommendations For Me</Link>
          <Link to="/my-queries">My Queries</Link>
          <Link to="/my-recommendations">My Recommendations</Link>
        </ul>
        <div className="flex justify-center gap-3 mt-8">
          <p className="border border-primary p-2 rounded-full cursor-pointer">
            <FaFacebook className="text-primary text-lg md:text-xl" />
          </p>
          <p className="border border-primary p-2 rounded-full cursor-pointer">
            <FaTwitter className="text-primary text-lg md:text-xl" />
          </p>
          <p className="border border-primary p-2 rounded-full cursor-pointer">
            <FaInstagram className="text-primary text-lg md:text-xl" />
          </p>
        </div>
        <p className="text-center mt-12 text-[#ffffff4d] text-xs md:text-sm lg:text-base">
          Copyright ©2024 All rights reserved | This template is made with by{" "}
          <span
            className="text-primary tooltip"
            data-tip="Alternative Product Information System"
          >
            api.system.com
          </span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
