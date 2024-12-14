import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../utils/axios.instance";

interface RegisterValues {
  fullName: string;
  username: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik<RegisterValues>({
    initialValues: {
      fullName: "",
      username: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await api.post("/auth/register", values);
        if (response.data.success) {
          navigate("/login");
        }
      } catch (error: any) {
        setStatus(error.response?.data?.message || "An error occurred");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-700"
        style={{
          backgroundImage: `url('/register-bg.jpg')`,
          backgroundBlendMode: "soft-light",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      />

      <div className="max-w-md w-full mx-4 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl relative z-10 transform transition-all duration-500 hover:scale-[1.02]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-300">Join us today and start your journey</p>
        </div>

        {formik.status && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100 animate-fadeIn">
            {formik.status}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="transform transition-all duration-300 hover:translate-x-1">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              {...formik.getFieldProps("fullName")}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your full name"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="mt-1 text-sm text-red-400 animate-slideIn">
                {formik.errors.fullName}
              </div>
            )}
          </div>

          <div className="transform transition-all duration-300 hover:translate-x-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              {...formik.getFieldProps("username")}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Choose a username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="mt-1 text-sm text-red-400 animate-slideIn">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className="transform transition-all duration-300 hover:translate-x-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Create a password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="mt-1 text-sm text-red-400 animate-slideIn">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
