"use client";
import Table from "@/components/Table";
import {
  useDeleteAccount,
  useSearchAccount,
} from "@/helper/data/account.loader";
import { Account } from "@/types/Account";
import { Chip, ChipProps, Image } from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  1: "warning",
  2: "success",
};

const columns = [
  {
    key: "index",
    label: "STT",
  },
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
];

const AccountTable = () => {
  return (
    <div className='rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5'>
      <Table<Account>
        columns={columns}
        title={"người dùng"}
        rowKey='username'
        useSearch={useSearchAccount}
        useDelete={useDeleteAccount}
      />
    </div>
  );
};

export default AccountTable;
