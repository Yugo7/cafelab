import React from 'react';
import {Box, Button, Stack, useDisclosure} from "@chakra-ui/react";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon,  } from 'react-share';
import CheckIcon from "@mui/icons-material/Check";
import LinkIcon from "@mui/icons-material/Link";


const ShareButtons = ({ url, title }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({
                title: "Link copied to clipboard!",
                status: "success",
                duration: 6000,
                isClosable: true,
                position: "bottom-right",
                icon: <CheckIcon />
            });
        }).catch(() => {
            console.log("Failed to copy");
        });
    };

    return (
        <Stack direction="row" spacing={4}>
            <FacebookShareButton url={url} quote={title}>
                <Button leftIcon={<FacebookIcon size={32} round />} colorScheme="facebook">
                    Share on Facebook
                </Button>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                <Button leftIcon={<TwitterIcon size={32} round />} colorScheme="twitter">
                    Share on Twitter
                </Button>
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title}>
                <Button leftIcon={<LinkedinIcon size={32} round />} colorScheme="linkedin">
                    Share on LinkedIn
                </Button>
            </LinkedinShareButton>
        </Stack>
    );
};

export default ShareButtons;