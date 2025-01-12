import React, { useState } from 'react';
import { useCurrentEditor, EditorProvider } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { FiBold, FiItalic, FiList, FiImage } from 'react-icons/fi';
import { FaListOl } from "react-icons/fa6";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5 } from "react-icons/lu";
import { Button, Divider, HStack, Input } from "@chakra-ui/react";

const TAB_CHAR = '\u0009';
const TabHandler = Extension.create({
    name: 'tabHandler',
    addKeyboardShortcuts() {
        return {
            Tab: ({ editor }) => {
                editor
                    .chain()
                    .sinkListItem('listItem')
                    .command(({ tr }) => {
                        tr.insertText(TAB_CHAR);
                        return true;
                    })
                    .run();
                return true;
            },
        };
    },
});

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: true,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: true,
        },
    }),
    Image.configure({ inline: true }), // Configure Image extension to be inline
    TabHandler,
];

export const MenuBar = () => {
    const { editor } = useCurrentEditor();
    const [imageUrl, setImageUrl] = useState('');

    if (!editor) {
        return null;
    }

    const insertImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');
        }
    };

    return (
        <>
            <HStack className="tiptap_buttons" wrap={"wrap"}>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={editor.isActive("bold") ? "is-active" : ""}
                >
                    <FiBold/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={editor.isActive("italic") ? "is-active" : ""}
                >
                    <FiItalic/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
                >
                    <LuHeading1/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
                >
                    <LuHeading2/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
                >
                    <LuHeading3/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
                >
                    <LuHeading4/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
                >
                    <LuHeading5/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    <FiList/>
                </Button>
                <Button bgColor={"transparent"}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive("orderedList") ? "is-active" : ""}
                >
                    <FaListOl/>
                </Button>
                <Input
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    size="sm"
                    width="auto"
                />
                <Button bgColor={"transparent"} onClick={insertImage}>
                    <FiImage/>
                </Button>
            </HStack>
            <Divider/>
        </>
    );
};

const Editor = ({ content, setContent }) => {
    return (
        <EditorProvider
            onUpdate={({ editor }) => {
                setContent(editor.getHTML());
            }}
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={content}
        ></EditorProvider>
    );
};

export default Editor;