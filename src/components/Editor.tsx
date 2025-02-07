import React, { useEffect, useRef } from "react";

interface EditorProps {
  onChange: (data: string) => void;
  value: string;
  name?: string;
}

function Editor({ onChange, name, value }: EditorProps) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = React.useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <div className="min-h-[200px] border rounded-md">
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={{
            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo']
          }}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div className="p-4">Editor loading...</div>
      )}
    </div>
  );
}

export default Editor;