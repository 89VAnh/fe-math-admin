"use client";
import Table from "@/components/Table";
import { searchAccountFetcher } from "@/helper/fetcher/account.fetcher";
import { Account, SearchAccount } from "@/types/Account";
import { Chip, ChipProps, Image } from "@nextui-org/react";
import AccountModal from "./AccountModal";
import DeleteModal from "./DeleteModal";
import SearchTable from "./SearchTable";

const statusColorMap: Record<string, ChipProps["color"]> = {
  1: "warning",
  2: "success",
};

const columns = [
  {
    key: "avatar",
    label: "Avatar",
    render: ({ children }: { children: any }) =>
      children ? (
        <Image
          src={children?.toString()}
          alt='avatar'
          width={80}
          height={80}
          isZoomed
          className='rounded-full'
        />
      ) : (
        ""
      ),
  },
  {
    key: "username",
    label: "Tên đăng nhập",
  },
  {
    key: "name",
    label: "Tên",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
  {
    key: "role",
    label: "Quyền",
    render: ({ children }: { children: React.ReactNode }) => {
      const role: string = children?.toString() || "";

      return (
        <Chip color={statusColorMap[role]} variant='flat'>
          {role == "1" ? "Admin" : "Người dùng"}
        </Chip>
      );
    },
  },
  {
    key: "action",
    label: "Tác vụ",
    render: ({ item }: { item: Account }) => (
      <div className='flex items-center space-x-3.5'>
        <AccountModal username={item.username} />
        <DeleteModal username={item.username} />
      </div>
    ),
  },
];

const AccountTable = () => {
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <div className='max-w-full overflow-x-auto'>
        <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <SearchTable />

          <AccountModal />
        </div>
        <Table<Account>
          columns={columns}
          rowKey='username'
          searchFetcher={searchAccountFetcher}
        />
      </div>
    </div>
  );
};

export default AccountTable;
