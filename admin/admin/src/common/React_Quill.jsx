import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function DescriptionEditor() {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="no-api-key"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue=""
      init={{
        height: 400,
        menubar: false,
        plugins: "lists",
        toolbar:
          "undo redo | formatselect | " +
          "bold italic underline strikethrough | " +
          "bullist numlist | removeformat",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}