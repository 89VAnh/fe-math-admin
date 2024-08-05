"use client";
import { useSearchResult } from "@/helper/data/result.loader";
import { Result } from "@/types/Result";
import { formatDate } from "@/utils";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";

const columns = [
  {
    key: "index",
    label: "STT",
  },
  {
    key: "testId",
    label: "Bài thi",
  },
  {
    key: "user",
    label: "Người thi",
  },
  {
    key: "startTime",
    label: "Giờ bắt đầu",
  },
  {
    key: "endTime",
    label: "Giờ kết thúc",
  },
  {
    key: "score",
    label: "Điểm",
  },
];

export default function HistoryTable() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data } = useSearchResult({
    page,
    pageSize: PAGE_SIZE,
  });

  const pages = useMemo(
    () => (data?.total ? Math.ceil((data?.total || 0) / PAGE_SIZE) : 0),
    [data?.total, PAGE_SIZE]
  );

  const renderCell = React.useCallback((item: Result, columnKey: React.Key) => {
    const cellValue: any = item[columnKey as keyof Result];
    switch (columnKey) {
      case "startTime":
      case "endTime":
        return formatDate(cellValue.toString());

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label='Example table with dynamic content'
      bottomContent={
        pages > 1 ? (
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }>
      <TableHeader columns={columns || []}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={
          data?.data
            ? (data?.data as Result[]).map((item: Result, index: number) => ({
                ...item,
                index: (page - 1) * PAGE_SIZE + index + 1,
              }))
            : []
        }>
        {(item: Result) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
