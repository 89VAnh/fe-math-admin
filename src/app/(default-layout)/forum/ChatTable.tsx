"use client";
import Table from "@/components/Table";
import { useDeleteChat, useSearchChat } from "@/helper/data/chat.loader";
import { Chat } from "@/types/Chat";

const columns = [
  {
    key: "index",
    label: "STT",
  },
  {
    key: "user",
    label: "Người dùng",
  },
  {
    key: "content",
    label: "Nội dung",
  },
  {
    key: "date",
    label: "Ngày",
  },
];

const ChatTable = () => {
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <Table<Chat>
        columns={columns}
        rowKey='id'
        title={"cấp bậc (lớp)"}
        useDelete={useDeleteChat}
        useSearch={useSearchChat}
      />
    </div>
  );
};

export default ChatTable;
