import React, {useState} from 'react';
import {
    AbsoluteCenter,
    Avatar,
    Badge,
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Link,
    Select,
    Spacer,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';

import {useNavigate} from 'react-router-dom';

import {FiCalendar, FiCoffee, FiHome, FiMenu, FiPackage} from 'react-icons/fi';
import Footer from "./Footer.jsx";
import {FaShoppingCart, FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {Stack} from "react-bootstrap";
import {useAuth} from "../context/AuthContext.jsx";
import {TbPaperBag} from "react-icons/tb";
import {useTranslation} from "react-i18next";

const LinkItems = [
    {name: 'Home', route: '/', icon: FiHome},
    {name: 'Subscrição', route: '/subscricao', icon: FiPackage},
    {name: 'Boutique', route: '/boutique', icon: TbPaperBag},
    {name: 'Menu Primavera', route: '/menu', icon: FiCoffee},
    {name: 'Agenda', route: '/agenda', icon: FiCalendar},
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
                <Flex direction="column" alignItems="center" mx={6}>
                    <CloseButton my={8} onClick={onClose}/>
                    <Image
                        maxHeight={"70px"}
                        src='assets/logo.png'
                        alt='Cafelab'
                        onClick={() => navigate('/')}
                    />
                    <Text className={"cafelab"} mb={4} fontSize="3xl">
                        CAFELAB
                    </Text>
                    {LinkItems.map((link) => (
                        <NavItem key={link.name} route={link.route} icon={link.icon}>
                            {link.name}
                        </NavItem>
                    ))}
                </Flex>
                <Flex direction="column" justifyContent="end" margin={"auto"} mx="8">

                    {customer ?
                        <HStack width="100%">
                            <HStack onClick={() => navigate('/orders')}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <Text>{customer.name}</Text>
                            </HStack>
                            <Spacer/> {/* Add Spacer here */}
                            <HStack onClick={logOut}>
                                <Text>Sign out</Text>
                                <IconButton
                                    icon={<FaSignOutAlt/>}
                                    aria-label={"logout"}>
                                    Sign out
                                </IconButton>
                            </HStack>
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

    const {i18n} = useTranslation();
    const [selectedValue, setSelectedValue] = useState(localStorage.getItem('language') || i18n.language);

    const handleChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedValue(newLanguage);
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };
    return (
        <>
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
                <Flex justifyContent="flex-end" alignItems="center" mr={{base: 4, md: 60}}>
                    <Select w={useBreakpointValue({base: "70px", md: "100px"})} value={selectedValue} onChange={handleChange}>
                        <option value='en'>{useBreakpointValue({base: "🇺🇸", md: "🇺🇸 EN"})}</option>
                        <option value='pt'>{useBreakpointValue({base: "🇵🇹", md: "🇵🇹 PT"})}</option>
                    </Select>
                    <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="shopping cart"
                        icon={<FaShoppingCart/>}
                        onClick={openCart}
                    >
                    </IconButton>
                    <Badge ml={-3}
                    bgColor={"red.400"}
                    color={"white"}>
                        {cartQuantity}
                    </Badge>
                </Flex>
            </Flex>
        </>
    );
};