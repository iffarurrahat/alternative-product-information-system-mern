import Container from "../ui/Container";
import sicon1 from "../../assets/sicon1.png";
import sicon2 from "../../assets/sicon2.png";
import sicon3 from "../../assets/sicon3.png";
import sicon4 from "../../assets/sicon4.png";
import Counter from "./Counter";

const ServicesInfo = () => {
  return (
    <>
      <div className="mt-20 bg-[#211e3b]">
        <Container>
          <div className="pt-10 sm:pt-20 pb-96 sm:pb-60">
            {/* top-text-content */}
            <div className="text-white text-center">
              <p className="font-bold">Product Information</p>
              <h2 className="w-full sm:w-3/4 md:w-3/5 lg:w-[45%] mx-auto text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
                Our Professional Solutions For Product
              </h2>
            </div>

            {/* Service Info Card  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 sm:mt-12 md:mt-14 lg:mt-16">
              <div className="border-2 border-[#312e49] text-white text-center hover:bg-[#2E2A50] transition-all py-10 px-5 rounded cursor-pointer shadow">
                <img src={sicon1} alt="sicon1" className="mx-auto" />
                <h4 className="font-bold whitespace-nowrap mt-5 md:mt-6 mb-1.5 sm:mb-3">
                  Manage Product Information
                </h4>
                <p className="text-[#9a95c0] leading-7 text-sm font-medium">
                  Explore how to manage product data efficiently with our
                  system.
                </p>
              </div>
              <div className="border-2 border-[#312e49] text-white text-center hover:bg-[#2E2A50] transition-all py-10 px-5 rounded cursor-pointer shadow">
                <img src={sicon2} alt="sicon1" className="mx-auto" />
                <h4 className="font-bold whitespace-nowrap mt-5 md:mt-6 mb-1.5 sm:mb-3">
                  Recommendation Engine
                </h4>
                <p className="text-[#9a95c0] leading-7 text-sm font-medium">
                  Enhance customer experience with ethical and well-informed
                  product recommendations.
                </p>
              </div>
              <div className="border-2 border-[#312e49] text-white text-center hover:bg-[#2E2A50] transition-all py-10 px-5 rounded cursor-pointer shadow">
                <img src={sicon3} alt="sicon1" className="mx-auto" />
                <h4 className="font-bold whitespace-nowrap mt-5 md:mt-6 mb-1.5 sm:mb-3">
                  Data-Driven Insights
                </h4>
                <p className="text-[#9a95c0] leading-7 text-sm font-medium">
                  Unlock valuable insights on product sourcing and
                  sustainability practices.
                </p>
              </div>
              <div className="border-2 border-[#312e49] text-white text-center hover:bg-[#2E2A50] transition-all py-10 px-5 rounded cursor-pointer shadow">
                <img src={sicon4} alt="sicon1" className="mx-auto" />
                <h4 className="font-bold whitespace-nowrap mt-5 md:mt-6 mb-1.5 sm:mb-3">
                  Ethical Product Analysis
                </h4>
                <p className="text-[#9a95c0] leading-7 text-sm font-medium">
                  Get detailed reports on the ethical sourcing and production
                  standards of various brands.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* Counter section */}
      <section className="-mt-80 sm:-mt-40">
        <Counter />
      </section>
    </>
  );
};

export default ServicesInfo;
