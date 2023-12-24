"use client";
// import styles from '@/SignUpForm.module.css';
import "../styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const schema = yup.object().shape({
  name: yup.string().required("Name Is Required"),
  email: yup.string().email().required("Email is Required"),
  password: yup.string().min(6, "Password Must be atleast 6 charachters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Phone Numbber is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip Code is required"),
});

const CustomToastContainer = (error:any) => {
  toast.error(error.message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000, // Close the toast after 3 seconds
  });
};

const handleYupError = (yupErrors:any) => {
  Object.values(yupErrors).forEach((err) => {
    CustomToastContainer(err); // Display each error using Toastify
  });
};

export default function Home() {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

const notify = () => toast("Form Submit Successfully")


  const onSubmit = (data: any) => {
    console.log({ data });
    notify()
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit,handleYupError)} className="mt-[70px] text-black">
        <input
          {...register("name")}
          className="text-black"
          type="name"
          placeholder="Name"
          name="name"
          required
        />
        <p>{errors?.name?.message}</p>
        <input {...register("email")} required type="email" placeholder="Email" name="email" />
        <p>{errors?.email?.message}</p>

        <input {...register("password")} required type="password" placeholder="Password" name="password" />
        <p>{errors?.password?.message}</p>

        <input
        {...register("confirmPassword")}
        required
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
        />
        <p>{errors?.confirmPassword?.message}</p>


        <input {...register("phoneNumber")} required type="text" placeholder="Phone Number" name="phoneNumber" />
        <p>{errors?.phoneNumber?.message}</p>

        <input {...register("addressLine1")} required type="text" placeholder="Address Line 1" name="addressLine1" />
        <p>{errors?.addressLine1?.message}</p>

        <input {...register("addressLine2")} required type="text" placeholder="Address Line 2" name="addressLine2" />
        <p>{errors?.addressLine2?.message}</p>

        <input {...register("city")} required type="text" placeholder="City" name="city" />
        <p>{errors?.city?.message}</p>

        <input {...register("state")} required type="text" placeholder="State" name="state" />
        <p>{errors?.state?.message}</p>

        <input {...register("zipCode")} required type="text" placeholder="Zip Code" name="zipCode" />
        <p>{errors?.zipCode?.message}</p>

        <button type="submit">
          Submit
        </button>
        <ToastContainer />
      </form>
    </>
  );
}
