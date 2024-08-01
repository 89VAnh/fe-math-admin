import { DeleteIcon } from "@/assets";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function DeleteModal({
  id,
  title,
  useDelete,
  searchMutate,
}: {
  id: string | number;
  title: string;
  useDelete: any;
  searchMutate: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { trigger, isMutating } = useDelete();

  return (
    <>
      <Button
        onPress={onOpen}
        variant='light'
        isIconOnly
        title='Chỉnh sửa'
        className='hover:text-red'>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Xác nhận xoá {title}
              </ModalHeader>
              <ModalBody>Bạn có chắc chắn muốn xoá {title} này?</ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Huỷ
                </Button>
                <Button
                  color='primary'
                  isLoading={isMutating}
                  onPress={() => {
                    trigger(id).then(() => searchMutate());
                    onClose();
                  }}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
