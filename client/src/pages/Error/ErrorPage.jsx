import { Link, useNavigate, useRouteError } from "react-router-dom";
import Container from "../../pages/Error/ErrorPage";
const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen ">
        <div className="text-center md:text-start">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black">
            Error {error.status}
          </h1>
          <h3 className="my-2 sm:my-4 text-lg">That Page Does not Exist 🙄</h3>
          <p className="w-full lg:w-2/3 mx-auto md:mx-0">
            Looks like you have reached a broken link. No worries, head back to
            the homepage or try a search!
          </p>
          <div className="flex gap-2 mt-3 justify-center md:justify-start">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Go Back
            </button>
            <Link to="/">
              <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Go Home
              </button>
            </Link>
          </div>
        </div>
        <img
          src="https://i.ibb.co/V9q3Wvk/404-iamge.png"
          alt="error image"
          className="w-60 sm:w-72 md:w-96 lg:w-[450px] mb-4 md:mb-0"
        />
      </div>
    </Container>
  );
};

export default ErrorPage;
