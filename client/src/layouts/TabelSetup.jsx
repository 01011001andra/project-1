import React from "react";

const TabelSetup = ({
  tambah = true,
  tambah_onClick,
  cari = true,
  pagination = true,
  children,
}) => {
  return (
    <div className="w-full flex flex-col  rounded-xl gap-10">
      <div className="flex-col-reverse gap-2 lg:flex-row flex justify-between">
        {tambah && (
          <button className="btn btn-primary bg-blue-600 text-white">
            Tambah Pelanggan
          </button>
        )}
        <div></div>
        {cari && (
          <input
            type="text"
            placeholder="Cari..."
            className="input input-bordered w-full xl:max-w-xs"
          />
        )}
      </div>
      {children}

      {pagination && (
        <div className="w-full flex justify-between">
          <span>Total: 20</span>
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 22</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelSetup;
