import { Helmet } from "react-helmet-async";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import Container from "../../components/ui/Container";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import NoDataFound from "../../components/EmptyState/NoDataFound";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MyRecommendations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  //tanStack GET
  const { data: myRecommendations = [] } = useQuery({
    queryKey: ["myRecommendations"],
    queryFn: () => getData(),
  });

  //Fetch recommendations for the specific user
  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/recommender/${user?.email}`
    );
    return data;
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/recommendation/${id}`
      );
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRecommendations"] });
    },
  });

  //handle delete
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const data = await mutateAsync(id);

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted Successful!",
            text: "Your recommendation has been deleted.",
            icon: "success",
          });
        }

        //refresh ui
        getData();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Recommendations</title>
      </Helmet>

      <EmptyStateMain
        title="My all recommendations"
        pathname="/ My Recommendations"
      />

      {/* main content */}
      <Container>
        <section className="container px-4 mx-auto pt-12 my-10">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium">My Recommendations</h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
              {myRecommendations.length} comments
            </span>
          </div>

          {myRecommendations.length > 0 ? (
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto scrollbar-thin scrollbar-webkit sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-secondary/10  md:rounded-lg">
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
                              <span>Title</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Email</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            <span>Created Date</span>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                          >
                            Category
                          </th>

                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary/10">
                        {myRecommendations.map((item) => (
                          <tr key={item._id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <img
                                src={item?.recommended_product_image}
                                alt="image"
                                className="h-16 w-20 border rounded"
                              />
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <p
                                className="tooltip"
                                data-tip={item.recommended_product_name}
                              >
                                {item?.recommended_product_name.substring(
                                  0,
                                  20
                                )}
                                ...
                              </p>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                              {item?.recommender_email}
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(
                                item.recommender_time
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <div className="px-3 py-1 rounded-full text-blue-500 bg-blue-100 text-xs">
                                  <p
                                    className="tooltip"
                                    data-tip={item.recommendation_title}
                                  >
                                    {item.recommendation_title.substring(0, 20)}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap ml-3">
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
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

      {/* Extra  */}
      <div className="p-32">
        <img
          src={
            user.photoURL
              ? user.photoURL
              : "https://i.ibb.co.com/FHzbGp2/default-profile.png"
          }
          alt=""
        />
        <br />
        <h2 className="text-3xl">
          {user.displayName ? user.displayName : "displayName none"}
        </h2>
        <h2 className="text-xl">{user.email ? user.email : "email none"} </h2>
      </div>
    </>
  );
};

export default MyRecommendations;
