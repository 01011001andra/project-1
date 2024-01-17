import React from "react";
import { ContentLayout, TabelSetup } from "../../layouts";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { PiWhatsappLogoDuotone } from "react-icons/pi";

const DaftarPelanggan = () => {
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
                <th>Nomor WA</th>
                <th>Alamat</th>
                <th>Tanggal Pembelian</th>
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
                <td className="flex gap-3 items-center justify-center ">
                  <RiDeleteBin2Fill size={25} />
                  <FaUserEdit size={25} />
                  <PiWhatsappLogoDuotone size={25} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabelSetup>
    </ContentLayout>
  );
};

export default DaftarPelanggan;
