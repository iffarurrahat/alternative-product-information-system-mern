import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import QueriesCard from "../../components/Card/QueriesCard";
import NoDataFound from "../../components/EmptyState/NoDataFound";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import { GrPowerReset } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";

const Queries = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [allQueries, setAllQueries] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/all-queries?page=${currentPage}&size=${itemsPerPage}&sort=${sort}&search=${search}`
      );
      setAllQueries(data);
    };
    getData();
  }, [currentPage, itemsPerPage, sort, search]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/queries-count?search=${search}`
      );
      setCount(data.count);
    };
    getData();
  }, [search]);

  const numberOfPage = Math.ceil(count / itemsPerPage);

  // Generate the pagination range with ellipsis
  const getPaginationRange = () => {
    const range = [];
    const totalPagesToShow = 3;

    if (numberOfPage <= totalPagesToShow) {
      // If total pages are less than or equal to the pages to show, just show all pages
      for (let i = 1; i <= numberOfPage; i++) {
        range.push(i);
      }
    } else {
      let startPage = Math.max(
        1,
        currentPage - Math.floor(totalPagesToShow / 2)
      );
      let endPage = startPage + totalPagesToShow - 1;

      if (endPage > numberOfPage) {
        endPage = numberOfPage;
        startPage = Math.max(1, endPage - totalPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      if (endPage < numberOfPage) {
        range.push("...");
        range.push(numberOfPage);
      }
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  //handle pagination button
  const handlePaginationButton = (value) => {
    if (value === "...") return; // Ignore ellipsis clicks
    setCurrentPage(value);
  };

  const handleReset = () => {
    setSort("");
    setSearch("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <>
      <Helmet>
        <title>Queries || API System</title>
      </Helmet>
      {/* <-!-----top content-----> */}
      <EmptyStateMain
        title={"All Queries Area Here!!"}
        pathname={"/ Queries"}
      />

      {/* <-!-----main content-----> */}
      <Container>
        <div className="container md:px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <form onSubmit={handleSearch} className="w-full md:w-2/5">
                <div className="flex p-0.5 md:p-1 border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 w-full">
                  <input
                    className="px-3 py-1.5 md:py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent w-full"
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    name="search"
                    placeholder="Enter Job Title"
                    aria-label="Enter Job Title"
                  />

                  <button className="px-2.5 md:px-4 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-primary focus:outline-none flex items-center gap-1">
                    Search
                    <IoSearch />
                  </button>
                </div>
              </form>
              <div className="flex items-center gap-3 md:gap-5 w-full md:w-2/5">
                <select
                  onChange={(e) => {
                    setSort(e.target.value);
                    setCurrentPage(1);
                  }}
                  value={sort}
                  name="sort"
                  id="sort"
                  className="border px-2 py-2 md:py-3 rounded-md w-full"
                >
                  <option value="">Sort By Deadline</option>
                  <option value="dsc">Descending Order</option>
                  <option value="asc">Ascending Order</option>
                </select>
                <div>
                  <button
                    onClick={handleReset}
                    className="bg-gray-700 rounded-md hover:bg-gray-600 text-white px-8 py-2 md:py-3 flex items-center gap-1"
                  >
                    Reset
                    <GrPowerReset />
                  </button>
                </div>
              </div>
            </div>

            {allQueries.length === 0 ? (
              <div className="my-5 md:my-10 lg:my-16">
                <NoDataFound
                  title={"No search has been found."}
                  text={"Please try something else"}
                  imgSize={"h-32 sm:h-40 md:h-full"}
                  h1Size={"sm:text-lg md:text-xl lg:text-2xl"}
                  h4Size={"text-xs md:text-sm"}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
                {allQueries.map((query) => (
                  <QueriesCard key={query._id} query={query} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination Section */}
          <div className="flex justify-center mt-12 px-3">
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePaginationButton(currentPage - 1)}
              className="px-2 sm:px-4 py-1 sm:py-2 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-primary  hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 md:w-6 h-4 md:h-6 mx-1 rtl:-scale-x-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span className="text-xs sm:text-base">previous</span>
              </div>
            </button>

            {/* Numbers */}
            {paginationRange.map((btnNum) => (
              <button
                onClick={() => handlePaginationButton(btnNum)}
                key={btnNum}
                className={`${
                  currentPage === btnNum ? "bg-primary text-white" : ""
                } px-2 sm:px-4 py-1 sm:py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-primary hover:text-white text-sm sm:text-base`}
              >
                {btnNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              disabled={currentPage === numberOfPage}
              onClick={() => handlePaginationButton(currentPage + 1)}
              className="px-2 sm:px-4 py-1 sm:py-2 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-primary disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <div className="flex items-center">
                <span className="text-xs sm:text-base">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 md:w-6 h-4 md:h-6 mx-1 rtl:-scale-x-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Queries;
