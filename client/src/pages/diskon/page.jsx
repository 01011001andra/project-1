import React from "react";
import { ContentLayout, TabelSetup } from "../../layouts";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteDiskon, useGetDiskon } from "../../hooks";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { usePagination } from "../../stores";
import { ModalConfirm } from "../../components";

const Diskon = () => {
  const navigate = useNavigate();
  const [idDiskon, setIdDiskon] = React.useState(null);
  const { currentPage, searchTerm } = usePagination();
  const { data: diskonData } = useGetDiskon({ currentPage, searchTerm });
  const mutation = useDeleteDiskon();

  function handleDeleteDiskon() {
    let body = {
      id: idDiskon,
    };
    mutation.mutate(body);
  }

  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Diskon</Link>
        </>
      }
      name_page={"Halaman Diskon"}
    >
      <TabelSetup data={diskonData} tambah_route={"/diskon/tambah"}>
        <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Total</th>
                <th>Persen</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {diskonData?.data?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th>{index + 1 + 10 * (diskonData.currentPage - 1)}</th>
                    <td>{item.total}</td>
                    <td>{item.persen}%</td>

                    <td className="flex gap-3 items-center justify-center ">
                      <RiDeleteBin2Fill
                        onClick={() => {
                          setIdDiskon(item.id);
                          document.getElementById("delete_diskon").showModal();
                        }}
                        size={25}
                        className="cursor-pointer hover:text-red-600"
                      />
                      <FaUserEdit
                        size={25}
                        onClick={() => navigate(`/diskon/update/${item.id}`)}
                        className="cursor-pointer hover:text-green-600"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TabelSetup>
      <ModalConfirm
        id={"delete_diskon"}
        description={"Hapus diskon ini?"}
        title={"Menghapus !"}
        onClick={handleDeleteDiskon}
      />
    </ContentLayout>
  );
};

export default Diskon;
