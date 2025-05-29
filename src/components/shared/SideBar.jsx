import React, {useState, useRef, useEffect} from 'react';
import {
    Box,
    Flex,
    IconButton,
    Image,
    VStack,
    Text,
    HStack,
    Select,
    Badge,
    CloseButton,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    Drawer,
    DrawerContent, Icon,
} from '@chakra-ui/react';

import {
    FiCalendar,
    FiUsers,
    FiHome,
    FiMenu,
    FiPackage,
    FiShare2,
} from 'react-icons/fi';

import {FaShoppingCart, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import {MdDashboard} from 'react-icons/md';
import {TbPaperBag} from 'react-icons/tb';
import {useShoppingCart} from '../../context/ShoppingCartContext.jsx';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import Footer from './Footer.jsx';
import ShareModal from './ShareModal.jsx';
import logo from '/assets/Cafe lab logo Background Removed.png';
import {useAuth} from '../../context/AuthContext.jsx';

export default function SidebarWithHeader({children, hero = true}) {
    const {isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose} = useDisclosure();
    const {isOpen: isShareOpen, onOpen: onOpenShare, onClose: onCloseShare} = useDisclosure();
    const scrollableRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const hasAdjustedScroll = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!hero) return setIsScrolled(true);
            const scrolled = window.scrollY > 0;
            if (!hasAdjustedScroll.current && scrolled) {
                window.scrollTo(0, 1);
                hasAdjustedScroll.current = true;
            }
            setIsScrolled(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box position="relative">
            <Drawer isOpen={isMenuOpen} placement="left" onClose={onMenuClose}>
                <DrawerContent>
                    <SidebarContent onClose={onMenuClose}/>
                </DrawerContent>
            </Drawer>

            <MobileNav onOpenMenu={onMenuOpen} onOpenShare={onOpenShare} isScrolled={isScrolled}/>

            <Box ref={scrollableRef} flex="1" overflowY="auto">
                {children}
                <Footer/>
            </Box>

            <ShareModal isOpen={isShareOpen} onClose={onCloseShare}/>
        </Box>
    );
}

const MobileNav = ({onOpenMenu, onOpenShare, isScrolled}) => {
    const navigate = useNavigate();
    const {cartQuantity, openCart} = useShoppingCart();
    const {i18n} = useTranslation();
    const [selectedValue, setSelectedValue] = useState(localStorage.getItem('language') || i18n.language);

    const handleChange = (e) => {
        const newLang = e.target.value;
        setSelectedValue(newLang);
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    return (
        <Flex
            as="header"
            position="sticky"
            top="0"
            zIndex="1000"
            width="100%"
            height={isScrolled ? '80px' : '350px'}
            alignItems="center"
            bg={useColorModeValue('#ADDCC8', 'gray.900')}
            justifyContent="space-between"
            px={{base: 4, md: 8, lg: 10}}
            transition="all 0.3s ease-in-out"
            boxShadow={isScrolled ? 'md' : 'none'}
        >
            <HStack spacing={2} alignSelf="flex-start" mt="20px">
                <IconButton onClick={onOpenMenu} variant="ghost" aria-label="open menu" icon={<FiMenu/>}/>
                <IconButton onClick={onOpenShare} variant="ghost" aria-label="open share modal" icon={<FiShare2/>}/>
            </HStack>

            <Box
                position="absolute"
                bottom={isScrolled ? '10px' : '40px'}
                left="50%"
                top={isScrolled ? '20%' : "48%"}
                transform="translateX(-50%)"
                transition="bottom 0.3s ease, transform 0.3s ease"
            >
                <VStack align="center" cursor="pointer" onClick={() => navigate('/')}>
                    <Image
                        src={logo}
                        alt="Cafelab Logo"
                        maxHeight={isScrolled ? '50px' : '100px'}
                        objectFit="contain"
                        transition="max-height 0.3s ease"
                    />
                    <Text
                        className="cafelab"
                        fontSize="6xl"
                        fontWeight="bold"
                        color={useColorModeValue('gray.800', 'white')}
                        whiteSpace="nowrap"
                        transition="opacity 0.3s ease"
                        opacity={isScrolled ? 0 : 1}
                    >
                        CAFELAB
                    </Text>
                </VStack>
            </Box>

            <HStack spacing={{base: 1, md: 3}} alignSelf="flex-start" mt="20px">
                <Select w={useBreakpointValue({base: '50px', md: '100px'})} size="sm" value={selectedValue}
                        onChange={handleChange}>
                    <option value="en">🇺🇸 EN</option>
                    <option value="pt">🇵🇹 PT</option>
                </Select>
                <Box position="relative">
                    <IconButton size="md" variant="ghost" aria-label="cart" icon={<FaShoppingCart/>}
                                onClick={openCart}/>
                    {cartQuantity > 0 && <Badge>{cartQuantity}</Badge>}
                </Box>
            </HStack>
        </Flex>
    );
};

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
        {name: 'Dashboard', route: '/dashboard', icon: MdDashboard},
    ];

    return (
        <Flex h="100%" flexDirection="column" justifyContent="space-between"
              bg={useColorModeValue('white', 'gray.800')}>
            <Box>
                <Flex direction="column" alignItems="center" mx={6}>
                    <CloseButton alignSelf="flex-end" display={{base: 'flex', md: 'none'}} my={4} onClick={onClose}/>
                    <Image maxHeight="70px" mt={8} src={logo} alt='Cafelab' cursor="pointer"
                           onClick={() => navigate('/')}/>
                    <Text className="cafelab" mb={4} fontSize="3xl">CAFELAB</Text>
                    {LinkItems.map((link) => (
                        <NavItem key={link.name} route={link.route} icon={link.icon}>{link.name}</NavItem>
                    ))}
                    <br/>
                    {Array.isArray(role) && role.includes('admin') &&
                        AdminLinkItems.map((link) => (
                            <NavItem key={link.name} route={link.route} icon={link.icon}>{link.name}</NavItem>
                        ))
                    }
                </Flex>
            </Box>

            <Flex direction="column" p="4" borderTopWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
                {customer ? (
                    <HStack width="100%" justifyContent="space-between">
                        <HStack spacing={3} overflow="hidden" cursor="pointer" onClick={() => {
                            navigate('/profile');
                            onClose();
                        }}>
                            <Avatar name={customer.name} size='sm'/>
                            <Text noOfLines={1}>{customer.name}</Text>
                        </HStack>
                        <IconButton onClick={() => {
                            logOut();
                            onClose();
                        }} icon={<FaSignOutAlt/>} variant="ghost" aria-label={t('sideBar.signOut')}
                                    title={t('sideBar.signOut')}/>
                    </HStack>
                ) : (
                    <HStack width="100%" justifyContent="center" cursor="pointer" onClick={() => {
                        navigate('/login');
                        onClose();
                    }}>
                        <Icon as={FaSignInAlt} mr={2}/>
                        <Text>{t('sideBar.login')}</Text>
                    </HStack>
                )}
            </Flex>
        </Flex>
    );
};

const NavItem = ({icon, route, children, ...rest}) => {
    const navigate = useNavigate();
    return (
        <Flex
            align="center"
            p="4"
            mx="4"
            my="1"
            width="90%"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            onClick={() => navigate(route)}
            _hover={{bg: 'blue.400', color: 'white'}}
            {...rest}
        >
            {icon && <Icon mr="4" fontSize="16" _groupHover={{color: 'white'}} as={icon}/>}
            {children}
        </Flex>
    );
};