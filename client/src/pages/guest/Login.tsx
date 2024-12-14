import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAtom } from "jotai";
import { userAtom } from "../../store/authStore";
import createApiInstance from "../../utils/axios.instance";

interface LoginValues {
  username: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const [_, setUser] = useAtom(userAtom);

  const api = createApiInstance({});

  const formik = useFormik<LoginValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await api.post("/auth/login", values);
        const { data } = response;
        setUser(data);
        navigate("/transactions");
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
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('/login-bg.jpg')`,
          backgroundBlendMode: "soft-light",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      />

      <div className="max-w-md w-full mx-4 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">
            Enter your credentials to access your account
          </p>
        </div>

        {formik.status && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
            {formik.status}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
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
              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="mt-1 text-sm text-red-400">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div>
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
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="mt-1 text-sm text-red-400">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                {...formik.getFieldProps("remember")}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link to="#" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    
  );
  
};

export default Login;
