import React from "react";
import {
  BajuLottie,
  DressLottie,
  HangerLottie,
  JaketLottie,
  LoginLottie,
} from "../components";

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-base-200  overflow-hidden">
      <div className="flex w-full  bg-blue-500  justify-center min-h-screen flex-col lg:flex-row-reverse">
        <div className="text-center  items-center hidden xl:flex  w-1/2 lg:text-left z-20 relative">
          <div className="absolute -left-20">
            <LoginLottie />
          </div>
          <div className="flex flex-col gap-5    items-end absolute right-20 top-20">
            <h1 className="text-5xl text-black transition-all duration-700 2xl:text-white font-bold tracking-widest">
              LaundryApp
            </h1>
            <h3 className="text-xl text-black transition-all duration-700 2xl:text-white font-semibold">
              Fast + Clean
            </h3>
          </div>
          <div className="flex absolute right-0 bottom-72">
            <HangerLottie />
            <DressLottie />
          </div>
          <div className="absolute flex flex-col right-20 top-52 rotate-12">
            <div className="flex">
              <JaketLottie />
              <BajuLottie />
            </div>
          </div>
        </div>
        <div className=" flex flex-col w-full px-4 gap-10 xl:w-1/2 bg-blue-500  xl:bg-slate-200 relative">
          <div className="w-[170vh] min-h-[170vh] bg-slate-200 hidden xl:flex absolute -top-20 -left-20 rounded-full z-10"></div>
          <div className="flex flex-col gap-5 justify-center min-h-screen w-full max-w-3xl mx-auto z-20">
            <div className="flex flex-col">
              <h1 className="text-2xl xl:text-4xl flex">
                <span className="font-bold text-blue-600">Laundry</span>
                <span className="font-light text-blue-600">App</span>
              </h1>
            </div>

            <h3 className="text-blue-600 font-bold text-lg tracking-wider">
              Login to your account
            </h3>
            <form className="max-w-xl w-full flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Masukkan username"
                    className="py-4 border-2 bg-transparent  border-b-black/40  outline-none focus:text-blue-600 focus:font-bold focus:border-b-blue-600"
                    required
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Masukkan username"
                    className="py-4 border-2 bg-transparent  border-b-black/40 outline-none focus:text-blue-600 focus:font-bold focus:border-b-blue-600"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex justify-normal gap-3">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text text-blue-600 font-bold text-sm">
                    Remember me
                  </span>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white hover:bg-gradient-to-l hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 hover:transition-all hover:duration-1000 font-bold uppercase border-none outline-none text-lg">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
