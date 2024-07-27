import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Button from "../components/ui/Button";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";

interface IFormInput {
  password: string;
  username: string;
  email: string;
}
const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  //   console.log("errors: ", errors);

  //** Handler */
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("data: ", data);
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("Account created successfully!", {
          position: "bottom-center",
          duration: 1500,
          style: {
            background: "black",
            color: "white",
            width: "fit-content",
          },
        });
        setTimeout(() => {
          toast.loading(
            "You will be redirected to the login page after 2 seconds",
            {
              position: "bottom-center",
              duration: 2000,
              style: {
                background: "black",
                color: "white",
                width: "fit-content",
              },
            }
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }, 2000);
      }
    } catch (error) {
      const errorOpj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorOpj.response?.data?.error?.message}`, {
        position: "bottom-center",
        duration: 1500,
        style: {
          background: "black",
          color: "white",
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  //** Render */
  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, type, placeholder, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Register to get access!
        </h5>
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>
      </form>
      <div className="w-fit my-2 ml-3 flex items-center gap-1">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          have an account?
        </p>
        <Link
          to={"/login"}
          className="text-sm  text-blue-600 hover:underline dark:text-blue-500"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
