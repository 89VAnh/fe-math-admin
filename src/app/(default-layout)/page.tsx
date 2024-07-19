"use client";
import DeleteModal from "@/components/DeleteModel";
import { IService } from "@/types/service";
import { queryClient } from "@/utils/query-loader/react-query";
import {
  CACHE_SERVICE,
  useDeleteService,
  useSearchServices,
  useStartService,
  useStopService,
} from "@/utils/query-loader/services.loader";
import {
  PageContainer,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Space, Switch } from "antd";
import React from "react";
import ServiceModal from "./ServiceModel";

export default function ServicePage() {
  const { data, isLoading } = useSearchServices({ params: {} });

  const startService = useStartService({
    config: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CACHE_SERVICE.SEARCH] });
      },
    },
  });

  const stopService = useStopService({
    config: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CACHE_SERVICE.SEARCH] });
      },
    },
  });

  const columns: ProColumns<IService>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Đường dẫn",
      dataIndex: "homePath",
      search: false,
    },
    {
      title: "Lệnh chạy",
      dataIndex: "startBash",
      search: false,
    },
    {
      title: "Lệnh dừng",
      dataIndex: "stopBash",
      search: false,
    },

    {
      title: "JPS",
      dataIndex: "jps",
      search: false,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render(dom, record) {
        return (
          <Switch
            checkedChildren='Chạy'
            unCheckedChildren='Tắt'
            checked={Boolean(dom)}
            onChange={(isActive) => {
              if (isActive) startService.mutate(record?._id);
              else stopService.mutate(record?._id);
            }}
            loading={stopService.isPending || startService.isPending}
          />
        );
      },
    },

    {
      title: "Tác vụ",
      render(_, record) {
        return (
          <Space>
            <ServiceModal id={record?._id} isCreate={false} />
            <DeleteModal
              id={record?._id}
              useDelete={useDeleteService}
              caches={[CACHE_SERVICE.SEARCH]}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer title='Services'>
      {data && (
        <ProTable
          toolBarRender={() => [<ServiceModal key={"create-update-model"} />]}
          columns={columns}
          dataSource={data}
          rowKey={"_id"}
          onReset={() => {
            console.log("Reset!!");
          }}
          loading={isLoading}
        />
      )}
      hello
    </PageContainer>
  );
}
