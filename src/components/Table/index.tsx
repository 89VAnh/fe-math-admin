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
import "katex/dist/katex.min.css";
import React, { Key, useCallback, useMemo, useState } from "react";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import SearchTable from "./SearchTable";
import UpdateModal from "./UpdateModal";

type Column<T> = {
  key: string;
  label: string;
  render?: ({ children, item }: { children: any; item: T }) => React.ReactNode;
};

export default function Table<T>({
  columns,
  title,
  rowKey,
  useSearch,
  useDelete,
  useCreate,
  useUpdate,
  formItems,
}: {
  columns: Column<T>[];
  title: string;
  rowKey: keyof T;
  useSearch: any;
  useDelete?: any;
  useCreate?: any;
  useUpdate?: any;
  formItems?: any;
}) {
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState("");
  const PAGE_SIZE = 10;

  const {
    data,
    isLoading,
    mutate: searchMutate,
  } = useSearch({
    page,
    pageSize: PAGE_SIZE,
    searchContent,
  });

  const pages = useMemo(
    () => (data?.total ? Math.ceil((data?.total || 0) / PAGE_SIZE) : 0),
    [data?.total, PAGE_SIZE]
  );

  const cols: Column<T>[] = useMemo(
    () => [
      ...columns,
      {
        key: "action",
        label: "Tác vụ",
        render: ({ item }: { item: T }) => (
          <div className='flex items-center space-x-3.5'>
            {useUpdate && (
              <UpdateModal<T>
                item={item}
                title={title}
                useUpdate={useUpdate}
                searchMutate={searchMutate}
                formItems={formItems}
              />
            )}

            {useDelete && (
              <DeleteModal
                id={item[rowKey] as string | number}
                title={title}
                useDelete={useDelete}
                searchMutate={searchMutate}
              />
            )}
          </div>
        ),
      },
    ],
    [columns, rowKey, useDelete, useUpdate, searchMutate, title, formItems]
  );

  const renderCell = useCallback(
    (item: T, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof T];
      const column = cols.find((column) => column.key === columnKey);
      if (column && column.render) {
        return column.render({ children: cellValue, item });
      } else return cellValue as React.ReactNode;
    },
    [cols]
  );

  return (
    <div className='max-w-full overflow-x-auto'>
      <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <SearchTable
          handleSearch={(formData) =>
            setSearchContent(formData.get("search")?.toString() || "")
          }
        />

        {useCreate && (
          <CreateModal<T>
            title={title}
            useCreate={useCreate}
            searchMutate={searchMutate}
            formItems={formItems}
          />
        )}
      </div>

      <NextTable
        aria-label={`Bảng quản lý ${title}`}
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
        <TableHeader columns={columns ? cols : []}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={`Chưa có ${title} nào`}
          items={
            data?.data
              ? (data?.data as T[]).map((item: T, index: number) => ({
                  ...item,
                  index: (page - 1) * PAGE_SIZE + index + 1,
                }))
              : []
          }
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
    </div>
  );
}
