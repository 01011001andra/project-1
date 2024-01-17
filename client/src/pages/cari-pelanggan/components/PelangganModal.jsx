import React from "react";

const PelangganModal = () => {
  return (
    <dialog id="PelangganModal" className="modal">
      <div className="modal-box max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col h-full justify-between gap-5">
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg">Pelanggan tersedia!</h3>
            <div className="overflow-x-auto">
              <table className="">
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td className="font-bold">Nama</td>
                    <td>: Yandra</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Nomor WA</td>
                    <td>: Yandra</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Alamat</td>
                    <td>: Kavling senjulgxxxx</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Terakhir membeli</td>
                    <td>: Kavling senjulgxxxx</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button className="btn btn-success text-white">LANJUT</button>
        </div>
      </div>
    </dialog>
  );
};

export default PelangganModal;
