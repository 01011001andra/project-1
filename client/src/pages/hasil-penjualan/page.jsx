import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../layouts";
import { Link } from "react-router-dom";
import { Recharts } from "./components";
import { useForm } from "react-hook-form";
import { usePostGrafik } from "../../hooks";

function generateYears(startYear, endYear) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

const HasilPenjualan = () => {
  const [dateGrafik, setDateGrafik] = useState();
  const [errorDataGrafik, setErrorDataGrafik] = useState(null);
  const currentYear = new Date().getFullYear();
  const yearsList = generateYears(2023, currentYear);
  const monthList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const dayList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const { register, watch } = useForm();
  const mutation = usePostGrafik();
  useEffect(() => {
    // setErrorDataGrafik(true);
    mutation
      .mutateAsync({
        tahun: watch("year"),
        bulan: watch("month"),
        hari: watch("day"),
      })
      .then((res) => {
        setDateGrafik(res?.data);
      })
      .catch((err) => {
        setErrorDataGrafik(err.response.data.msg);
        console.error(err.response.data.msg);
      });
  }, [watch("year"), watch("month"), watch("day")]);

  useEffect(() => {
    mutation
      .mutateAsync({
        tahun: watch("year"),
        bulan: watch("month"),
        hari: watch("day"),
      })
      .then((res) => {
        setDateGrafik(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // console.log(dateGrafik);
  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Hasil Penjualan</Link>
        </>
      }
      name_page={"Halaman Hasil Penjualan"}
    >
      <div className="w-full min-h-[25vh] gap-16 md:min-h-[40vh] lg:min-h-[50vh] xl:min-h-[70vh] 2xl:min-h-[80vh] flex flex-col ">
        <div className="flex flex-col lg:flex-row gap-10 justify-between items-center ">
          <h1 className="font-bold uppercase">Grafik hasil penjualan</h1>
          <div className="flex flex-row-reverse gap-5 max-w-lg w-full">
            <label className="form-control w-full max-w-xs ">
              <select
                {...register("year")}
                defaultValue={yearsList[yearsList.length - 1]}
                className="select select-bordered w-full max-w-xs"
              >
                {yearsList?.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="form-control w-full max-w-xs ">
              <select
                {...register("month")}
                defaultValue={""}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value={""}>
                  Pilih bulan
                </option>
                {monthList?.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="form-control w-full max-w-xs ">
              <select
                defaultValue={""}
                {...register("day")}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value={""}>
                  Pilih tanggal
                </option>
                {dayList?.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
        {dateGrafik?.data?.length == 0 ? (
          <div className="text-red-500 w-full h-full font-bold text-2xl text-center">
            Tidak ada penjualan
          </div>
        ) : (
          <>
            <Recharts data={dateGrafik?.data} colors={dateGrafik?.colors} />
          </>
        )}
      </div>
    </ContentLayout>
  );
};

export default HasilPenjualan;
