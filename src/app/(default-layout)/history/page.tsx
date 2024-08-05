import React from "react";
import HistoryTable from "./HistoryTable";

export default function HistoryPage() {
  return (
    <>
      <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-[26px] font-bold leading-[30px] text-dark dark:text-white'>
          Danh sách lịch sử
        </h2>
      </div>
      <HistoryTable />
    </>
  );
}
