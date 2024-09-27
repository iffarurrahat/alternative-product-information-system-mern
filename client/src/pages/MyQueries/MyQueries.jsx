import axios from "axios";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import useAuth from "../../hooks/useAuth";
import MyQueriesCard from "../../components/Card/MyQueriesCard";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import NoDataFound from "../../components/EmptyState/NoDataFound";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner";

const MyQueries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  //tanStack GET
  const { data: myQueries = [], isLoading } = useQuery({
    queryKey: ["myQueries", user?.email],
    queryFn: () => getData(),
  });

  const getData = async () => {
    const { data } = await axiosSecure(`/queries/${user?.email}`);
    return data;
  };

  //tanStack Mutation for DELETE
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/query/${id}`
      );
      return data;
    },

    onSuccess: () => {
      //refresh ui for latest data
      // refetch();

      //queryClient: Khotin
      queryClient.invalidateQueries({ queryKey: ["myQueries"] });
    },
  });

  //delete query
  const handleQueryDelete = async (id) => {
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
        const data = await mutateAsync({ id });

        if (data && data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>My Queries || API System</title>
      </Helmet>
      {/* <-!-----top content-----> */}
      <EmptyStateMain
        title={"Add Your Queries"}
        pathname={"/ My Queries"}
        btn={"Add Queries"}
        route={"/my-queries-page"}
      />

      {/* <-!-----main content-----> */}
      <Container>
        {myQueries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 sm:my-12 md:my-16 lg:my-20">
            {myQueries.map((query) => (
              <MyQueriesCard
                key={query._id}
                query={query}
                handleQueryDelete={handleQueryDelete}
              />
            ))}
          </div>
        ) : (
          <div className="my-10 sm:my-12 md:my-16 lg:my-20">
            <NoDataFound
              title={"No queries has been added yet."}
              text={
                "Add a new query by simply clicking the Add Queries button on top."
              }
              imgSize={"h-32 sm:h-40 md:h-full"}
              h1Size={"sm:text-lg md:text-xl lg:text-2xl"}
              h4Size={"text-xs md:text-sm"}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default MyQueries;
