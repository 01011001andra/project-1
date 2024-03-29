import { toast } from "react-toastify";

export const successNotify = (text, id) => {
  return toast.success(text, { autoClose: 3000, toastId: id });
};
export const errorNotify = (text, id) => {
  return toast.error(text, { autoClose: 3000, toastId: id });
};

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

export function convertToWhatsAppFormat(localPhoneNumber) {
  // Cek apakah nomor telepon dimulai dengan "08"
  if (localPhoneNumber.startsWith("08")) {
    // Mengganti "08" dengan "+62"
    return "+62" + localPhoneNumber.slice(1);
  } else {
    // Jika nomor tidak dimulai dengan "08", mengembalikan nomor asli
    return localPhoneNumber;
  }
}
