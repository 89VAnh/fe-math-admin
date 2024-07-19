"use client";
import { IMaster } from "@/types/master";
import { useGetMasterInfo } from "@/utils/query-loader/master.loader";
import {
  PageContainer,
  ProForm,
  ProFormText,
} from "@ant-design/pro-components";
import { Card, Col, Row } from "antd";
import React from "react";

export default function MasterPage() {
  const { data } = useGetMasterInfo({});
  return (
    <PageContainer title='Máy master'>
      <Card>
        {data ? (
          <ProForm<IMaster> title='Thông tin máy master' initialValues={data}>
            <Row gutter={32}>
              <Col span={8}>
                <ProFormText
                  name='ip'
                  placeholder='Nhập địa chỉ ip máy master'
                  required
                  label='Địa chỉ ip'
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  name='username'
                  placeholder='Nhập tên người dùng máy master'
                  required
                  label='Username'
                />
              </Col>
              <Col span={8}>
                <ProFormText.Password
                  name='password'
                  placeholder='Mật khẩu cho người dùng máy master'
                  required
                  label='Password'
                />
              </Col>
            </Row>
          </ProForm>
        ) : null}
      </Card>
    </PageContainer>
  );
}
