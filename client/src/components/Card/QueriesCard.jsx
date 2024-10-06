import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const QueriesCard = ({ query }) => {
  const {
    _id,
    image_URL,
    post_time,
    product_name,
    product_brand,
    boycotting_reason_details,
    query_title,
    recommendation_count,
  } = query || {};

  return (
    <div className="w-full max-w-sm px-4 py-3 rounded-md shadow-md hover:scale-[1.05] transition-all border border-secondary/10">
      <img
        src={image_URL}
        alt="card image"
        className="rounded-md mb-1 md:mb-2 md:h-52 w-full object-cover"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-light flex items-center gap-1">
          <MdDateRange /> {new Date(post_time).toLocaleDateString()}
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full font-semibold">
          {product_brand}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-base md:text-lg font-semibold">
          {product_name}
        </h1>

        <p className="mt-2 text-sm">
          {boycotting_reason_details.substring(0, 70)}...
        </p>
        <p className="my-2 text-sm font-semibold md:font-bold">
          Danger: {query_title}
        </p>
        <p className="text-xs font-semibold">
          Recommendation: {recommendation_count}
        </p>
      </div>
      <Link to={`/query/${_id}`}>
        <button className="text-xs font-medium text-blue-800 bg-blue-200 px-3 py-1 rounded-full mt-3 flex items-center gap-1">
          Recommend <MdOutlineArrowRightAlt size={18} />
        </button>
      </Link>
    </div>
  );
};

QueriesCard.propTypes = {
  query: PropTypes.object.isRequired,
};
export default QueriesCard;
