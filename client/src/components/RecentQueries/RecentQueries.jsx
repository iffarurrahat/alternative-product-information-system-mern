import { useEffect, useState } from "react";
import QueriesCard from "../Card/QueriesCard";
import Container from "../ui/Container";
import "./RecentQueries.css";
import axios from "axios";

const RecentQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries`);
      setQueries(data);
    };
    getData();
  }, []);

  return (
    <div>
      <Container>
        {/* design part top */}
        <div className="flex justify-between items-center mt-8 sm:mt-10 md:mt-16 lg:mt-20 font-roboto">
          <h2
            className="heading-decoration ml-4 sm:ml-8 md:ml-16 lg:ml-36"
            data-aos="fade-right"
          >
            <span className="heading-inner text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Recent Queries
            </span>
          </h2>
          <p
            className="flex align-middle gap-3 text-xs font-semibold text-[#9a9a9a]"
            data-aos="fade-left"
          >
            <span className="border-r-2 pr-3">For Knowledge</span>
            <span>Hub</span>
          </p>
        </div>

        {/* main part */}
        <div className="grid grid-cols-1 gap-8 mt-5 md:mt-8 lg:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {queries.map((query) => (
            <QueriesCard key={query._id} query={query} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecentQueries;
