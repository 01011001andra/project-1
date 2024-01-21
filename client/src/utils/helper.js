export const toRupiah = (IDR) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(IDR);

  return rupiah;
};

export function formatNomorTelepon(nomor) {
  // Hapus karakter "-" atau spasi yang mungkin ada
  nomor = nomor.replace(/[-\s]/g, "");

  // Cek apakah nomor dimulai dengan "+62"
  if (nomor.startsWith("+62")) {
    // Hapus "+62" dan tambahkan "0" di depannya
    nomor = "0" + nomor.slice(3);
  }

  return nomor;
}
