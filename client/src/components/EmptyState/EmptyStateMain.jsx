import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import addImg from "../../assets/addEmptyImg.jpg";
import { IoMdAddCircleOutline } from "react-icons/io";

const EmptyStateMain = ({ title, pathname, btn, route }) => {
  return (
    <div className="relative">
      <img
        src={addImg}
        className="bg-no-repeat object-cover w-full h-72 md:h-80 lg:h-96 brightness-50"
        alt=""
      />
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      <div className="max-w-screen-xl mx-auto text-center flex justify-center">
        <div className="absolute top-[40%] sm:top-1/3 md:top-1/2">
          <h2 className="text-2xl md:text-4x text-white font-bold text-center">
            {title}
          </h2>
          {route ? (
            <Link to={`${route}`}>
              <button className="bg-primary text-white px-3 py-2 rounded mt-2 text-xs flex items-center gap-1 mx-auto">
                {btn}
                <IoMdAddCircleOutline />
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="flex justify-center text-center mx-auto">
          <p className="absolute bottom-0 bg-primary text-white py-2 sm:py-2.5 md:py-3 px-2 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base">
            <Link to="/">Home</Link> <span>{pathname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

EmptyStateMain.propTypes = {
  title: PropTypes.string.isRequired,
  // image: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  btn: PropTypes.string,
  route: PropTypes.string,
};

export default EmptyStateMain;
