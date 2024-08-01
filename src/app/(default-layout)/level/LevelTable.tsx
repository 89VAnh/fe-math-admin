"use client";
import Table from "@/components/Table";
import {
  useCreateLevel,
  useDeleteLevel,
  useSearchLevel,
  useUpdateLevel,
} from "@/helper/data/level.loader";
import { Level } from "@/types/Level";

const columns = [
  {
    key: "index",
    label: "STT",
  },
  {
    key: "name",
    label: "Tên",
  },
];

const formItems = [
  {
    key: "id",
    type: "string",
    isPrimary: true,
  },
  {
    key: "name",
    type: "string",
    label: "Tên cấp bậc (lớp)",
  },
];

const LevelTable = () => {
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <Table<Level>
        columns={columns}
        rowKey='id'
        title={"cấp bậc (lớp)"}
        useSearch={useSearchLevel}
        useDelete={useDeleteLevel}
        useCreate={useCreateLevel}
        useUpdate={useUpdateLevel}
        formItems={formItems}
      />
    </div>
  );
};

export default LevelTable;
