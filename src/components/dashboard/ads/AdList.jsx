import React, { useState } from 'react';
import { Text, Image, Button, Stack, SimpleGrid, Spacer, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Input, Box } from '@chakra-ui/react';
import dayjs from 'dayjs';

const AdList = ({ ads, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const now = dayjs();

    const filteredAds = ads.filter(ad =>
        ad.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ongoingAds = filteredAds.filter(ad => dayjs(ad.startDate).isBefore(now) && dayjs(ad.endDate).isAfter(now));
    const futureAds = filteredAds.filter(ad => dayjs(ad.startDate).isAfter(now));
    const pastAds = filteredAds.filter(ad => dayjs(ad.endDate).isBefore(now));

    const renderAds = (ads) => (
        <SimpleGrid minChildWidth="300px" spacing={4}>
            {ads.map((ad, index) => (
                <Stack key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} display="flex" flexDirection="column" height="100%" maxW={"450px"}>
                    <Text fontSize="xl" fontWeight="bold">Title: {ad.text}</Text>
                    <Text maxWidth="300px" whiteSpace="normal" wordBreak="break-word">Description: {ad.description}</Text>
                    <Text>Start Date: {ad.startDate}</Text>
                    <Text>End Date: {ad.endDate}</Text>
                    <Image src={ad.image} alt="Ad" boxSize="200px" overflow={"hidden"} />
                    <Spacer />
                    <Stack direction="row" spacing={4} mt={4}>
                        <Button colorScheme="yellow" onClick={() => onEdit(ad)}>Edit</Button>
                        <Button colorScheme="red" onClick={() => onDelete(ad)}>Delete</Button>
                    </Stack>
                </Stack>
            ))}
        </SimpleGrid>
    );

    return (
        <>
            <Input
                placeholder="Search ads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={4}
            />
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            <Text fontSize="2xl" fontWeight="bold">Ongoing Ads</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {renderAds(ongoingAds)}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            <Text fontSize="2xl" fontWeight="bold">Future Ads</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {renderAds(futureAds)}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            <Text fontSize="2xl" fontWeight="bold">Past Ads</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {renderAds(pastAds)}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default AdList;