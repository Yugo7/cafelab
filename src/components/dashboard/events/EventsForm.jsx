import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Textarea, Stack } from '@chakra-ui/react';
import eventService from '@/services/eventService.js';


const EventForm = ({ event, onSave, onClose }) => {
    const [formData, setFormData] = useState(event || {});
    const [promoImageFile, setPromoImageFile] = useState(null);
    const [postImageFile, setPostImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'promoImageFile') {
            setPromoImageFile(files[0]);
        } else if (name === 'postImageFile') {
            setPostImageFile(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (promoImageFile) {
            formData.promoImageFile = promoImageFile;
        }

        if (postImageFile) {
            formData.postImageFile = postImageFile;
        }

        console.log('Form data:', formData);
        await eventService.createEvent(formData);
        onSave(formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl isRequired>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input type="text" name="name" id="name" value={formData.name || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="local">Place</FormLabel>
                    <Input type="text" name="local" id="local" value={formData.local || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input type="date" name="date" id="date" value={formData.date || ''} onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="promoImageFile">Promotional Image</FormLabel>
                    <Input type="file" name="promoImageFile" id="promoImageFile" onChange={handleFileChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="postImageFile">Post Event Image</FormLabel>
                    <Input type="file" name="postImageFile" id="postImageFile" onChange={handleFileChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="instagramUrl">Instagram Link</FormLabel>
                    <Input type="url" name="instagramUrl" id="instagramUrl" value={formData.instagramUrl || ''} onChange={handleChange} />
                </FormControl>
                <Button type="submit" colorScheme="blue">Save</Button>
            </Stack>
        </form>
    );
};

export default EventForm;