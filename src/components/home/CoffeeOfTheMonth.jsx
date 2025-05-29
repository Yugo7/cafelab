import { Box, Button, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel"; // Install this package using `npm install react-responsive-carousel`
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Add the default styles

export const CoffeeOfTheMonth = ({ t, navigate, fontHl }) => {
    return (
        <Box
            width="100%"  // Ensures the box spans the full width of the screen
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative" // Allows positioning of text over the images
            bgSize="cover"
            bgPosition="center"
            Height="500px" // Set the maximum height for the image
        >
            <Carousel
                autoPlay
                infiniteLoop
                interval={5000} // Adjust the interval between slides
                showThumbs={false} // Hide the thumbnail previews
                showStatus={false} // Hide the current slide number
                dynamicHeight={false} // Disable dynamic height for uniformity
            >
                {/* Slide 1 */}
                <Box position="relative">
                    <Image
                        src="assets/boutiqueHome.jpg"
                        alt="Coffee of the Month 1"
                        objectFit="fill"
                        width="100%"
                        maxHeight="500px" // Set the maximum height for the image
                    />
                    <Box
                        position="absolute"
                        bottom="0"
                        left="50%"
                        transform="translateX(-50%)"
                        textAlign="center"
                        color="white"
                        px={4}
                        py={6}
                        width="100%" // Ensures the text box spans the full width
                        bg="rgba(0, 0, 0, 0.5)" // Semi-transparent background for text readability
                    >
                    </Box>
                </Box>

                {/* Slide 2 */}
                <Box position="relative">
                    <Image
                        src="assets/EcobagHome.jpg"
                        alt="Coffee of the Month 2"
                        borderRadius="lg"
                        objectFit="fill"
                        width="100%"
                        maxHeight="500px" // Set the maximum height for the image
                    />
                    <Box
                        position="absolute"
                        bottom="0"
                        left="50%"
                        transform="translateX(-50%)"
                        textAlign="center"
                        color="white"
                        px={4}
                        py={6}
                        width="100%" // Ensures the text box spans the full width
                        bg="rgba(0, 0, 0, 0.5)" // Semi-transparent background for text readability
                    >
                    </Box>
                </Box>

                {/* Slide 3 */}
                <Box position="relative">
                    <Image
                        src="assets/subscricao.jpg"
                        alt="Coffee of the Month 3"
                        borderRadius="lg"
                        objectFit="fill"
                        width="100%"
                        height={"100%"}
                        maxHeight="500px" // Set the maximum height for the image
                    />
                    <Box
                        position="absolute"
                        bottom="0"
                        left="50%"
                        transform="translateX(-50%)"
                        textAlign="center"
                        color="white"
                        px={4}
                        py={6}
                        width="100%" // Ensures the text box spans the full width
                        bg="rgba(0, 0, 0, 0.5)" // Semi-transparent background for text readability
                    >
                    </Box>
                </Box>
            </Carousel>

            <Button
                size="lg"
                bgColor={"#ADDCC8"}
                onClick={() => navigate('/boutique')}
                maxW={"md"}
                alignSelf={"center"}
                position="absolute"
                bottom={6} // Adjusts the position of the button at the bottom of the viewport
            >
                {t('hero.ctaButton')}
            </Button>
        </Box>
    );
};
