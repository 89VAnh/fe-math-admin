"use client";

import {
  DashboardIcon,
  HistoryIcon,
  LevelIcon,
  MenuIcon,
  QuestionIcon,
  TestIcon,
  UserIcon,
} from "@/assets";
import ClickOutside from "@/components/ClickOutside";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  ACCOUNT_URL,
  DASHBOARD_URL,
  FORUM_URL,
  HISTORY_URL,
  LEVEL_URL,
  QUESTION_URL,
  TEST_URL,
} from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MAIN MENU",
    menuItems: [
      {
        icon: <DashboardIcon />,
        label: "Thống kê",
        route: DASHBOARD_URL,
      },
      {
        icon: <UserIcon />,
        label: "Quản lý người dùng",
        route: ACCOUNT_URL,
      },
      {
        icon: <QuestionIcon />,
        label: "Quản lý câu hỏi",
        route: QUESTION_URL,
      },
      {
        icon: <TestIcon />,
        label: "Quản lý đề trắc nghiệm",
        route: TEST_URL,
      },
      {
        icon: <LevelIcon />,
        label: "Quản lý cấp bậc (Lớp)",
        route: LEVEL_URL,
      },
      {
        icon: <LevelIcon />,
        label: "Quản lý diễn đàn",
        route: FORUM_URL,
      },
      {
        icon: <HistoryIcon />,
        label: "Lịch sử, kết quả",
        route: HISTORY_URL,
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}>
        {/* <!-- SIDEBAR HEADER --> */}
        <div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10'>
          <Link href='/'>
            <Image
              width={176}
              height={32}
              // src={"/images/logo/logo-dark.svg"}
              src={"/images/logo/Logo Web.svg"}
              alt='Logo'
              priority
              className='dark:hidden'
              style={{ width: "auto", height: "auto" }}
            />
            <Image
              width={176}
              height={32}
              // src={"/images/logo/logo.svg"}
              src={"/images/logo/Logo Web.svg"}
              alt='Logo'
              priority
              className='hidden dark:block'
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='block lg:hidden'>
            <MenuIcon />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
          {/* <!-- Sidebar Menu --> */}
          <nav className='mt-1 px-4 lg:px-6'>
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className='mb-5 text-sm font-medium text-dark-4 dark:text-dark-6'>
                  {group.name}
                </h3>

                <ul className='mb-6 flex flex-col gap-2'>
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
