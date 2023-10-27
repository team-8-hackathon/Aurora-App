import React from "react";
import {
    FaBold,
    FaItalic,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaStrikethrough,
    FaUnderline,
    FaUndo
} from 'react-icons/fa';
import { LuHeading1, LuHeading2 } from 'react-icons/lu'
import { BiImageAdd } from 'react-icons/bi'
import {
    AiOutlineHighlight,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineAlignRight,
    AiOutlineYoutube
} from 'react-icons/ai'


const EditorMenuBar = ({ editor }) => {
    if (!editor) return null;
    const addImage = () => {
        const url = window.prompt('Enter image url')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')
    
        if (url) {
          editor.commands.setYoutubeVideo({
            src: url
          })
        }
      }

    return (
        <div className="menuBar">
            <div>
                <button title="Bold" type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is_active editor-menu-button" : "editor-menu-button"}
                ><FaBold /></button>
                <button
                    title='Italic'
                    type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is_active editor-menu-button" : "editor-menu-button"}
                >
                    <FaItalic />
                </button>
                <button
                    title='Underline'
                    type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "is_active editor-menu-button" : "editor-menu-button"}
                >
                    <FaUnderline />
                </button>
                <button
                    title="Strikethrough"
                    type="button" onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is_active editor-menu-button" : "editor-menu-button"}
                >
                    <FaStrikethrough />
                </button>
                <button
                    title="Heading 1"
                    type="button" onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 }) ? "is_active editor-menu-button" : "editor-menu-button"
                    }
                >
                    <LuHeading1 />
                </button>
                <button
                    title="Heading 2"
                    type="button" onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 }) ? "is_active editor-menu-button" : "editor-menu-button"
                    }
                >
                    <LuHeading2 />
                </button>
                <button
                    title="Unordered List"
                    type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "is_active editor-menu-button" : "editor-menu-button"}
                >
                    <FaListUl />
                </button>
                <button
                    title="Ordered List"
                    type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "is_active editor-menu-button" : "editor-menu-button"}
                >
                    <FaListOl />
                </button>
                <button
                    title="Blockquote"
                    type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive("blockquote") ? "is_active editor-menu-button" : "editor-menu-button"}
                >
                    <FaQuoteLeft />
                </button>
                <button
                    title="Image"
                    className="editor-menu-button"
                    type="button" onClick={addImage}
                >
                    <BiImageAdd />
                </button>
                <button
                    title="Highlight"
                    type="button" onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editor.isActive('highlight') ? 'is_active editor-menu-button' : 'editor-menu-button'} >
                    <AiOutlineHighlight />
                </button>
                <button 
                    title="Align Left"
                    type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is_active editor-menu-button' : 'editor-menu-button'}>
                    <AiOutlineAlignLeft />
                </button>
                <button 
                    title="Align Center"
                    type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is_active editor-menu-button' : 'editor-menu-button'}>
                    <AiOutlineAlignCenter />
                </button>
                <button 
                    title="Align Right"
                    type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is_active editor-menu-button' : 'editor-menu-button'}>
                    <AiOutlineAlignRight />
                </button>
                <button 
                    title="Imbed Youtube Video"
                    className="editor-menu-button"
                    type="button" onClick={addYoutubeVideo}>
                    <AiOutlineYoutube />
                </button>
            </div>
            <div>
                <button 
                    title="Undo"
                    className="editor-menu-button"
                    type="button" onClick={() => editor.chain().focus().undo().run()}>
                    <FaUndo />
                </button>
                <button 
                    title="Redo"
                    className="editor-menu-button"
                    type="button" onClick={() => editor.chain().focus().redo().run()}>
                    <FaRedo />
                </button>
            </div>
        </div>
    )
}

export default EditorMenuBar