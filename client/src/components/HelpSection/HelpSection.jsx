import { GiBubbles } from "react-icons/gi";
import { SiParrotsecurity } from "react-icons/si";
import { VscSymbolInterface } from "react-icons/vsc";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import Container from "../ui/Container";

const HelpSection = () => {
  return (
    <div className="mt-16">
      <Container>
        {/* TOP_Section */}
        <div className="flex justify-center mb-5 md:mb-10">
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-semibold text-primary mb-2">
              How We Can Help You
            </p>
            <h3 className="w-4/5 md:w-full mx-auto">
              We Help Enhance Your Product Information System
            </h3>
          </div>
        </div>

        {/* MAIN_Section */}
        <div className="md:flex md:gap-10">
          <div className="md:w-1/3">
            <img
              src="https://html.rrdevs.net/techex/assets/img/home1/feature_img.jpg"
              alt="image"
              className="mx-auto md:mx-0 h-72 sm:h-96 md:h-full rounded-md"
            />
          </div>
          <div className="md:w-4/6 mt-10 md:mt-0">
            {/* up-text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* part-1 */}
              <div className="flex items-center gap-5 shadow rounded px-5 py-8 border border-secondary/10">
                <GiBubbles className="text-4xl text-primary" />
                <div>
                  <h5 className="text-primary font-medium md:font-bold mb-0.5">
                    Product Information Consultancy
                  </h5>
                  <p className="font-semibold text-gray-500 text-sm md:text-base">
                    Tailored & Efficient Solutions
                  </p>
                </div>
              </div>
              {/* part-2 */}
              <div className="flex items-center gap-5 shadow rounded px-5 py-8 border border-secondary/10">
                <SiParrotsecurity className="text-4xl text-primary" />
                <div>
                  <h5 className="text-primary font-medium md:font-bold mb-0.5">
                    Data Security & Compliance
                  </h5>
                  <p className="font-semibold text-gray-500 text-sm md:text-base">
                    Tailored & Efficient Solutions
                  </p>
                </div>
              </div>
              {/* part-3 */}
              <div className="flex items-center gap-5 shadow rounded px-5 py-8 border border-secondary/10">
                <FaAssistiveListeningSystems className="text-4xl text-primary" />
                <div>
                  <h5 className="text-primary font-medium md:font-bold mb-0.5">
                    System Development & Integration
                  </h5>
                  <p className="font-semibold text-gray-500 text-sm md:text-base">
                    Tailored & Efficient Solutions
                  </p>
                </div>
              </div>
              {/* part-4 */}
              <div className="flex items-center gap-5 shadow rounded px-5 py-8 border border-secondary/10">
                <VscSymbolInterface className="text-4xl text-primary" />
                <div>
                  <h5 className="text-primary font-medium md:font-bold mb-0.5">
                    User Experience & Interface Design
                  </h5>
                  <p className="font-semibold text-gray-500 text-sm md:text-base">
                    Tailored & Efficient Solutions
                  </p>
                </div>
              </div>
            </div>
            {/* down-text */}
            <div className="mt-5 md:mt-8 shadow p-8 md:p-16 rounded text-white bg-primary bg-opacity-50 bg-[url(https://html.rrdevs.net/techex/assets/img/home1/wave.png)] md:leading-8 text-sm md:text-base">
              <p className="">
                Our services ensure your product information system is secure,
                efficient, and user-friendly, driving better business outcomes.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpSection;
