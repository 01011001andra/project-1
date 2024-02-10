import React, { useEffect } from "react";
// import { saveAs } from "file-saver";
import { ContentLayout, TabelSetup } from "../../layouts";
import { Link } from "react-router-dom";
import { useGetExport, useGetRekap } from "../../hooks";
import { usePagination } from "../../stores";
import { toRupiah } from "../../utils/helper";

const RekapPenjualan = () => {
  const { currentPage, searchTerm } = usePagination();
  const { data: rekapData } = useGetRekap({ currentPage, searchTerm });
  const {
    data: exportData,
    refetch: exportRefetch,
    isFetching: exportIsFetching,
  } = useGetExport();
  async function handleExportClick() {
    if (exportIsFetching) {
      return null;
    }

    try {
      const response = await exportRefetch();
      const url = window.URL.createObjectURL(new Blob([response?.data?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `rekap.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      // Handle the error as needed
    }
  }

  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Hasil Penjualan</Link>
        </>
      }
      name_page={"Halaman Hasil Penjualan"}
    >
      <TabelSetup
        data={rekapData}
        tambah={false}
        button_tambahan={
          <button
            onClick={() => {
              handleExportClick();
            }}
            className="btn btn-success text-white"
          >
            Export to Excel
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Berat (Kg)</th>
                <th>Alamat</th>
                <th>No Telp</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              {rekapData?.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1 + 10 * (rekapData.currentPage - 1)}</th>
                    <td>{item.tanggal}</td>
                    <td>{item.totalKg}</td>
                    <td>{item.alamat}</td>
                    <td>{item.no_telp}</td>
                    <td>{toRupiah(item.harga)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TabelSetup>
    </ContentLayout>
  );
};

export default RekapPenjualan;
