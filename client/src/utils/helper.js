export const toRupiah = (IDR) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(IDR);

  return rupiah;
};

// export const
