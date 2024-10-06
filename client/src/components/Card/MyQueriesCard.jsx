import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MyQueriesCard = ({ query, handleQueryDelete }) => {
  const {
    _id,
    image_URL,
    post_time,
    product_name,
    product_brand,
    boycotting_reason_details,
    query_title,
  } = query || {};

  return (
    <div className="w-full max-w-sm px-4 py-3 rounded-md shadow-md hover:scale-[1.05] transition-all border border-secondary/10">
      <img
        src={image_URL}
        alt="card image"
        className="rounded-md mb-1 md:mb-2 md:h-52 w-full object-cover"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-light">
          Post: {new Date(post_time).toLocaleDateString()}
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full font-semibold">
          {product_brand}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-base md:text-lg font-semibold">
          {product_name}
        </h1>

        <p className="mt-2 text-sm text-gray-600 ">
          {boycotting_reason_details.substring(0, 70)}...
        </p>
        <p className="mt-2 text-sm font-semibold md:font-bold text-gray-600 ">
          Danger: {query_title}
        </p>
      </div>
      <div className="mt-3 flex gap-5">
        <Link to={`/query/${_id}`}>
          <button className="text-xs font-medium text-green-600 bg-green-200 px-3 py-1 rounded-full">
            View Details
          </button>
        </Link>
        <Link to={`/my-queries-update/${_id}`}>
          <button className="text-xs font-medium text-blue-600 bg-blue-200 px-3 py-1 rounded-full">
            Update
          </button>
        </Link>
        <button
          onClick={() => handleQueryDelete(_id)}
          className="text-xs font-medium text-red-600 bg-red-200 px-3 py-1 rounded-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

MyQueriesCard.propTypes = {
  query: PropTypes.object.isRequired,
  handleQueryDelete: PropTypes.func.isRequired,
};
export default MyQueriesCard;
