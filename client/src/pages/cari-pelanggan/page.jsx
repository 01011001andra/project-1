import React from "react";
import { ContentLayout } from "../../layouts";

const CariPelanggan = () => {
  return (
    <ContentLayout
      navigasi={<>Cari Pelanggan &gt; Cari Pelanggan</>}
      name_page={"Halaman Cari Pelanggan"}
    >
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
    </ContentLayout>
  );
};

export default CariPelanggan;
