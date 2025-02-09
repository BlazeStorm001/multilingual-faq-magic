import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface EditorProps {
  onChange: (data: string) => void;
  value: string;
  name?: string;
}

function Editor({ onChange, name, value }: EditorProps) {
  return (
    <div className="min-h-[200px] border rounded-md">
      <CKEditor
        type=""
        name={name}
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo']
        }}
        data={value}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}

export default Editor;