"use client";
import Table from "@/components/Table";
import { useSearchLevel } from "@/helper/data/level.loader";
import {
  useCreateTest,
  useDeleteTest,
  useSearchTest,
  useUpdateTest,
} from "@/helper/data/test.loader";
import { Level } from "@/types/Level";
import { Test } from "@/types/Test";
import { BASE_URL } from "@/utils/config";
import { Image } from "@nextui-org/react";

const columns = [
  {
    key: "index",
    label: "STT",
  },
  {
    key: "id",
    label: "Mã bài thi",
  },
  {
    key: "title",
    label: "Tiêu đề",
  },
  {
    key: "image",
    label: "Ảnh",
    render: ({ children }: { children: any }) =>
      children ? (
        <Image
          src={children?.toString()}
          alt='image'
          width={160}
          height={100}
        />
      ) : (
        ""
      ),
  },
  {
    key: "level",
    label: "Cấp bậc",
  },
  {
    key: "duration",
    label: "Thời gian làm",
    render: ({ children }: { children: any }) => {
      return children.toString() + " phút";
    },
  },
  {
    key: "amount_question",
    label: "Số lượng câu hỏi",
    render: ({ item }: { item: Test }) => {
      return item.questions.length;
    },
  },
];

const TestTable = () => {
  const { data } = useSearchLevel({});

  const formItems = [
    {
      key: "id",
      label: "Mã bài thi",
      type: "string",
      isPrimary: true,
      hidden: false,
    },
    {
      key: "title",
      label: "Tiêu đề",
    },
    {
      key: "image",
      label: "Ảnh",
      type: "image",
    },
    [
      {
        key: "levelId",
        label: "Cấp bậc",
        options: data?.data.map((x: Level) => ({
          label: x.name,
          value: x.id,
        })),
      },
      {
        key: "duration",
        label: "Thời gian làm",
        type: "number",
        endContent: " phút",
        min: 1,
        max: 300,
      },
    ],
    {
      key: "questions",
      label: "Các câu hỏi",
      type: "transfer",
    },
  ];

  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <Table<Test>
        columns={columns}
        rowKey='id'
        title={"bài thi"}
        useSearch={useSearchTest}
        useDelete={useDeleteTest}
        useCreate={useCreateTest}
        useUpdate={useUpdateTest}
        formItems={formItems}
      />
    </div>
  );
};

export default TestTable;
