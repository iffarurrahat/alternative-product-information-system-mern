import { MdDateRange } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Comments from "../../components/Comments/Comments";
import NoDataFound from "../../components/EmptyState/NoDataFound";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner";
import { imageUpload } from "../../components/ui";

const MyQueriesCardDetails = () => {
  const queryClient = useQueryClient();
  const { user, setLoading } = useAuth();
  const query = useLoaderData();
  const {
    _id,
    image_URL,
    post_time,
    product_name,
    product_brand,
    boycotting_reason_details,
    query_title,
    post,
  } = query || {};

  // useMutation for handling recommendations
  const { mutateAsync } = useMutation({
    mutationFn: async (recommender) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/recommendation`,
        recommender
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Recommendation Successfully!");
      queryClient.invalidateQueries({ queryKey: ["recommendations", _id] });
    },
  });

  const handleRecommendation = async (e) => {
    e.preventDefault();

    if (user?.email === post?.email)
      return toast.error("Action not permitted!");

    const form = e.target;
    const queryId = _id;
    const recommendation_title = form.recommendation_title.value;
    const recommended_product_name = form.recommended_product_name.value;
    // const recommended_product_image = form.recommended_product_image.value;
    const recommendation_reason = form.recommendation_reason.value;
    const recommender_email = user?.email;
    const recommender_name = user?.displayName;
    const recommender_photo = user?.photoURL;
    const recommender_time = new Date();
    const recommended_product_image = form.image.files[0];

    //1. Upload image and get image url
    const image_url = await imageUpload(recommended_product_image);
    console.log("comments:", image_url);

    const recommender = {
      queryId,
      recommendation_title,
      recommended_product_name,
      recommended_product_image: image_url,
      recommendation_reason,
      recommender_email,
      recommender_name,
      recommender_photo,
      recommender_time,
      query_title,
      product_name,
      post,
    };

    try {
      setLoading(true);

      await mutateAsync(recommender);
      form.reset();
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Fetch recommendations for the specific query
  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ["recommendations", _id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/recommendation/${_id}`
      );
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>{query.product_name}</title>
      </Helmet>

      <Container>
        {/* query_details */}
        <div className="mt-16 md:mt-20 py-8 sm:py-10 md:py-12">
          <div className="overflow-hidden bg-white dark:bg-gray-900 lg:mx-8 lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl">
            <div className="lg:w-1/2">
              <div className="h-64 bg-cover lg:h-full">
                <img
                  src={image_URL}
                  alt={product_name}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white ">
                {product_name}
              </h2>
              <div className="flex items-center justify-between mt-3">
                <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full font-semibold">
                  {product_brand}
                </span>
                <span
                  className="text-xs font-light text-white flex items-center gap-1 tooltip"
                  data-tip="Post create date"
                >
                  <MdDateRange /> {new Date(post_time).toLocaleDateString()}
                </span>
              </div>
              <p className="my-4 text-gray-500">{boycotting_reason_details}</p>
              <p className="text-white font-medium text-xs md:text-sm">
                <mark>Side Effect: {query_title}</mark>
              </p>

              {/* user profile */}
              <div className="flex items-center mt-8 -mx-2">
                <img
                  className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-700"
                  src={
                    post?.photo ||
                    "https://i.ibb.co/FHzbGp2/default-profile.png"
                  }
                  alt="photo"
                  referrerPolicy="no-referrer"
                />

                <div className="mx-2">
                  <h1 className="font-semibold text-gray-800 dark:text-white">
                    {post?.name || "unknown"}
                  </h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post?.email || "unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* comment */}
        <div className="mb-10 md:mb-16">
          <div className="space-y-3 w-full md:w-3/4 mx-auto">
            {/* collapse-1 */}
            <div className="collapse collapse-plus bg-base-200/30 shadow p-2 sm:p-3 md:p-4">
              <input type="checkbox" />
              <div className="collapse-title text-xs sm:text-sm  md:text-base font-medium">
                All Recommendations you can see and read,{" "}
                <strong>comments {recommendations.length}</strong>
              </div>
              <div className="collapse-content">
                {recommendations.length > 0 ? (
                  <div className="h-60 lg:h-h-80 place-items-center border p-2 rounded-lg scrollbar-thin scrollbar-webkit overflow-y-scroll overflow-x-hidden space-y-3">
                    {recommendations.map((comment) => (
                      <Comments key={comment._id} comment={comment} />
                    ))}
                  </div>
                ) : (
                  <NoDataFound
                    title={"No comments has been added yet 🙄"}
                    text={
                      "Please fill the form below with your important opinion!"
                    }
                    imgSize={"h-20"}
                    h1Size={"text-sm sm:text-lg md:text-xl"}
                    h4Size={"text-xs sm:text-sm"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* query_details */}
        <section className="max-w-4xl p-4 md:p-6 mx-auto bg-white rounded-md shadow-md mb-5 md:mb-10 lg:mb-16">
          <h2 className="text-base md:text-lg font-semibold text-gray-700 capitalize ">
            Add A Recommendation 😀
          </h2>

          <form onSubmit={handleRecommendation}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {/* recommendation_title, recommended_product_name */}
              <div>
                <label className="text-gray-700 text-sm md:text-base">
                  Recommendation Title
                </label>
                <input
                  type="text"
                  name="recommendation_title"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm md:text-base">
                  Recommended Product Name
                </label>
                <input
                  type="text"
                  name="recommended_product_name"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="image"
                className="text-gray-700 text-sm md:text-base"
              >
                Recommended Product Image
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="flex items-center px-3 py-1.5 mx-auto bg-white border-2 border-dashed rounded-lg cursor-pointer  file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer w-full mt-2"
              />
            </div>

            {/* recommendation_reason */}
            <div className="mt-6">
              <label className="text-gray-700 text-sm md:text-base">
                Recommendation Reason
              </label>
              <textarea
                type="text"
                name="recommendation_reason"
                required
                cols="30"
                rows="5"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              ></textarea>
            </div>

            <div className=" mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 text-sm md:text-base"
              >
                Add Recommendation
              </button>
            </div>
          </form>
        </section>
      </Container>
    </>
  );
};

export default MyQueriesCardDetails;
