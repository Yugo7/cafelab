import React from 'react';
import {
    AbsoluteCenter, Avatar,
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex, HStack,
    Icon,
    IconButton,
    Image,
    Link, Spacer,
    Text,
    useColorModeValue,
    useDisclosure, VStack
} from '@chakra-ui/react';

import {useNavigate} from 'react-router-dom';

import {FiCalendar, FiHome, FiMail, FiMenu, FiPackage} from 'react-icons/fi';

import {MdCoffee} from 'react-icons/md';
import Footer from "./Footer.jsx";
import {FaShoppingCart, FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {Stack} from "react-bootstrap";
import {FaA} from "react-icons/fa6";
import {useAuth} from "../context/AuthContext.jsx";

const LinkItems = [
    {name: 'Home', route: '/', icon: FiHome},
    {name: 'Subscrição', route: '/subscricao', icon: FiPackage},
    {name: 'Boutique', route: '/boutique', icon: MdCoffee},
    {name: 'Agenda', route: '/agenda', icon: FiCalendar},
    {name: 'Política de retorno', route: '/reembolso', icon: FaA},
];

export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Flex minH="100vh" bg={useColorModeValue('white', 'gray.900')} direction="column">
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}>
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen}/>
            <Box gap={4}>
                {children}
                <Footer>
                </Footer>
            </Box>
        </Flex>

    );
}
const SidebarContent = ({onClose}) => {
    const navigate = useNavigate();
    const {customer, logOut} = useAuth();
    return (
        <>
            <Flex h="100%" flexDirection="column" justifyContent="space-between">
                <Flex direction="column" alignItems="center" mx="8">
                    <CloseButton my={8} onClick={onClose}/>
                    <Image
                        maxHeight={"70px"}
                        src='assets/logo.png'
                        alt='Cafelab'
                        onClick={() => navigate('/')}
                    />
                    <Text className={"cafelab"} mb={10} mt={4} fontSize="3xl">
                        CAFELAB
                    </Text>
                    {LinkItems.map((link) => (
                        <NavItem key={link.name} route={link.route} icon={link.icon}>
                            {link.name}
                        </NavItem>
                    ))}
                </Flex>
                <Flex direction="column" justifyContent="center" margin={"auto"} mx="8">
                    {customer ?
                        <HStack
                            onClick={() => navigate('/')}>
                            <Text>Logout</Text>
                                <IconButton
                                    icon={<FaSignOutAlt/>}
                                    onClick={logOut} aria-label={"logout"}>
                                    Sign out
                                </IconButton>
                        </HStack>
                        :
                        <Stack direction={"horizontal"} alignSelf={"center"} mb={8}
                               onClick={() => navigate('/login')}>
                            Login
                            <IconButton
                                size="lg"
                                variant="ghost"
                                aria-label="log in"
                                icon={<FaSignInAlt/>}
                            />
                        </Stack>
                    }
                </Flex>
            </Flex>
        </>
    );
};
const NavItem = ({icon, route, children, ...rest}) => {
    return (
        <Link href={route} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'blue.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({onOpen, ...rest}) => {
    const navigate = useNavigate();
    const {cartQuantity, openCart} = useShoppingCart()

    return (
        <Flex
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'space-between'}}
            {...rest}>

            <IconButton
                ml={{base: 4, md: 60}}
                onClick={onOpen}
                variant="ghost"
                aria-label="open menu"
                icon={<FiMenu/>}
            />
            <AbsoluteCenter axis='horizontal'>
                <Image
                    height={"16"}
                    margin='auto'
                    src='assets/logo.png'
                    alt='CafeLab'
                    onClick={() => navigate('/')}
                />
            </AbsoluteCenter>
            <IconButton
                mr={{base: 4, md: 60}}
                size="lg"
                variant="ghost"
                aria-label="log in"
                icon={<FaShoppingCart/>}
                onClick={openCart}
            >
                <Stack
                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                        color: "white",
                        width: "1.5rem",
                        height: "1.5rem",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        transform: "translate(25%, 25%)",
                    }}
                >
                    {cartQuantity}
                </Stack>
            </IconButton>
        </Flex>
    );
};