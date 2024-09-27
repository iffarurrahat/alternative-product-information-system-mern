import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-[1250px] px-3 sm:px-4 md:px-5 lg:px-[25px] mx-auto ${className} `}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Container;
