import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import theme from "@/config/theme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ProConfigProvider } from "@ant-design/pro-components";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import React from "react";

export default function Provider({ children }: React.PropsWithChildren) {
  return (
    <AntdRegistry>
      <ConfigProvider locale={viVN} theme={theme}>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}
