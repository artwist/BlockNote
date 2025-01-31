import { Block } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "../../../packages/react/dist/style.css";
import { useState } from "react";

import "./styles.css";

export default function App() {
  // Stores the selected blocks as an array of Block objects.
  const [blocks, setBlocks] = useState<Block[]>([]);
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Select different blocks to see the JSON change below",
      },
      {
        type: "paragraph",
      },
    ],
  });

  // Renders the editor instance.
  return (
    <div className={"wrapper"}>
      <div>BlockNote Editor:</div>
      <div className={"item"}>
        <BlockNoteView
          editor={editor}
          onSelectionChange={() => {
            const selection = editor.getSelection();

            // Get the blocks in the current selection and store on the state. If
            // the selection is empty, store the block containing the text cursor
            // instead.
            if (selection !== undefined) {
              setBlocks(selection.blocks);
            } else {
              setBlocks([editor.getTextCursorPosition().block]);
            }
          }}
        />
      </div>
      <div>Selection JSON:</div>
      <div className={"item bordered"}>
        <pre>
          <code>{JSON.stringify(blocks, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
