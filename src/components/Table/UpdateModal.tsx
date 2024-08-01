import { EyeIcon, PlusIcon } from "@/assets";
import { uploadFile } from "@/lib/uploade.action";
import { Test } from "@/types/Test";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Editor from "../Editor";
import Transfer from "../Transfer";

export default function UpdateModal<T>({
  item,
  title,
  useUpdate,
  searchMutate,
  formItems,
}: {
  item: T;
  title: string;
  useUpdate: any;
  searchMutate: any;
  formItems: any[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState(() => {
    const data: any = {};
    for (const formItem of formItems) {
      if (formItem.type === "latex") {
        data[formItem.key] = item[formItem.key as keyof T] as string;
      }
    }
    return data;
  });
  const { trigger, isMutating } = useUpdate();
  const [transferData, setTransferData] = useState<number[]>(
    (item as Test).questions
  );
  const [levelId, setLevelId] = useState<number>();

  const handleUpdate = async (formData: FormData, onClose: any) => {
    const payload: any = {
      ...Object.fromEntries(formData),
      ...data,
    };
    if (transferData) {
      payload.questions = transferData;
    }
    if (formData.has("image")) {
      const file = formData.get("image") as File;
      const dataFile = await uploadFile({ file });
      payload.image = dataFile?.path;
    }

    trigger(payload).then(() => {
      searchMutate();
      onClose();
    });
  };

  const renderFormItem = (formItem: any): React.ReactNode => {
    if (formItem?.isPrimary)
      return (
        <Input
          name={formItem.key}
          key={formItem.key}
          value={item[formItem.key as keyof T] as string}
          className={formItem.hidden == false ? "" : "hidden"}
          readOnly={!formItem.hidden}
          label={formItem?.label}
          variant='bordered'
          labelPlacement='outside'
        />
      );
    if (formItem?.options)
      if (formItem.key === "levelId")
        return (
          <Select
            label={formItem?.label}
            placeholder={formItem?.label}
            name={formItem.key}
            key={formItem.key}
            labelPlacement='outside'
            isRequired
            required
            defaultSelectedKeys={[
              (item[formItem.key as keyof T] as string).toString(),
            ]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setLevelId(Number(e.target.value));
            }}>
            {formItem?.options.map(
              (option: { label: string; value: string }) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              )
            )}
          </Select>
        );
      else
        return (
          <Select
            label={formItem?.label}
            placeholder={formItem?.label}
            name={formItem.key}
            key={formItem.key}
            labelPlacement='outside'
            defaultSelectedKeys={[
              (item[formItem.key as keyof T] as string).toString(),
            ]}
            isRequired
            required>
            {formItem?.options.map(
              (option: { label: string | number; value: string | number }) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              )
            )}
          </Select>
        );
    if (formItem.type === "latex")
      return (
        <>
          <h3>{formItem?.label} :</h3>
          <Editor
            initialData={item[formItem.key as keyof T] as string}
            setValue={(value: string) =>
              setData((prev: any) => ({
                ...prev,
                [formItem.key]: value,
              }))
            }
          />
        </>
      );
    if (formItem.type === "transfer")
      return (
        <>
          <h3>{formItem?.label} :</h3>
          <Transfer
            transferData={transferData}
            setTransferData={setTransferData}
            levelId={levelId}
          />
        </>
      );
    if (formItem.type === "image")
      return (
        <Input
          label={formItem?.label}
          name={formItem.key}
          key={formItem.key}
          isRequired
          required
          labelPlacement='outside'
          type='file'
          accept='image/*'
        />
      );

    return (
      <Input
        label={formItem?.label}
        placeholder={formItem?.label}
        variant='bordered'
        name={formItem.key}
        key={formItem.key}
        labelPlacement='outside'
        type={formItem?.type || "text"}
        endContent={formItem?.endContent}
        defaultValue={item[formItem.key as keyof T] as string}
      />
    );
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant='light'
        isIconOnly
        title='Chỉnh sửa'
        className='hover:text-primary'>
        <EyeIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        className='overflow-y-scroll'
        scrollBehavior='inside'
        size={
          formItems.some((formItem) => {
            return formItem.type === "latex" || formItem.type === "transfer";
          })
            ? "5xl"
            : "lg"
        }>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Sửa {title}
              </ModalHeader>
              <form
                action={(formData: FormData) =>
                  handleUpdate(formData, onClose)
                }>
                <ModalBody>
                  {formItems.map((formItem) => {
                    if (Array.isArray(formItem))
                      return (
                        <div
                          key={formItem.reduce(
                            (item, key) => item.key + key,
                            ""
                          )}
                          className='flex gap-4'>
                          {formItem.map(renderFormItem)}
                        </div>
                      );
                    else return renderFormItem(formItem);
                  })}
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='flat' onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color='primary' isLoading={isMutating} type='submit'>
                    Sửa
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
