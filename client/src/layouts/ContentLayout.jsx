import React from "react";

const ContentLayout = ({ navigasi, children, name_page }) => {
  return (
    <div className="p-8 w-full min-h-screen  flex flex-col gap-7 xl:gap-12">
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2 text-sm xl:text-base">{navigasi}</div>
        <h2 className="font-bold text-lg xl:text-2xl uppercase">{name_page}</h2>
      </div>
      {children}
    </div>
  );
};

export default ContentLayout;
