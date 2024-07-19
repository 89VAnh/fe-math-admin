import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Loading() {
  return (
    <Spin
      size='large'
      fullscreen
      indicator={<LoadingOutlined style={{ fontSize: 120 }} />}
    />
  );
}
