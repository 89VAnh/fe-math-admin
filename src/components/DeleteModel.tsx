import { useDisclosure } from "@/utils/modal";
import { queryClient } from "@/utils/query-loader/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, notification } from "antd";

interface Props {
  id: string;
  useDelete: any;
  caches: string[];
}

export default function DeleteModal({
  id,
  useDelete,
  caches,
}: Props): JSX.Element {
  const { open, close, isOpen } = useDisclosure();

  const handleDelete = useDelete({
    config: {
      onSuccess: () => {
        notification.success({ message: "Xóa thành công" });
        queryClient.invalidateQueries({ queryKey: caches });
        console.log("deleted!");
      },
      onError: (err: any) => {
        notification.error({
          message: "Xóa thất bại",
          description: err.message,
        });
      },
    },
  });

  return (
    <>
      <Tooltip title={"Xóa"}>
        <Button type='dashed' danger onClick={open}>
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={"Bạn có chắc muốn xóa bản ghi này?"}
        open={isOpen}
        onCancel={close}
        onOk={() => {
          handleDelete.mutate(id);
          close();
        }}></Modal>
    </>
  );
}
