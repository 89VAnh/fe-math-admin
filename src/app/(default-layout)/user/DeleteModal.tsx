import { DeleteIcon } from "@/assets";
import { delLoginFetcher } from "@/helper/fetcher/account.fetcher";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import useSWR from "swr";

export default function DeleteModal({ username }: { username: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isUpdate, setIsUpdate] = useState(false);

  const { isLoading } = useSWR(isUpdate ? username : null, delLoginFetcher, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

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
                Xác nhận xoá dữ liệu
              </ModalHeader>
              <ModalBody>Bạn có chắc chắn muốn xoá tài khoản này?</ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Huỷ
                </Button>
                <Button
                  color='primary'
                  isLoading={isLoading}
                  onPress={() => {
                    setIsUpdate(true);
                    console.log(123);
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
