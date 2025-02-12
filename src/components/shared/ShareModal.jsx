import React, { useState, useEffect } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    useToast, Text, Icon, GridItem, Grid
} from '@chakra-ui/react';
import {
    EmailShareButton, FacebookShareButton, TwitterShareButton,
    TelegramShareButton, LinkedinShareButton, WhatsappShareButton,
    RedditShareButton
} from 'react-share';
import { EmailIcon, FacebookIcon, XIcon, TelegramIcon, LinkedinIcon, WhatsappIcon, RedditIcon } from 'react-share';
import { FaLink } from "react-icons/fa6";

const ShareModal = ({ isOpen, onClose }) => {
    const [currentUrl, setCurrentUrl] = useState("");
    const toast = useToast();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href || "");
        }
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({ title: 'Copiado com sucesso!', status: 'success', duration: 3000, isClosable: true });
        }).catch(() => {
            console.log("Failed to copy");
        });
    };

    const socialIcons = [
        { component: EmailShareButton, icon: EmailIcon, label: "Email" },
        { component: FacebookShareButton, icon: FacebookIcon, label: "Facebook" },
        { component: TwitterShareButton, icon: XIcon, label: "X" },
        { component: TelegramShareButton, icon: TelegramIcon, label: "Telegram" },
        { component: LinkedinShareButton, icon: LinkedinIcon, label: "LinkedIn" },
        { component: WhatsappShareButton, icon: WhatsappIcon, label: "Whatsapp" },
        { component: RedditShareButton, icon: RedditIcon, label: "Reddit" }
    ];

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Compartilhe!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid my={6} justifyItems={"center"} templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }}>
                            <GridItem alignItems={"center"} justifyItems={"center"}>
                                <Icon onClick={handleCopyLink} as={FaLink} boxSize={ 7 } borderRadius={"full"}/>
                                <Text>Copiar link</Text>
                            </GridItem>
                            {socialIcons.map((social, index) => {
                                const ShareButtonComponent = social.component;
                                return (
                                    <GridItem key={index}>
                                        <ShareButtonComponent url={currentUrl}>
                                            <Icon as={social.icon} boxSize={ 8 } borderRadius={"full"}/>
                                            <Text>{social.label}</Text>
                                        </ShareButtonComponent>
                                    </GridItem>
                                );
                            })}
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ShareModal;