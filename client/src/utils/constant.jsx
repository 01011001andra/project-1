import { MdPersonSearch, MdDiscount, MdSummarize } from "react-icons/md";
import { FaPeopleGroup, FaMoneyBillTrendUp } from "react-icons/fa6";
export const menus = [
  {
    name: "CARI PELANGGAN",
    path: "/cari-pelanggan",
    icon: <MdPersonSearch size={30} />,
  },
  {
    name: "DAFTAR PELANGGAN",
    path: "/daftar-pelanggan",
    icon: <FaPeopleGroup size={30} />,
  },
  {
    name: "DISKON",
    path: "/diskon",
    icon: <MdDiscount size={30} />,
  },
  {
    name: "HASIL PENJUALAN",
    path: "/hasil-penjualan",
    icon: <FaMoneyBillTrendUp size={30} />,
  },
  {
    name: "REKAP PENJUALAN",
    path: "/rekap-penjualan",
    icon: <MdSummarize size={30} />,
  },
];
