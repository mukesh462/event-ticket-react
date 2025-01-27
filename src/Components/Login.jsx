import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Logo from "../assets/logo-event.png";
import toast from "react-hot-toast";
import useApi from "./useApi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { request,loading} = useApi();
  const [formValues, setFormValues] = useState({
    email:"",
    password:""
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const [errors, setErrors] = useState({});


  const handleValidation = async () => {
    try {
      await validationSchema.validateSync(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      console.log(errors);
      setErrors(errors);
      return false;
    }
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (handleValidation()) {
        try {
            const postUrl = "login";
            const response = await request("post", postUrl, formValues, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status) {
              navigate("/admin");
              localStorage.setItem('userData',JSON.stringify(response.data))
              toast.success(response.message);
            
            } else {
              toast.error(response.message);
            }
          } catch (error) {
            console.log(error)
            toast.error("An error occurred while logging in.");
          }
        }
    
  }
  const handleChange = (e) => {
    console.log(e.target.name,'ddfdf')
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#FFE4D6] px-4 py-12 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="space-y-1 flex justify-center items-center my-2 mb-3">
              <img
                src={Logo}
                alt="Parambodil Foundation"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#31ABEB]"
                    } focus:outline-none`}
                    id="email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  {/* <FaLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /> */}
                  <input
                    className={`w-full pl-10 pr-10 py-2 rounded-md border ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#31ABEB]"
                    } focus:outline-none`}
                    id="password"
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                    type="button"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F85C2C]  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
