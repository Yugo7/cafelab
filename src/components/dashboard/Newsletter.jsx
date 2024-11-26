import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import SidebarWithHeader from "@/components/shared/SideBar.jsx";
import Editor from '@/components/shared/editor/Editor.jsx';
import {Stack} from "react-bootstrap";

export default function Newsletter() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Content:', content);
    // Handle form submission logic here
    toast({
      title: "Newsletter created.",
      description: "Your newsletter has been successfully created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <SidebarWithHeader>
      <Box p={6} maxW="600px" mx="auto">
        <form onSubmit={handleSubmit}>
          <FormControl id="title" mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormControl>
          <Box>
            <Editor content={content} setContent={setContent} />
          </Box>
          <Button type="submit" colorScheme="teal" width="full">Create Newsletter</Button>
        </form>
      </Box>
    </SidebarWithHeader>
  );
}