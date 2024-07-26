import { EyeIcon, PlusIcon } from "@/assets";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

export default function AccountModal({ username }: { username?: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return username ? (
    <>
      <Button
        onPress={onOpen}
        variant='light'
        isIconOnly
        title='Chỉnh sửa'
        className='hover:text-primary'>
        <EyeIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label='Email'
                  placeholder='Enter your email'
                  variant='bordered'
                />
                <Input
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  variant='bordered'
                />
                <div className='flex py-2 px-1 justify-between'>
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}>
                    Remember me
                  </Checkbox>
                  <Link color='primary' href='#' size='sm'>
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  ) : (
    <>
      <Button onPress={onOpen} color='primary' startContent={<PlusIcon />}>
        Thêm tài khoản
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label='Email'
                  placeholder='Enter your email'
                  variant='bordered'
                />
                <Input
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  variant='bordered'
                />
                <div className='flex py-2 px-1 justify-between'>
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}>
                    Remember me
                  </Checkbox>
                  <Link color='primary' href='#' size='sm'>
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
