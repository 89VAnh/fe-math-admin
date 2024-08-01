import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "@/assets";
import { useSearchQuestion } from "@/helper/data/question.loader";
import { Question } from "@/types/Question";
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, {
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Latex from "react-latex-next";

const columns = [
  {
    key: "index",
    label: "STT",
  },
  {
    key: "content",
    label: "Nội dung",
    render: ({ children }: { children: any }) => {
      return (
        <Latex>
          {(children as string)
            ? children.replace(
                /<p>(.*?)<\/p>/g,
                (_: any, p1: string) => `$${p1}$`
              )
            : ""}
        </Latex>
      );
    },
  },
];

const Transfer = ({
  transferData = [],
  setTransferData,
}: {
  transferData?: number[];
  setTransferData: Dispatch<SetStateAction<number[]>>;
}) => {
  const { data } = useSearchQuestion({});

  const [leftItems, setLeftItems] = useState<Question[]>([]);
  const [rightItems, setRightItems] = useState<Question[]>([]);

  useEffect(() => {
    setLeftItems(
      data?.data
        ? data?.data.filter((item: Question) => !transferData.includes(item.id))
        : []
    );
    if (transferData?.length > 0)
      setRightItems(
        data?.data.filter((item: Question) => transferData.includes(item.id))
      );
  }, [data?.data]);

  const [leftPage, setleftPage] = useState(1);
  const [rightPage, setRightPage] = useState(1);

  const [selectedLeftItems, setSelectedLeftItems] = useState<number[]>([]);
  const [selectedRightItems, setSelectedRightItems] = useState<number[]>([]);

  useEffect(() => {
    // console.log(rightItems ? rightItems.map((x) => x.id) : []);
    setTransferData(rightItems ? rightItems.map((x) => x.id) : []);
  }, [rightItems]);

  const moveItems = (
    source: Question[],
    target: Question[],
    setSource: React.Dispatch<React.SetStateAction<Question[]>>,
    setTarget: React.Dispatch<React.SetStateAction<Question[]>>,
    selectedItems: number[],
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    const newSource = source.filter((item) => !selectedItems.includes(item.id));
    const movedItems = source.filter((item) => selectedItems.includes(item.id));
    setSource(newSource);
    setTarget([...target, ...movedItems]);
    setSelectedItems([]);
  };

  const renderCell = useCallback((item: Question, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Question];
    const column = columns.find((column) => column.key === columnKey);
    if (column && column.render) {
      return column.render({ children: cellValue });
    } else return cellValue as React.ReactNode;
  }, []);

  return (
    <div className='flex gap-2 w-full items-center h-full'>
      <Table
        className='flex-1 h-full'
        selectionMode='multiple'
        bottomContent={
          leftPage > 1 ? (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                page={leftPage}
                total={leftItems.length}
                onChange={(page) => setleftPage(page)}
              />
            </div>
          ) : null
        }
        onSelectionChange={(selected: Set<Key> | string) => {
          if (typeof selected !== "string")
            setSelectedLeftItems(Array.from(selected).map((x) => Number(x)));
          else if (selected === "all")
            setSelectedLeftItems(leftItems.map((x) => x.id));
          else setSelectedLeftItems([]);
        }}>
        <TableHeader columns={columns || []}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={`Chưa có câu hỏi nào`}
          items={
            leftItems.length
              ? leftItems.map((item: Question, index: number) => ({
                  ...item,
                  index: index + 1,
                }))
              : []
          }
          loadingContent={<Spinner label='Loading...' />}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='flex flex-col gap-2'>
        <Button
          isIconOnly
          color='success'
          onClick={() =>
            moveItems(
              leftItems,
              rightItems,
              setLeftItems,
              setRightItems,
              selectedLeftItems,
              setSelectedLeftItems
            )
          }>
          <ChevronRightIcon />
        </Button>
        <Button
          isIconOnly
          color='success'
          onClick={() =>
            moveItems(
              rightItems,
              leftItems,
              setRightItems,
              setLeftItems,
              selectedRightItems,
              setSelectedRightItems
            )
          }>
          <ChevronLeftIcon />
        </Button>
      </div>
      <Table
        className='flex-1 h-full'
        selectionMode='multiple'
        onSelectionChange={(selected: Set<Key> | string) => {
          if (typeof selected !== "string")
            setSelectedRightItems(Array.from(selected).map((x) => Number(x)));
          else if (selected === "all")
            setSelectedRightItems(rightItems.map((x) => x.id));
          else setSelectedRightItems([]);
        }}
        bottomContent={
          rightPage > 1 ? (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                page={rightPage}
                total={rightItems.length}
                onChange={(page) => setRightPage(page)}
              />
            </div>
          ) : null
        }>
        <TableHeader columns={columns || []}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={`Chưa có câu hỏi nào`}
          items={
            rightItems?.length
              ? rightItems.map((item: Question, index: number) => ({
                  ...item,
                  index: index + 1,
                }))
              : []
          }
          loadingContent={<Spinner label='Loading...' />}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transfer;
