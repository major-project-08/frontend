import { Editor, EditorProvider, Toolbar, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, BtnClearFormatting } from 'react-simple-wysiwyg'
import { useState } from 'react'
import { BtnBold, BtnItalic, BtnUndo, BtnRedo, Separator } from 'react-simple-wysiwyg'
function RichTextEditor() {
    const [value, setValue] = useState()
    return (
        <div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => setValue(e.target.value)}>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor