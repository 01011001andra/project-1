import React from "react";
import { ContentLayout, TabelSetup } from "../../layouts";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { ModalConfirm } from "../../components";
import { useDeletePelanggan, useGetPelanggan } from "../../hooks";
import { usePagination } from "../../stores";
import { toRupiah } from "../../utils/helper";

const DaftarPelanggan = () => {
  const { currentPage, searchTerm } = usePagination();
  const [idPelanggan, setIdPelanggan] = React.useState();
  const {
    data: pelangganData,
    isFetching: pelangganIsFetching,
    isLoading: pelangganIsLoad,
  } = useGetPelanggan({ searchTerm, currentPage });
  const mutation = useDeletePelanggan();
  const navigate = useNavigate();

  function handleDelete() {
    mutation.mutate({ id: idPelanggan });
  }

  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Daftar Pelanggan</Link>
        </>
      }
      name_page={"Halaman Daftar Pelanggan"}
    >
      <TabelSetup
        data={pelangganData}
        isFetching={pelangganIsFetching}
        isLoading={pelangganIsLoad}
        tambah_route="/daftar-pelanggan/tambah"
      >
        <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>No Telp</th>
                <th>Berat(Kg) </th>
                <th>Harga</th>
                <th>Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pelangganData?.data?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.no_telp}</td>
                    <td>{item.totalKg}</td>
                    <td>{toRupiah(item.totalKg * 10000)}</td>
                    <td
                      className="text-red-600 font-bold uppercase
                  "
                    >
                      Belum selesai
                    </td>
                    <td className="flex gap-3 items-center justify-center ">
                      <RiDeleteBin2Fill
                        onClick={() => {
                          setIdPelanggan(item.id);
                          document
                            .getElementById("delete_pelanggan")
                            .showModal();
                        }}
                        size={25}
                        className="cursor-pointer hover:text-red-600"
                      />
                      <FaUserEdit
                        size={25}
                        onClick={() =>
                          navigate(`/daftar-pelanggan/update/${item.id}`)
                        }
                        className="cursor-pointer hover:text-green-600"
                      />
                      <PiWhatsappLogoDuotone size={25} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TabelSetup>
      <ModalConfirm
        title={"Menghapus !"}
        description={"Hapus pelanggan ini ?"}
        id={"delete_pelanggan"}
        onClick={handleDelete}
      />
    </ContentLayout>
  );
};

export default DaftarPelanggan;
