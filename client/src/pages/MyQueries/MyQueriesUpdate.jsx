import { Helmet } from "react-helmet-async";
import EmptyState from "../../components/EmptyState/EmptyState";
import Container from "../../components/ui/Container";
import img from "../../assets/addEmptyImg.jpg";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../components/ui";

const MyQueriesUpdate = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const query = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    image_URL,
    product_name,
    product_brand,
    boycotting_reason_details,
    query_title,
    post_time,
  } = query || {};

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedQuery) => {
      const toastId = toast.loading("Loading...");
      const { data } = await axiosSecure.put(`/query/${_id}`, updatedQuery);
      toast.dismiss(toastId);
      return data;
    },

    onSuccess: () => {
      toast.success("Query Data Updated Successfully!");
      navigate("/my-queries");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleMyQueriesUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const product_brand = form.product_brand.value;
    // const image_URL = form.image_URL.value;
    const newImage = form.image.files[0];
    const query_title = form.query_title.value;
    const boycotting_reason_details = form.boycotting_reason_details.value;

    let image_url = image_URL; // Set the default to the old image URL

    // If a new image is uploaded, upload it and update image_url
    if (newImage) {
      image_url = await imageUpload(newImage); // Upload new image and get new URL
    }

    const updatedQuery = {
      product_name,
      product_brand,
      image_URL: image_url,
      query_title,
      boycotting_reason_details,
      post_time,
      recommendation_count: 0,
      post: {
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      await mutateAsync(updatedQuery);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Update my queries</title>
      </Helmet>

      <EmptyState title="Update My Queries" image={img} />
      <Container>
        <div className="my-10 sm:my-12 md:my-16 lg:my-20">
          <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md border border-secondary/10">
            <h2 className="text-lg font-semibold capitalize">
              Updated Your queries form 😀
            </h2>

            <form onSubmit={handleMyQueriesUpdate}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                {/* product_name, product_brand */}
                <div>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    defaultValue={product_name}
                    required
                    className="block w-full px-4 py-2 mt-2 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label>Product Brand</label>
                  <input
                    type="text"
                    name="product_brand"
                    defaultValue={product_brand}
                    required
                    className="block w-full px-4 py-2 mt-2 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                {/* Image-URL, query_title */}
                <div>
                  <label>Query Title</label>
                  <input
                    type="text"
                    name="query_title"
                    defaultValue={query_title}
                    required
                    className="block w-full px-4 py-2 mt-2 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="text-sm md:text-base">
                    Product Updated Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="flex items-center px-3 py-1.5 mx-auto border-2 border-dashed rounded-lg cursor-pointer  file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer w-full mt-2"
                  />
                </div>
              </div>
              {/* Boycotting Reason Details */}
              <div className="mt-6">
                <label>Boycotting Reason Details</label>
                <textarea
                  type="text"
                  name="boycotting_reason_details"
                  defaultValue={boycotting_reason_details}
                  required
                  cols="30"
                  rows="5"
                  className="block w-full px-4 py-2 mt-2 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                ></textarea>
              </div>

              <div className=" mt-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Update Query
                </button>
              </div>
            </form>
          </section>
        </div>
      </Container>
    </>
  );
};

export default MyQueriesUpdate;
