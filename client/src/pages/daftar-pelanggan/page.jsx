import React from "react";
import { ContentLayout, TabelSetup } from "../../layouts";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { ModalConfirm } from "../../components";

const DaftarPelanggan = () => {
  const navigate = useNavigate();

  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Daftar Pelanggan</Link>
        </>
      }
      name_page={"Halaman Daftar Pelanggan"}
    >
      <TabelSetup tambah_route="/daftar-pelanggan/tambah">
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
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>12/12/2012</td>
                <td>Rp. 12.000</td>
                <td
                  className="text-red-600 font-bold uppercase
                "
                >
                  Belum selesai
                </td>
                <td className="flex gap-3 items-center justify-center ">
                  <RiDeleteBin2Fill
                    onClick={() => {
                      document.getElementById("delete_pelanggan").showModal();
                    }}
                    size={25}
                    className="cursor-pointer hover:text-red-600"
                  />
                  <FaUserEdit
                    size={25}
                    onClick={() => navigate("/daftar-pelanggan/update")}
                    className="cursor-pointer hover:text-green-600"
                  />
                  <PiWhatsappLogoDuotone size={25} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabelSetup>
      <ModalConfirm
        title={"Menghapus !"}
        description={"Hapus pelanggan ini ?"}
        id={"delete_pelanggan"}
      />
    </ContentLayout>
  );
};

export default DaftarPelanggan;
