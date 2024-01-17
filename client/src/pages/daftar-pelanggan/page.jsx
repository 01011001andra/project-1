import React from "react";
import { ContentLayout } from "../../layouts";
import { Link } from "react-router-dom";

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
      <div className="w-full flex flex-col  rounded-xl gap-10">
        <div className="flex-col-reverse gap-2 lg:flex-row flex justify-between">
          <button className="btn btn-primary bg-blue-600 text-white">
            Tambah Pelanggan
          </button>
          <input
            type="text"
            placeholder="Cari..."
            className="input input-bordered w-full xl:max-w-xs"
          />
        </div>
        <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-between">
          <span>Total: 20</span>
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 22</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default DaftarPelanggan;
