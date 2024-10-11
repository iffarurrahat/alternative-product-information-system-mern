import { Helmet } from "react-helmet-async";
import FAQ from "../../components/FAQ/FAQ";
import Banner from "../../components/Banner/Banner";
import Testimonial from "../../components/Testimonial/Testimonial";
import HelpSection from "../../components/HelpSection/HelpSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import ServicesInfo from "../../components/ServicesInfo/ServicesInfo";
import RecentQueries from "../../components/RecentQueries/RecentQueries";
import TeamMembers from "../../components/TeamMembers/TeamMembers";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Alternative Product Information System</title>
      </Helmet>
      <div>
        <Banner />
        <RecentQueries />
        <HelpSection />
        <AboutSection />
        <ServicesInfo />
        <FAQ />
        <TeamMembers />
        <Testimonial />
      </div>
    </>
  );
};

export default Home;
