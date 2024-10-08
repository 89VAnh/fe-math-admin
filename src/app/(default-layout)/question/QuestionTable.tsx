"use client";
import Table from "@/components/Table";
import { useSearchLevel } from "@/helper/data/level.loader";
import {
  useCreateQuestion,
  useDeleteQuestion,
  useSearchQuestion,
  useUpdateQuestion,
} from "@/helper/data/question.loader";
import { Level } from "@/types/Level";
import { Question } from "@/types/Question";
import { Chip } from "@nextui-org/react";
import Latex from "react-latex-next";

const columns = [
  {
    key: "index",
    label: "STT",
  },
  {
    key: "content",
    label: "Nội dung",
    render: ({ children }: { children: any }) => (
      <Latex>{children as string}</Latex>
    ),
  },
  {
    key: "answerA",
    label: "Đáp án A",
    render: ({ children }: { children: any }) => (
      <Latex>{children as string}</Latex>
    ),
  },
  {
    key: "answerB",
    label: "Đáp án B",
    render: ({ children }: { children: any }) => (
      <Latex>{children as string}</Latex>
    ),
  },
  {
    key: "answerC",
    label: "Đáp án C",
    render: ({ children }: { children: any }) => (
      <Latex>{children as string}</Latex>
    ),
  },
  {
    key: "answerD",
    label: "Đáp án D",
    render: ({ children }: { children: any }) => (
      <Latex>{children as string}</Latex>
    ),
  },
  {
    key: "correctAnswer",
    label: "Đáp án đúng",
    render: ({ children }: { children: any }) => (
      <Chip color='success'>{children}</Chip>
    ),
  },
  {
    key: "level",
    label: "Cấp bậc",
  },
];

const QuestionTable = () => {
  const { data } = useSearchLevel({});

  const formItems = [
    {
      key: "id",
      type: "string",
      isPrimary: true,
    },
    {
      key: "content",
      type: "latex",
      label: "Nội dung câu hỏi",
      render: (children: React.ReactNode) => (
        <Latex>${children as string}$</Latex>
      ),
    },
    {
      key: "answerA",
      type: "latex",
      label: "Đáp án A",
      render: (children: React.ReactNode) => (
        <Latex>${children as string}$</Latex>
      ),
    },
    {
      key: "answerB",
      type: "latex",
      label: "Đáp án B",
      render: (children: React.ReactNode) => (
        <Latex>${children as string}$</Latex>
      ),
    },
    {
      key: "answerC",
      type: "latex",
      label: "Đáp án C",
      render: (children: React.ReactNode) => (
        <Latex>${children as string}$</Latex>
      ),
    },
    {
      key: "answerD",
      type: "latex",
      label: "Đáp án D",
    },
    [
      {
        key: "correctAnswer",
        type: "string",
        label: "Đáp án đúng",
        options: [
          { label: "Đáp án A", value: "A" },
          { label: "Đáp án B", value: "B" },
          { label: "Đáp án C", value: "C" },
          { label: "Đáp án D", value: "D" },
        ],
      },
      {
        key: "levelId",
        label: "Cấp bậc",
        options: data?.data.map((x: Level) => ({
          label: x.name,
          value: x.id,
        })),
      },
    ],
  ];

  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <Table<Question>
        columns={columns}
        title={"câu hỏi"}
        rowKey='id'
        useSearch={useSearchQuestion}
        useDelete={useDeleteQuestion}
        useCreate={useCreateQuestion}
        useUpdate={useUpdateQuestion}
        formItems={formItems}
      />
    </div>
  );
};

export default QuestionTable;
