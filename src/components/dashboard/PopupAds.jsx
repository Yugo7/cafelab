import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Image,
    useToast,
    Text
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import SidebarWithHeader from "../shared/SideBar.jsx";
import AdList from "./ads/AdList.jsx";

const PopupAds = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [currentCampaign, setCurrentCampaign] = useState({ id: '', text: '', image: '', duration: '', startDate: '', endDate: '' });
    const toast = useToast();

    useEffect(() => {
        // Load campaigns from local storage or API
        const savedCampaigns = [
            {
                "id": "1",
                "text": "Campaign 1",
                "image": "/assets/1.png",
                "duration": "10",
                "startDate": "2023-10-01",
                "endDate": "2023-10-11"
            },
            {
                "id": "2",
                "text": "Campaign 2",
                "image": "/assets/1.png",
                "duration": "5",
                "startDate": "2023-11-01",
                "endDate": "2023-11-06"
            },
            {
                "id": "3",
                "text": "Campaign 3",
                "image": "/assets/1.png",
                "duration": "7",
                "startDate": "2023-12-01",
                "endDate": "2023-12-08"
            },
            {
                "id": "4",
                "text": "Campaign 3",
                "image": "/assets/2.png",
                "duration": "7",
                "startDate": "2024-12-15",
                "endDate": "2024-12-18"
            },
            {
                "id": "5",
                "text": "Campaign 3",
                "image": "/assets/3.png",
                "duration": "7",
                "startDate": "2025-12-15",
                "endDate": "2025-12-18"
            }
        ];
        setCampaigns(savedCampaigns);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCampaign({ ...currentCampaign, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentCampaign({ ...currentCampaign, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSaveCampaign = () => {
        if (currentCampaign.id) {
            // Update existing campaign
            setCampaigns(campaigns.map(c => c.id === currentCampaign.id ? currentCampaign : c));
            toast({ title: 'Campaign updated', status: 'success', duration: 3000, isClosable: true });
        } else {
            // Create new campaign
            const newCampaign = { ...currentCampaign, id: uuidv4() };
            setCampaigns([...campaigns, newCampaign]);
            toast({ title: 'Campaign created', status: 'success', duration: 3000, isClosable: true });
        }
        setCurrentCampaign({ id: '', text: '', image: '', duration: '', startDate: '', endDate: '' });
        localStorage.setItem('campaigns', JSON.stringify([...campaigns, currentCampaign]));
    };

    const handleEditCampaign = (id) => {
        const campaign = campaigns.find(c => c.id === id);
        setCurrentCampaign(campaign);
    };

    const handleDeleteCampaign = (id) => {
        const updatedCampaigns = campaigns.filter(c => c.id !== id);
        setCampaigns(updatedCampaigns);
        localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
        toast({ title: 'Campaign deleted', status: 'success', duration: 3000, isClosable: true });
    };

    return (
        <SidebarWithHeader>
            <Box p={5}>
                <FormControl>
                    <FormLabel>Text</FormLabel>
                    <Textarea name="text" value={currentCampaign.text} onChange={handleInputChange} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Image</FormLabel>
                    <Input type="file" onChange={handleImageChange} />
                    {currentCampaign.image && <Image src={currentCampaign.image} alt="Campaign" mt={2} />}
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Duration (in days)</FormLabel>
                    <Input name="duration" value={currentCampaign.duration} onChange={handleInputChange} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Start Date</FormLabel>
                    <Input name="startDate" value={currentCampaign.startDate} onChange={handleInputChange} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>End Date</FormLabel>
                    <Input name="endDate" value={currentCampaign.endDate} onChange={handleInputChange} />
                </FormControl>
                <Button mt={4} colorScheme="teal" onClick={handleSaveCampaign}>
                    {currentCampaign.id ? 'Update Campaign' : 'Create Campaign'}
                </Button>

                <Box mt={8}>
                    <AdList ads={campaigns} onEdit={handleEditCampaign} onDelete={handleDeleteCampaign} />
                </Box>
            </Box>
        </SidebarWithHeader>
    );
};

export default PopupAds;