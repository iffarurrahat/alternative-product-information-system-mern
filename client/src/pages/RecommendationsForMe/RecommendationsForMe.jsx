import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import Container from "../../components/ui/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import NoDataFound from "../../components/EmptyState/NoDataFound";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";

const RecommendationsForMe = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const axiosPublic = useAxiosPublic();
  const [allRecommendations, setAllRecommendations] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosPublic(
        `/recommendation?page=${currentPage}&size=${itemsPerPage}`
      );
      setAllRecommendations(data);
    };
    getData();
  }, [axiosPublic, currentPage, itemsPerPage]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosPublic("/recommendation-count");
      setCount(data.count);
    };
    getCount();
  }, [axiosPublic]);

  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()].map((element) => element + 1);

  //handle pagination button
  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Recommendations For Me</title>
      </Helmet>
      <EmptyStateMain
        title="Recommendations For Me"
        pathname="/ Recommendations For Me"
      />

      {/* main content */}
      <Container>
        <section className="container px-4 mx-auto pt-12 my-10">
          <div className="flex items-center gap-x-3">
            <h2 className="sm:text-lg font-medium whitespace-nowrap">
              All Recommendations
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full flex items-center gap-1 whitespace-nowrap">
              {allRecommendations.length} comments
              <FaRegCommentDots size={10} />
            </span>
          </div>

          {allRecommendations.length > 0 ? (
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto scrollbar-thin scrollbar-webkit sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-secondary/10 md:rounded-lg">
                    <table className="min-w-full divide-y divide-secondary/10">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Name</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            <div className="flex items-center gap-x-3 whitespace-nowrap">
                              <span>Created Date</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 whitespace-nowrap"
                          >
                            <span>Query Title</span>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 whitespace-nowrap"
                          >
                            Product Name
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 whitespace-nowrap">
                            Product Image
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary/10 ">
                        {allRecommendations.map((item) => (
                          <tr key={item._id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <img
                                src={item?.recommender_photo}
                                alt="image"
                                className="h-16 w-20 border rounded object-cover"
                              />
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <p>{item?.recommender_name}</p>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(
                                item.recommender_time
                              ).toLocaleDateString()}
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <p
                                className="tooltip"
                                data-tip={item.recommended_product_name}
                              >
                                {item?.recommendation_title.substring(0, 20)}
                                ...
                              </p>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <div className="px-3 py-1 rounded-full text-blue-600 bg-blue-100 text-xs">
                                  <p
                                    className="tooltip"
                                    data-tip={item.recommended_product_name}
                                  >
                                    {item.recommended_product_name.substring(
                                      0,
                                      20
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <img
                                src={item?.recommended_product_image}
                                alt="image"
                                className="h-16 w-20 border rounded object-cover"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 md:mt-10">
              <NoDataFound
                title={"No comments found here 🤨"}
                text={
                  "To give your valuable comments go to the queries option and know the recommend button"
                }
                imgSize={"h-32 sm:h-40 md:h-full"}
                h1Size={"sm:text-lg md:text-xl lg:text-2xl"}
                h4Size={"text-xs md:text-sm"}
              />
            </div>
          )}
        </section>

        {/* Pagination Section */}
        <div className="flex justify-center my-12 px-3">
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
          {pages.map((btnNum) => (
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
      </Container>
    </>
  );
};

export default RecommendationsForMe;
