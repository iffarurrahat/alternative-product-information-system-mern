import Container from "../ui/Container";
import team1 from "../../assets/team1.jpg";
import team2 from "../../assets/team2.jpg";
import team3 from "../../assets/team3.jpg";
import team4 from "../../assets/team4.jpg";
import { FaBehance, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const TeamMembers = () => {
  return (
    <div className="mb-56">
      <Container>
        {/* top-content */}
        <div>
          <p className="text-primary font-bold mb-1.5 sm:mb-3">
            Exclusive Members
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold w-full sm:w-3/5 md:w-2/3 lg:w-1/2">
            Meet Our Experience Team Members
          </h2>
        </div>

        {/* team members card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <div className="relative">
            <div>
              <img
                src={team1}
                alt="team1 image"
                className="mx-auto z-50 rounded-md"
              />
            </div>
            <div className="bg-gray-100 w-full flex items-end justify-center absolute top-1/2 -z-10 pt-32 rounded-lg">
              <div>
                <h4 className="text-xl font-bold text-center mb-1">
                  Wallace S. Camacho
                </h4>
                <p className="text-gray-500 font-medium text-sm mb-5 text-center">
                  Product Information Specialist
                </p>

                <div className="mb-5 flex justify-center gap-3 ">
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaFacebookF className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaXTwitter className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaYoutube className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaBehance className="text-primary" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-36 sm:mt-0">
            <div>
              <img
                src={team2}
                alt="team1 image"
                className="mx-auto z-50 rounded-md"
              />
            </div>
            <div className="bg-gray-100 w-full flex items-end justify-center absolute top-1/2 -z-10 pt-32 rounded-lg">
              <div>
                <h4 className="text-xl font-bold text-center mb-1">
                  Lawrence Pacheco
                </h4>
                <p className="text-gray-500 font-medium text-sm mb-5 text-center">
                  Data Analyst
                </p>

                <div className="mb-5 flex justify-center gap-3 ">
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaFacebookF className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaXTwitter className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaYoutube className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaBehance className="text-primary" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-36 sm:mt-48 lg:mt-0">
            <div>
              <img
                src={team3}
                alt="team1 image"
                className="mx-auto z-50 rounded-md"
              />
            </div>
            <div className="bg-gray-100 w-full flex items-end justify-center absolute top-1/2 -z-10 pt-32 rounded-lg">
              <div>
                <h4 className="text-xl font-bold text-center mb-1">
                  Timothy L. Figueroa
                </h4>
                <p className="text-gray-500 font-medium text-sm mb-5 text-center">
                  Ethical Consultant
                </p>

                <div className="mb-5 flex justify-center gap-3 ">
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaFacebookF className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaXTwitter className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaYoutube className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaBehance className="text-primary" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-36 sm:mt-48 lg:mt-0">
            <div>
              <img
                src={team4}
                alt="team1 image"
                className="mx-auto z-50 rounded-md"
              />
            </div>
            <div className="bg-gray-100 w-full flex items-end justify-center absolute top-1/2 -z-10 pt-32 rounded-lg">
              <div>
                <h4 className="text-xl font-bold text-center mb-1">
                  Michael L. Branch
                </h4>
                <p className="text-gray-500 font-medium text-sm mb-5 text-center">
                  Product Manager
                </p>

                <div className="mb-5 flex justify-center gap-3 ">
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaFacebookF className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaXTwitter className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaYoutube className="text-primary" />
                  </p>
                  <p className="border border-primary inline-block rounded-full p-1.5">
                    <FaBehance className="text-primary" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TeamMembers;
