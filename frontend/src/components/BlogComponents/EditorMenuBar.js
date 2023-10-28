import React from "react";
import {
    FaBold,
    FaHeading,
    FaItalic,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaStrikethrough,
    FaUnderline,
    FaUndo
} from 'react-icons/fa';
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
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is_active" : ""}
                ><FaBold /></button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is_active" : ""}
                >
                    <FaItalic />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "is_active" : ""}
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is_active" : ""}
                >
                    <FaStrikethrough />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 }) ? "is_active" : ""
                    }
                >
                    <FaHeading />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 }) ? "is_active" : ""
                    }
                >
                    <FaHeading className="heading3" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "is_active" : ""}
                >
                    <FaListUl />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "is_active" : ""}
                >
                    <FaListOl />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive("blockquote") ? "is_active" : ""}
                >
                    <FaQuoteLeft />
                </button>
                <button
                    onClick={addImage}
                >
                    <BiImageAdd />
                </button>
                <button onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editor.isActive('highlight') ? 'is_active' : ''} >
                    <AiOutlineHighlight />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is_active' : ''}>
                    <AiOutlineAlignLeft />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is_active' : ''}>
                    <AiOutlineAlignCenter />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is_active' : ''}>
                    <AiOutlineAlignRight />
                </button>
                <button onClick={addYoutubeVideo}>
                    <AiOutlineYoutube />
                </button>
            </div>
            <div>
                <button onClick={() => editor.chain().focus().undo().run()}>
                    <FaUndo />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                    <FaRedo />
                </button>
            </div>
        </div>
    )
}

export default EditorMenuBar