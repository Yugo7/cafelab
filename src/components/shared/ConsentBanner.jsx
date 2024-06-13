import { Box, Button,Link, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const ConsentBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [consent, setConsent] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consentValue = localStorage.getItem("dataConsent");
    if (!consentValue) {
      onOpen();
    } else {
      setConsent(JSON.parse(consentValue));
    }
  }, [onOpen]);

  const handleConsent = () => {
    setConsent(true);
    localStorage.setItem("dataConsent", true);
    onClose();
  };

  return (
    <>
      {isOpen && !consent && (
        <Box position="fixed" bottom="0" width="100%" bg="gray.200" p="4">
          <Box maxW="container.md" mx="auto">
            {t('consentBanner.message')}
            <Link color={"blue"} ml={4} href={"/consent"}>{t('consentBanner.linkText')}</Link>
            <Button colorScheme="blue" ml="4" onClick={handleConsent}>
              {t('consentBanner.buttonText')}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ConsentBanner;