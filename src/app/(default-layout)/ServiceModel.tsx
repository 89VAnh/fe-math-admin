import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Tooltip, message } from "antd";

import { IService } from "@/types/service";
import { useDisclosure } from "@/utils/modal";
import { queryClient } from "@/utils/query-loader/react-query";
import {
  CACHE_SERVICE,
  useCreateService,
  useGetService,
  useUpdateService,
} from "@/utils/query-loader/services.loader";
import { RULES_FORM } from "@/utils/validator";
import { ModalForm, ProFormText } from "@ant-design/pro-components";

interface Props {
  id?: string;
  isCreate?: boolean;
}

export default function ServiceModal({
  id,
  isCreate = true,
}: Props): JSX.Element {
  const { open, close, isOpen } = useDisclosure();
  const [form] = Form.useForm();

  const { data: service, isLoading } = useGetService({
    id: id || "",
  });

  const updateService = useUpdateService({
    config: {
      onSuccess: (data: IService) => {
        message.success(`Cập nhật service ${data.name} thành công!`);
        queryClient.invalidateQueries({ queryKey: [CACHE_SERVICE.SEARCH] });
        close();
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const createService = useCreateService({
    config: {
      onSuccess: (data) => {
        message.success(`Thêm service ${data.name} thành công!`);
        queryClient.invalidateQueries({ queryKey: [CACHE_SERVICE.SEARCH] });
        close();
      },
      onError: (err) => {
        message.error(err.message);
      },
    },
  });

  const handleSubmit = async (values: IService) => {
    const dataPost = values;

    if (isCreate) {
      createService.mutate(dataPost);
    } else {
      updateService.mutate(dataPost);
    }
  };

  const handleOpen = () => {
    open();
  };

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  return (
    <>
      {isCreate ? (
        <Button
          key='button'
          icon={<PlusOutlined />}
          onClick={handleOpen}
          type='primary'>
          {"Thêm"}
        </Button>
      ) : (
        <Tooltip title={"Sửa"}>
          <Button
            type='dashed'
            onClick={handleOpen}
            style={{ color: "#faad14" }}>
            <EditOutlined />
          </Button>
        </Tooltip>
      )}
      <ModalForm
        title={isCreate ? "Thêm thông tin service" : "Sửa thông tin service"}
        width={"60vw"}
        initialValues={service}
        style={{ top: 58, padding: 0 }}
        open={isOpen}
        loading={isLoading}
        modalProps={{
          onCancel: handleCancel,
          maskClosable: false,
          confirmLoading: updateService.isPending,
        }}
        form={form}
        spellCheck={false}
        layout='vertical'
        onFinish={handleSubmit}>
        <Row gutter={32}>
          <ProFormText name='_id' hidden />
          <Col span={8}>
            <ProFormText
              name='name'
              placeholder={"Tên service"}
              label={"Tên service"}
              rules={RULES_FORM.required}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name='homePath'
              placeholder={"Đường dẫn service"}
              label={"Đường dẫn service"}
              rules={RULES_FORM.required}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name='startBash'
              placeholder={"Lệnh chạy service"}
              label={"Lệnh chạy service"}
              rules={RULES_FORM.required}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name='stopBash'
              placeholder={"Lệnh dừng service"}
              label={"Lệnh dừng service"}
              rules={RULES_FORM.required}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name='jps'
              placeholder={"jps"}
              label={"jps"}
              rules={RULES_FORM.required}
            />
          </Col>
        </Row>
      </ModalForm>
    </>
  );
}
