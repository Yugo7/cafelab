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
import logo from '/assets/logo.png';

import {useNavigate} from 'react-router-dom';

import {FiCalendar, FiCoffee, FiHome, FiMenu, FiPackage} from 'react-icons/fi';
import Footer from "./Footer.jsx";
import {FaShoppingCart, FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {Stack} from "react-bootstrap";
import {useAuth} from "../context/AuthContext.jsx";
import {TbPaperBag} from "react-icons/tb";
import {useTranslation} from "react-i18next";


export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            <Box className="sidebar-with-header" height={"80px"}>
                <Flex bg={useColorModeValue('white', 'gray.900')} direction="column">
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
                </Flex>
            </Box>
            <Stack gap={4} className='main'>
                {children}
                <Footer>
                </Footer>
            </Stack>
        </>

    );
}

const SidebarContent = ({onClose}) => {
    const navigate = useNavigate();
    const {customer, logOut, getUserRole} = useAuth();
    const {t} = useTranslation();

    const role = getUserRole();

    const LinkItems = [
        {name: t('sideBar.home'), route: '/', icon: FiHome},
        {name: t('sideBar.subscription'), route: '/subscricao', icon: FiPackage},
        {name: t('sideBar.boutique'), route: '/boutique', icon: TbPaperBag},
        {name: t('sideBar.agenda'), route: '/agenda', icon: FiCalendar},
    ];

    const AdminLinkItems = [
        {name: 'Dashboard', route: '/dashboard', icon: FiHome},
        {name: 'Produtos', route: '/dashboard/produtos', icon: FiPackage},
        {name: 'Eventos', route: '/dashboard/eventos', icon: TbPaperBag},
    ];

    return (
        <>
            <Flex h="100%" flexDirection="column" justifyContent="space-between">
                <Flex direction="column" alignItems="center" mx={6}>
                    <CloseButton my={8} onClick={onClose}/>
                    <Image
                        maxHeight={"70px"}
                        src={logo}
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
                    <br/>
                    { Array.isArray(role) && role.includes('admin') ? AdminLinkItems.map((link) => (
                        <NavItem key={link.name} route={link.route} icon={link.icon}>
                            {link.name}
                        </NavItem>
                    )) : null}
                </Flex>
                <Flex direction="column" justifyContent="end" margin={"auto"} mx="8">

                    {customer ?
                        <HStack width="100%">
                            <HStack overflow={"hidden"} onClick={() => navigate('/profile')}>
                                <Avatar
                                    name={customer.name}
                                    size={'sm'}
                                />
                                <Text>{customer.name}</Text>
                            </HStack>
                            <Spacer/> {/* Add Spacer here */}
                            <HStack onClick={logOut}>
                                <Text>
                                    {t('sideBar.signOut')}</Text>
                                <IconButton
                                    icon={<FaSignOutAlt/>}
                                    aria-label={"logout"}>
                                    alt={"logout"}
                                </IconButton>
                            </HStack>
                        </HStack>
                        :
                        <Stack direction={"horizontal"} alignSelf={"center"} mb={8}
                               onClick={() => navigate('/login')}>
                            {t('sideBar.login')}
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
    )
        ;
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
                    ml={{base: 4, lg: 60}}
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
                <Flex justifyContent="flex-end" alignItems="center" mr={{base: 4, lg: 60}}>
                    <Select w={useBreakpointValue({base: "70px", md: "100px"})} value={selectedValue}
                            onChange={handleChange}>
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