import { PlusIcon } from "@/assets";
import { uploadFile } from "@/lib/uploade.action";
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
import { useState } from "react";
import Editor from "../Editor";
import Transfer from "../Transfer";

export default function CreateModal<T>({
  title,
  useCreate,
  searchMutate,
  formItems,
}: {
  title: string;
  useCreate: any;
  searchMutate: any;
  formItems: any[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState({});
  const { trigger, isMutating } = useCreate();
  const [transferData, setTransferData] = useState<number[]>([]);

  const handleCreate = async (formData: FormData, onClose: any) => {
    const payload: any = {
      ...Object.fromEntries(formData),
      ...data,
      questions: transferData,
    };
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
    if (formItem?.isPrimary && formItem?.hidden !== false)
      return <div key={formItem.key}></div>;
    if (formItem?.options)
      return (
        <Select
          label={formItem?.label}
          placeholder={formItem?.label}
          name={formItem.key}
          key={formItem.key}
          labelPlacement='outside'
          isRequired
          required>
          {formItem?.options.map((option: { label: string; value: string }) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      );
    if (formItem.type === "latex")
      return (
        <>
          <h3>{formItem?.label} :</h3>
          <Editor
            setValue={(value: string) =>
              setData((prev) => ({
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
          <Transfer setTransferData={setTransferData} />
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
        variant='bordered'
        name={formItem.key}
        key={formItem.key}
        isRequired
        required
        type={formItem?.type || "text"}
        endContent={formItem?.endContent}
        labelPlacement='outside'
        className={formItem?.className}
        max={formItem?.max}
        min={formItem?.min}
      />
    );
  };

  return (
    <>
      <Button onPress={onOpen} color='primary' startContent={<PlusIcon />}>
        Thêm {title}
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
                Thêm {title}
              </ModalHeader>
              <form
                action={(formData: FormData) =>
                  handleCreate(formData, onClose)
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
                    Thêm
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
