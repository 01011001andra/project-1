import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { menus } from "../utils/constant";
import { ModalConfirm } from "../components";
import { GiHamburgerMenu } from "react-icons/gi";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const showMainLayout = [
    "/cari-pelanggan",
    "/daftar-pelanggan",
    "/diskon",
    "/hasil-penjualan",
    "/rekap-penjualan",
  ];

  if (showMainLayout.includes(pathname)) {
    return (
      <>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="bg-blue-600 py-5 px-4 flex justify-end lg:hidden">
              <label
                htmlFor="my-drawer-2"
                className="drawer-button w-full flex justify-between items-center"
              >
                <h3 className="text-white text-lg font-bold">
                  Laundry<span className="font-light">App</span>
                </h3>
                <GiHamburgerMenu
                  className="cursor-pointer text-white "
                  size={30}
                />
              </label>
            </div>
            {children}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu p-0 w-80 min-h-full flex flex-col gap-12 bg-[#dcdefa] py-20 text-base-content relative">
              <CiLogout
                className="absolute top-11 right-11 cursor-pointer hover:text-red-600"
                size={30}
                onClick={() => {
                  document.getElementById("logoutConfirm").showModal();
                }}
              />
              <div className="avatar mx-auto flex flex-col gap-5 items-center justify-center ">
                <div className="w-24 mask mask-squircle">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
                <h3 className="font-bold text-base">Halo Admin!</h3>
              </div>
              <div className="flex flex-col gap-3">
                {menus?.map((item) => {
                  return (
                    <Link
                      to={item.path}
                      className={`py-4 flex gap-3 ${
                        item.path == pathname
                          ? "text-blue-600 bg-gradient-to-r border-l-4 items-center px-6 border-blue-600 font-bold from-blue-100 "
                          : " items-center  text-black px-6  font-light hover:text-blue-600 hover:font-bold transition-all duration-500"
                      } `}
                    >
                      {item.icon} {item.name}
                    </Link>
                  );
                })}
                {/* <Link
                className={`py-4 flex gap-3 items-center  text-blue-600 px-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-100  font-bold`}
              >
                <MdPersonSearch size={30} /> CARI PELANGGAN
              </Link> */}
              </div>
            </ul>
          </div>
        </div>
        <ModalConfirm
          id={"logoutConfirm"}
          title={"Logout?"}
          description={"Anda yakin ingin logout?"}
        />
      </>
    );
  }

  return <>{children}</>;
};

export default MainLayout;
