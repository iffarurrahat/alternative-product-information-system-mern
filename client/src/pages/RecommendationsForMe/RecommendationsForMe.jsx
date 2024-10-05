import { Helmet } from "react-helmet-async";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import Container from "../../components/ui/Container";
import NoDataFound from "../../components/EmptyState/NoDataFound";
import { useEffect, useState } from "react";
import axios from "axios";

const RecommendationsForMe = () => {
  const [allRecommendations, setAllRecommendations] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/recommendation`
      );
      setAllRecommendations(data);
    };
    getData();
  }, []);

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
            <h2 className="text-lg font-medium text-gray-800 ">
              All Recommendations
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
              {allRecommendations.length} comments
            </span>
          </div>

          {allRecommendations.length > 0 ? (
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto scrollbar-thin scrollbar-webkit sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
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
                            <div className="flex items-center gap-x-3">
                              <span>Created Date</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            <span>Query Title</span>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Product Name
                          </th>

                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                            Product Image
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 ">
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
                            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
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
                                <div className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs">
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
      </Container>
    </>
  );
};

export default RecommendationsForMe;
