
import { Image, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";

const SubscriptionCarousel = () => {

    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    return (<Carousel
        centerMode={false}
        containerClass="container"
        autoPlay
        autoPlaySpeed={5000}
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        responsive={{
            desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
            },
            mobile: {
                breakpoint: {
                    max: 464,
                    min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
            },
            tablet: {
                breakpoint: {
                    max: 1024,
                    min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
            }
        }}
        slidesToSlide={1}
    >
        <Stack h={"100%"} p={16}>
            <Image objectFit={"fill"} src="assets/beans.png" alt="Subscription 1" />
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"3xl"}>1.</Text>
            <Text textAlign={"center"} fontSize={"3xl"}>Escolha seu cafe</Text>
        </Stack>
        <Stack p={16}>
            <Image src="assets/cashless.png" alt="Subscription 1" />
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"3xl"}>2.</Text>
            <Text textAlign={"center"} fontSize={"3xl"}>Cadastre seu metodo de pagmento</Text>
        </Stack>
        <Stack p={16}>
            <Image src="assets/open-box.png" alt="Subscription 1" />
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"3xl"}>3.</Text>
            <Text textAlign={"center"} fontSize={"3xl"}>Nos preparamos seu kit com carinho</Text>
        </Stack>
        <Stack p={16}>
            <Image src="assets/home.png" alt="Subscription 1" />
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"3xl"}>4.</Text>
            <Text textAlign={"center"} fontSize={"3xl"}>Receba todo mes em sua casa </Text>
        </Stack>
    </Carousel>
    );
};

export default SubscriptionCarousel;