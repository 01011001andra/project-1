import React from "react";
import { ContentLayout } from "../../layouts";
import { Link } from "react-router-dom";
import { useGetDiskon } from "../../hooks";

const Diskon = () => {
  const { data } = useGetDiskon();

  console.log(data);

  return (
    <ContentLayout
      navigasi={
        <>
          <Link>Diskon</Link>
        </>
      }
      name_page={"Halaman Diskon"}
    >
      <h1>Hell</h1>
    </ContentLayout>
  );
};

export default Diskon;
