import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import RecentQueries from "../../components/RecentQueries/RecentQueries";
import FAQ from "../../components/FAQ/FAQ";
import Testimonial from "../../components/Testimonial/Testimonial";
import HelpSection from "../../components/HelpSection/HelpSection";
import AboutSection from "../../components/AboutSection/AboutSection";

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
        <FAQ />
        <Testimonial />
      </div>
    </>
  );
};

export default Home;
