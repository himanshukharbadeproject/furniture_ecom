"use client";

import { userData } from "@/app/slice/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/app/config/firebaseConfig";

export default function Reglog() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
  let dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const router = useRouter();

  let userRegister = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target);
    axios
      .post(`${apiBaseUrl}user/register`, formValue)
      .then((res) => res.data)
      .then((finalRes) => console.log(finalRes));
  };

  let userSignIn = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target);
    axios
      .post(`${apiBaseUrl}user/login`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          dispatch(userData({ user: finalRes.user, token: finalRes.token }));
          router.push("/dashboard");
        } else {
          console.log(finalRes.msg);
        }
      });
  };

  let googleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      let insertObj = {
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
      };

      axios
        .post(`${apiBaseUrl}user/create-user-google-login`, insertObj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status) {
            dispatch(userData({ user: finalRes.user, token: finalRes.token }));
            router.push("/dashboard");
          }
        });
    });
};

  return (
    <div className="bg-white w-full h-full pt-[30px]">
      <div className="w-[1320px] bg-white mx-auto">
        <div className="text-black mx-auto mb-[20px] border-b border-black pb-[20px]">
          <h1 className="text-[35px] font-bold text-center">My Account</h1>
          <h3 className="text-[16px] font-medium text-center">
            Home -- My Account
          </h3>
        </div>
        <div className="grid grid-cols-2">
          <div className="w-full text-black">
            <h3 className="text-center text-[25px] font-medium">Login</h3>
            <form
              onSubmit={userSignIn}
              className="m-[20px] border border-black p-[20px]"
            >
              <h3>Email</h3>
              <input
                className="w-[100%] h-[30px] mt-[5px] mb-[15px] border border-black px-[10px] text-[13px]"
                name="loginEmail"
                placeholder="Enter Your Email"
              />
              <h3>Password</h3>
              <input
                className="w-[100%] h-[30px] mt-[5px] mb-[15px] border border-black px-[10px] text-[13px]"
                name="loginPassword"
                placeholder="Enter Your Password"
              />
              <div className="flex justify-between">
                <button className="text-yellow-600 text-[13px]">
                  Lost Your Password
                </button>
                <button className="text-white bg-yellow-600 rounded-[10px] px-[20px] py-[5px] text-[15px] cursor-pointer">
                  Login
                </button>
              </div>
            </form>
            <div className="my-[15px] flex justify-center">
                <button
                  type="button"
                  onClick={googleLogin}
                  className="text-white bg-blue-600 rounded-[10px] px-[20px] py-[5px] text-[15px] cursor-pointer"
                >
                  Sign in With Google
                </button>
              </div>
          </div>
          <div className="w-full">
            <div className="w-full text-black">
              <h3 className="text-center text-[25px] font-medium">Register</h3>
              <form
                onSubmit={userRegister}
                className="m-[20px] border border-black p-[20px]"
              >
                <h3>Name</h3>
                <input
                  className="w-[100%] h-[30px] mt-[5px] mb-[15px] border border-black px-[10px] text-[13px]"
                  name="userName"
                  placeholder="Enter Your Name"
                />
                <h3>Email</h3>
                <input
                  className="w-[100%] h-[30px] mt-[5px] mb-[15px] border border-black px-[10px] text-[13px]"
                  name="userEmail"
                  placeholder="Enter Your Email"
                />
                <h3>Password</h3>
                <input
                  className="w-[100%] h-[30px] mt-[5px] mb-[15px] border border-black px-[10px] text-[13px]"
                  name="userPassword"
                  placeholder="Enter Your Password"
                />
                <h3>Phone</h3>
                <input
                  className="w-[100%] h-[30px] mt-[5px] mb-[15px] border border-black px-[10px] text-[13px]"
                  name="userPhone"
                  placeholder="Enter Your Phone"
                />
                <div className="flex justify-end">
                  <button className="text-white bg-yellow-600 rounded-[10px] px-[20px] py-[5px] text-[15px] cursor-pointer">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
