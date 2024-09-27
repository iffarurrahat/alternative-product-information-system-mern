import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiErrorWarningFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import Spinner from "../../components/ui/Spinner";

const Login = () => {
  const {
    userLogin,
    loginWithGoogle,
    loginWithGithub,
    loginWithTwitter,
    user,
    loading,
    setLoading,
  } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //when user login navigate the path
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  //when user login con't go login page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    //reset error
    setLoginError("");

    try {
      const result = await userLogin(email, password);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );

      toast.success("Login Successfully");

      // navigate user
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      const errMessage = error.message;

      if (errMessage === "Firebase: Error (auth/invalid-credential).") {
        setLoginError("Email or Password might be wrong");
      } else if (
        errMessage === "Firebase: Error (auth/network-request-failed)."
      ) {
        setLoginError("Please connect your internet");
      } else {
        setLoginError(error.message);
      }
    }
  };

  //signIn with google
  const handleLoginWithGoogle = async () => {
    //reset error
    setLoginError("");

    try {
      const result = await loginWithGoogle();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );

      toast.success("Login Successfully");
      //navigate user
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      const errMessage = error.message;
      if (errMessage === "Firebase: Error (auth/popup-closed-by-user).") {
        setLoginError("Sign in cancelled. Please try again.");
      } else if (errMessage === "Firebase: Error (auth/internal-error).") {
        setLoginError("Please connect your internet");
      } else if (
        errMessage ===
        "Firebase: IdP denied access. This usually happens when user refuses to grant permission. (auth/user-cancelled)."
      ) {
        setLoginError("Permission denied, Grant access to signin");
      } else {
        setLoginError(errMessage);
      }
    }
  };

  //signIn with github
  const handleLoginWithGithub = async () => {
    //reset error
    setLoginError("");

    try {
      const result = await loginWithGithub();

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );

      toast.success("Login Successfully");
      //navigate user
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      const errMessage = error.message;
      if (errMessage === "Firebase: Error (auth/popup-closed-by-user).") {
        setLoginError("Sign in cancelled. Please try again.");
      } else if (errMessage === "Firebase: Error (auth/internal-error).") {
        setLoginError("Please connect your internet");
      } else if (
        errMessage ===
        "Firebase: IdP denied access. This usually happens when user refuses to grant permission. (auth/user-cancelled)."
      ) {
        setLoginError("Permission denied, Grant access to signin");
      } else {
        setLoginError(errMessage);
      }
    }
  };

  //signIn with twitter
  const handleLoginWithTwitter = async () => {
    //reset error
    setLoginError("");

    try {
      const result = await loginWithTwitter();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );

      toast.success("Login Successfully");
      //navigate user
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      const errMessage = error.message;

      if (errMessage === "Firebase: Error (auth/popup-closed-by-user).") {
        setLoginError("Sign in cancelled. Please try again.");
      } else if (errMessage === "Firebase: Error (auth/internal-error).") {
        setLoginError("Please connect your internet");
      } else if (
        errMessage ===
        "Firebase: IdP denied access. This usually happens when user refuses to grant permission. (auth/user-cancelled)."
      ) {
        setLoginError("Permission denied, Grant access to signin");
      } else {
        setLoginError(errMessage);
      }
    }
  };

  if (user || loading) <Spinner />;

  return (
    <Container>
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm dark:text-gray-600">
              Sign in to access your account
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
              </div>
              <div className="relative">
                <div className="flex justify-between ">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0  flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
                <a className="text-xs hover:underline dark:text-gray-600">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-5">
              <input
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50 cursor-pointer"
                value="Sign in"
              />
            </div>
            {loginError && (
              <p className="text-red-600 mt-1 text-sm flex items-center gap-1">
                <RiErrorWarningFill />
                {loginError}
              </p>
            )}
          </form>

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            <p className="px-3 text-sm dark:text-gray-600">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button aria-label="Log in with Google" className="p-3 rounded-sm">
              <FaGoogle onClick={handleLoginWithGoogle} className="text-xl" />
            </button>
            <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
              <FaXTwitter
                onClick={handleLoginWithTwitter}
                className="text-xl"
              />
            </button>
            <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
              <FaGithub onClick={handleLoginWithGithub} className="text-xl" />
            </button>
          </div>
          <p className="text-xs text-center sm:px-6 dark:text-gray-600">
            Do not have an account?{" "}
            <Link to="/register" className="underline dark:text-gray-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
