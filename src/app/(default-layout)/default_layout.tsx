"use client";
import defaultMenus from "@/config/menus";
import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pathname, setPathname] = useState(usePathname());

  const loopMenuItem = (menus: any[]): MenuDataItem[] =>
    menus.map(({ icon, routes, ...item }) => ({
      ...item,
      children: routes && loopMenuItem(routes),
    }));

  const router = useRouter();
  return (
    <ProLayout
      menu={{ request: async () => loopMenuItem(defaultMenus) }}
      fixSiderbar
      location={{ pathname }}
      // menuItemRender={(item, defaultDom) =>
      //   item.path ? (
      //     <p
      //       onClick={() => {
      //         const path = item.path || "/";
      //         setPathname(path);
      //         router.push(path);
      //       }}>
      //       {defaultDom}
      //     </p>
      //   ) : (
      //     defaultDom
      //   )
      // }
    >
      {children}
    </ProLayout>
  );
}
