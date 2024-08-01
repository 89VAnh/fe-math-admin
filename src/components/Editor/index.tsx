// components/custom-editor.js
"use client"; // only in App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  AutoImage,
  AutoLink,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  FontColor,
  FontSize,
  Heading,
  Highlight,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  ListProperties,
  Paragraph,
  Strikethrough,
  Table,
  TableCaption,
  Underline,
} from "ckeditor5";
import MathField from "./MathField";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import "ckeditor5/ckeditor5.css";
import { useRef, useState } from "react";
import MathLive from "./plugins/MathLive";

type EditorRef = {
  editor?: ClassicEditor;
};

function Editor({
  initialData,
  setValue,
}: {
  initialData?: string;
  setValue: (value: string) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [latex, setLatex] = useState("");
  const editorRef = useRef<EditorRef>({});

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        onReady={(editor) => {
          editorRef.current = { editor };
        }}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "fontColor",
              "fontSize",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "link",
              "math",
              "|",
              "highlight",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "alignment",
              "|",
              "imageUpload",
              "blockQuote",
              "insertTable",
              "|",
              "mathLive",
            ],
          },

          language: "vi",
          image: {
            toolbar: [
              "imageTextAlternative",
              "toggleImageCaption",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
            ],
          },
          plugins: [
            Alignment,
            AutoImage,
            AutoLink,
            BlockQuote,
            Bold,
            Essentials,
            FontColor,
            FontSize,
            Heading,
            Highlight,
            Image,
            ImageCaption,
            ImageInsert,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Italic,
            Link,
            List,
            ListProperties,
            Paragraph,
            Strikethrough,
            Table,
            TableCaption,
            Underline,
            MathLive,
          ],
          initialData,
          // @ts-ignore
          mathLive: {
            handleMathLive: onOpen,
          },
        }}
        onChange={(event, editor) => {
          setValue(editor.getData() as string);
        }}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Math Live
              </ModalHeader>
              <ModalBody>
                <MathField value={latex} setValue={setLatex} />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color='primary'
                  onPress={() => {
                    onClose();
                    editorRef.current.editor?.model.change((writer) => {
                      const insertPosition =
                        editorRef.current.editor?.model.document.selection.getFirstPosition();
                      // @ts-ignore
                      writer.insertText(latex, insertPosition);
                    });
                  }}>
                  Ghi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Editor;
