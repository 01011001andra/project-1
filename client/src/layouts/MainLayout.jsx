import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdPersonSearch } from "react-icons/md";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  const showMainLayout = ["/dashboard"];

  if (showMainLayout.includes(pathname)) {
    return (
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {children}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-0 w-80 min-h-full flex flex-col gap-12 bg-[#dcdefa]/30 py-20 text-base-content">
            <div className="avatar mx-auto flex flex-col gap-5 items-center justify-center ">
              <div className="w-24 mask mask-squircle">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <h3 className="font-bold text-base">Halo Admin!</h3>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                className={`py-4 flex gap-3 items-center  text-blue-600 px-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-100  font-bold`}
              >
                <MdPersonSearch size={30} /> CARI PELANGGAN
              </Link>
              <Link
                className={`py-4 flex gap-3 items-center  text-slate-500 px-6  font-light hover:text-blue-600 hover:font-bold transition-all duration-500`}
              >
                <MdPersonSearch size={30} /> DAFTAR PELANGGAN
              </Link>
              <Link
                className={`py-4 flex gap-3 items-center  text-slate-500 px-6  font-light hover:text-blue-600 hover:font-bold transition-all duration-500`}
              >
                <MdPersonSearch size={30} /> DISKON
              </Link>
              <Link
                className={`py-4 flex gap-3 items-center  text-slate-500 px-6  font-light hover:text-blue-600 hover:font-bold transition-all duration-500`}
              >
                <MdPersonSearch size={30} /> HASIL PENJUALAN
              </Link>
              <Link
                className={`py-4 flex gap-3 items-center  text-slate-500 px-6  font-light hover:text-blue-600 hover:font-bold transition-all duration-500`}
              >
                <MdPersonSearch size={30} /> REKAP PENJUALAN
              </Link>
            </div>
          </ul>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MainLayout;
