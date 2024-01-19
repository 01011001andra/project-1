import React from "react";
import { Link } from "react-router-dom";
import { usePagination } from "../stores";
import { ImFilesEmpty } from "react-icons/im";

const TabelSetup = ({
  tambah = true,
  button_tambahan,
  tambah_route,
  cari = true,
  pagination = true,
  isFetching,
  isLoading,
  data,
  children,
}) => {
  const {
    currentPage,
    nextPage,
    prevPage,
    resetPage,
    setSearchTerm,
    resetSearchTerm,
  } = usePagination();
  let searchTimeout;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Menghapus timeout sebelumnya (jika ada)
    clearTimeout(searchTimeout);

    // Mengatur timeout baru
    searchTimeout = setTimeout(() => {
      setSearchTerm(inputValue); // Set the search term
      resetPage();
    }, 1000); // Penundaan 2 detik (2000 ms)
  };
  React.useEffect(() => {
    resetSearchTerm();
    resetPage();
  }, []);

  return (
    <div className="w-full flex flex-col  rounded-xl gap-10">
      <div className="flex-col-reverse gap-2 lg:flex-row flex justify-between">
        {button_tambahan && <>{button_tambahan}</>}
        {tambah && (
          <Link
            to={tambah_route}
            className="btn btn-primary bg-blue-600 text-white"
          >
            Tambah
          </Link>
        )}
        <div></div>
        {cari && (
          <input
            type="text"
            placeholder="Cari..."
            onChange={handleInputChange}
            className="input input-bordered w-full xl:max-w-xs"
          />
        )}
      </div>
      {children}

      {data?.data.length == 0 && (
        <div className="text-center gap-5 py-5 flex-col flex items-center justify-center">
          <ImFilesEmpty size={50} />
          <span>Tidak ada data</span>
        </div>
      )}

      {pagination && (
        <div className="join justify-between bg-white">
          <div className="text-black flex gap-3 items-center">
            Total :{" "}
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              data?.total
            )}
          </div>
          <div className="flex bg-base-100 ">
            <button
              className="join-item btn"
              onClick={() => {
                if (currentPage === 1) {
                  return null;
                }
                prevPage();
              }}
            >
              «
            </button>
            <button className="join-item btn">
              Halaman{" "}
              {isFetching ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                currentPage
              )}{" "}
              /{" "}
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                data?.totalPages
              )}
            </button>
            <button
              className="join-item btn"
              onClick={() => {
                if (currentPage >= data?.totalPages) {
                  return null;
                }
                nextPage();
              }}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelSetup;
