import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiErrorWarningFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Spinner from "../../components/ui/Spinner";
import { imageUpload } from "../../components/ui";

const Register = () => {
  const { createUser, updatedUserProfile, user, setUser, loading, setLoading } =
    useAuth();
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //when user login navigate the path
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  //when user login con't go register page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    // console.log(name, email, password);
    // console.log(image_url);

    // verify some authentication
    if (password.length < 6) {
      return setRegisterError("Minimum 6 characters for password");
    } else if (!/[A-Z]/.test(password)) {
      return setRegisterError("Include at least one uppercase character");
    } else if (!/[a-z]/.test(password)) {
      return setRegisterError("Include at least one lowercase character");
    }
    // reset error
    setRegisterError("");

    try {
      setLoading(true);

      //1. Upload image and get image url
      const image_url = await imageUpload(image);
      // console.log("image_url:", image_url);

      //2. User Registration
      const result = await createUser(email, password);
      // console.log(result);

      //3. Save username and photo in firebase
      await updatedUserProfile(name, image_url);

      // //Optimistic UI Update
      setUser({ ...result?.user, photoURL: image_url, displayName: name });

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );

      const loggedUser = result.user;
      if (loggedUser) {
        toast.success("Successfully Create Account");

        // navigate user
        navigate(from, { replace: true });
      }
      form.reset();
    } catch (error) {
      setLoading(false);
      const errMessage = error.message;
      if (errMessage === "Firebase: Error (auth/email-already-in-use).") {
        setRegisterError("Already have an account please login");
      } else if (
        errMessage === "Firebase: Error (auth/network-request-failed)."
      ) {
        setRegisterError("Please connect your internet");
      } else {
        toast.error("Something is wrong try later");
      }
    }
  };

  if (user || loading) <Spinner />;

  return (
    <Container>
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign up</h1>
            <p className="text-sm dark:text-gray-600">
              Sign up for free to access exclusive features
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 "
                />
              </div>
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
                <div className="flex justify-between">
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
                  className="absolute inset-y-0 right-0 top-5 flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>

              <div>
                <label htmlFor="image" className="block mb-1 text-sm">
                  Upload Image
                </label>
                <input
                  required
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="flex items-center px-3 py-1.5 mx-auto bg-white border-2 border-dashed rounded-lg cursor-pointer  file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer w-full"
                />
              </div>
            </div>
            <div className="mt-5">
              <input
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50 cursor-pointer"
                value="Sign up"
              />
            </div>
            {registerError && (
              <p className="text-red-600 text-xs flex items-center gap-1">
                <RiErrorWarningFill />
                {registerError}
              </p>
            )}
          </form>
          <p className="text-xs text-center sm:px-6 dark:text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="underline dark:text-gray-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;
