import React from "react";

const ModalConfirm = ({ id, title, description, ...props }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <div className="flex gap-5 w-full items-end justify-end">
            <button
              onClick={() => document.getElementById(id).close()}
              className="btn btn-error text-white"
            >
              Batal
            </button>
            <button className="btn btn-success text-white" {...props}>
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalConfirm;
