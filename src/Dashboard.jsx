import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Box, Button, Stack, Text} from "@chakra-ui/react";

const Dashboard = () => {

    return (
        <SidebarWithHeader>
            <div id="cafeCarousel" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Stack justify="flex-start" align="center" spacing="24px">
                            <img src="assets/phimg.jpg" className="d-block w-100" alt="..."></img>
                            <Text fontFamily="Inter" fontWeight="extrabold" fontSize="82px" letterSpacing="-0.08em" color="#FFFFFF">
                                <span>Cafe.</span>
                                <Box as="span" color="#FFFFFF" ml={2}>
                                    Lab.
                                </Box>
                            </Text>
                            <Text fontFamily="Inter" lineHeight="1.48" fontWeight="regular" fontSize="21px" letterSpacing="-0.02em" color="#FFFFFF"
                                  alignSelf="stretch" textAlign="center">
                                Uma nova loja! O seu novo café!
                                A primeira loja de café de especialidade de Oeiras.
                            </Text>
                        </Stack>
                    </div>
                    <div className="carousel-item">
                        <img src="assets/phimg.jpg" className="d-block w-100" alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img src="assets/logo.png" className="d-block w-100" alt="..."></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#cafeCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#cafeCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </SidebarWithHeader>)
}

export default Dashboard;