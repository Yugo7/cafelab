
import { Box, Button, Text } from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import {useTranslation} from "react-i18next";

const ImagePanel = ({ imageUrl }) => {
    const { t } = useTranslation();
    
    return (
        <Box
            width={{ base: '100%', md: '50%' }}
            height="400px"
            backgroundImage={imageUrl}
            backgroundSize="cover"
            backgroundPosition="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="white"
            textAlign="center"
        >
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
                {t('home.springMenu')}
            </Text>
            <Text fontSize="xl" mb={8}>
                {t('home.refreshingDrinks')}
            </Text>
            <Button
                leftIcon={<FiBook />}
                onClick={() => navigate('/menu')}
                size="lg"
                height="48px"
                width="200px"
                border="2px"
                variant="solid"
                backgroundColor="blackAlpha.800"
                color="antiquewhite"
            >
                {t('home.menuButton')}
            </Button>
        </Box>
    );
};

export default ImagePanel;