import React from "react";
import LevelTable from "./TestTable";

export default function Page() {
  return (
    <>
      <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-[26px] font-bold leading-[30px] text-dark dark:text-white'>
          Danh sách bài thi
        </h2>
      </div>
      <LevelTable />
    </>
  );
}
