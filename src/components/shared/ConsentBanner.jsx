import { Box, Button,Link, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ConsentBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [consent, setConsent] = useState(false);

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
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              <Link color={"blue"} ml={4} href={"/consent"}>Open terms here</Link>
              <Button colorScheme="blue" ml="4" onClick={handleConsent}>
              Agree and Close
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ConsentBanner;