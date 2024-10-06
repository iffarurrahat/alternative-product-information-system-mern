import PropTypes from "prop-types";
import { MdDateRange } from "react-icons/md";

const Comments = ({ comment }) => {
  const {
    recommender_name,
    recommender_email,
    recommender_photo,
    recommendation_title,
    recommender_time,
    recommended_product_name,
    recommended_product_image,
    recommendation_reason,
  } = comment || {};

  return (
    <div className="shadow-sm rounded">
      {/* part one */}
      <div className="flex justify-between items-center bg-slate-100 rounded-t-md p-3">
        <div className="flex items-center text-sm text-gray-600 transition-colors duration-300 transform">
          <img
            className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
            src={recommender_photo}
            alt={recommender_name}
            referrerPolicy="no-referrer"
          />
          <div className="mx-1">
            <h1 className="text-xs font-semibold text-gray-700">
              {recommender_name}
            </h1>
            <p className="text-xs text-gray-500">{recommender_email}</p>
          </div>
        </div>
        <p
          className="text-xs font-semibold text-gray-700 flex items-center gap-1 tooltip tooltip-left"
          data-tip="Comment create date"
        >
          <MdDateRange /> {new Date(recommender_time).toLocaleDateString()}
        </p>
      </div>

      {/* part two */}
      <div className="bg-slate-50 p-3 rounded-b-md">
        <div className="lg:flex lg:items-center">
          <img
            className="object-cover w-full md:w-1/5 h-40 md:h-full rounded-xl "
            src={recommended_product_image}
            alt={recommended_product_name}
          />

          <div className="mt-3 lg:w-3/4 lg:mt-0 lg:mx-6 ">
            <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full font-semibold">
              {recommendation_title}
            </span>

            <p className="text-sm md:text-base text-black font-semibold my-1">
              {recommended_product_name}
            </p>

            <p className="text-xs md:text-sm text-gray-500">
              {recommendation_reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default Comments;
