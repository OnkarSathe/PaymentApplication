import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import { BottomWarning } from "../components/ButtomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let username = data.username;
    let password = data.password;
    // Add your logic to send data to the backend here
    try{
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          firstName,
          lastName,
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }catch(error){
      if (error.response && error.response.status === 411) {
        setErrorMessage("Email is already taken. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
        console.error("Error occurred while signing in:", error);
      }
    }
    
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox
              placeholder="Onkar"
              label={"First Name"}
              {...register("firstName", {
                required: "First Name is required.",
              })}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
            <InputBox
              placeholder="Sathe"
              label={"Last Name"}
              {...register("lastName", {
                required: "Last Name is required.",
              })}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
            <InputBox
              placeholder="onkar@gmail.com"
              label={"Email"}
              {...register("username", {
                required: "Email is required.",
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <InputBox
              placeholder="123456"
              label={"Password"}
              type="password"
              {...register("password", {
                required: "Password is required.",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="pt-4">
              <Button label={"Sign up"} />
            </div>
          </form>
          <div className="text-red-500">{errorMessage}</div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
