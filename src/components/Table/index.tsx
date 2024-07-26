import {
  Table as NextTable,
  Pagination,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { Key, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

type Column<T> = {
  key: string;
  label: string;
  render?: ({ children, item }: { children: any; item: T }) => React.ReactNode;
};

export default function Table<T>({
  columns,
  rowKey,
  searchFetcher,
}: {
  columns: Column<T>[];
  rowKey: keyof T;
  searchFetcher: any;
}) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data, isLoading } = useSWR(
    { page, pageSize: PAGE_SIZE },
    searchFetcher,
    {
      refreshInterval: 1000,
    }
  );

  const pages = useMemo(() => {
    return data?.total ? Math.ceil((data?.total || 0) / PAGE_SIZE) : 0;
  }, [data?.total, PAGE_SIZE]);

  const renderCell = useCallback(
    (item: T, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof T];
      const column = columns.find((column) => column.key === columnKey);
      if (column && column.render) {
        return column.render({ children: cellValue, item });
      } else return cellValue as React.ReactNode;
    },
    [columns]
  );

  return (
    <>
      <NextTable
        aria-label='Example table with dynamic content'
        bottomContent={
          pages > 0 ? (
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
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Chưa có dữ liệu nào"}
          items={(data?.data as T[]) || []}
          isLoading={isLoading}
          loadingContent={<Spinner label='Loading...' />}>
          {(item) => (
            <TableRow key={item[rowKey] as Key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </NextTable>
    </>
  );
}
