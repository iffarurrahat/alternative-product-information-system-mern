import { MdOutlinePeopleAlt } from "react-icons/md";
import Container from "../ui/Container";

const AboutSection = () => {
  return (
    <div className="mt-2 md:mt-5">
      <Container>
        <img
          src="https://html.rrdevs.net/techex/assets/img/dot-circle.png"
          alt="image"
          className="-mb-24 -ml-16 h-32 md:h-full"
        />
        <div className="md:flex gap-10">
          <div className="md:flex-1">
            <div className="mb-2 md:mb-3">
              <p className="text-primary font-bold mb-0.5 md:mb-1 text-lg md:text-xl">
                About Us
              </p>
              <h2 className="text-xl md:text-3xl font-bold w-4/5 md:w-full">
                About Alternative Product Information System
              </h2>
            </div>
            <p className="leading-8 mb-2">
              Our platform connects you with expert consultants to optimize,
              secure, and innovate your product information systems, ensuring
              accuracy, efficiency, and a competitive edge through data-driven
              strategies and industry best practices.
            </p>
            <div className="flex items-center gap-5 rounded px-2.5 md:px-5 py-4 md:py-8 border-2 border-primary">
              <MdOutlinePeopleAlt className="text-4xl text-primary w-24 md:w-20" />
              <div>
                <h5 className="text-primary font-medium md:font-bold mb-0.5">
                  Professional Consultants
                </h5>
                <p className="font-semibold text-gray-500 text-sm md:text-base">
                  Our team of experts ensures that your product information
                  system meets the highest standards, tailored to your specific
                  business needs.
                </p>
              </div>
            </div>
          </div>
          <div className="md:flex-1 mt-5 md:mt-0">
            <img
              src="https://html.rrdevs.net/techex/assets/img/home1/about-us.jpg"
              alt="image"
              className="rounded h-full"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutSection;
