import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import CouponList from './CouponList';
import {fetchCoupons} from "@/services/adsService.jsx";

const getMockCoupons = () => {
    return [
        {
            id: 'YZnYrQeh',
            name: 'Cupom exclusivo subscricao',
            percent_off: null,
            amount_off: 500,
            currency: 'eur',
            duration: 'forever',
            valid: false,
            redeem_by: null,
            promotionCodes: [
                {
                    id: 'promo_1QKUrwRqqMn2mwDSUordunad',
                    active: true,
                    code: 'SUB5',
                    created: 1731459340,
                    max_redemptions: 1,
                    times_redeemed: 0
                }
            ]
        },
        {
            id: 'Nwp6iD30',
            name: 'Cupom sorteio Correio do bem',
            percent_off: null,
            amount_off: 500,
            currency: 'eur',
            duration: 'forever',
            valid: true,
            redeem_by: null,
            promotionCodes: [
                {
                    id: 'promo_1QG7PJRqqMn2mwDSvLFJ0ZUN',
                    active: true,
                    code: 'sorteiofeira55',
                    created: 1730415841,
                    max_redemptions: null,
                    times_redeemed: 0
                },
                {
                    id: 'promo_1QG7P3RqqMn2mwDSnS8lGc9R',
                    active: true,
                    code: 'sorteiofeira14',
                    created: 1730415825,
                    max_redemptions: null,
                    times_redeemed: 0
                },
                {
                    id: 'promo_1QG7OqRqqMn2mwDSsEDA5v54',
                    active: true,
                    code: 'sorteioFeira1',
                    created: 1730415812,
                    max_redemptions: 1,
                    times_redeemed: 0
                }
            ]
        }
    ];
};

const CouponManager = () => {
    const [coupons, setCoupons] = useState([]);
    const [currentCoupon, setCurrentCoupon] = useState({ id: '', code: '', discount: '' });
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        async function fetchCouponsData() {
            const savedCoupons = await fetchCoupons();
            setCoupons(savedCoupons);
        }
        fetchCouponsData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCoupon({ ...currentCoupon, [name]: value });
    };

    const handleSaveCoupon = () => {
        if (currentCoupon.id) {
            setCoupons(coupons.map(c => c.id === currentCoupon.id ? currentCoupon : c));
            toast({ title: 'Cupom atualizado', status: 'success', duration: 3000, isClosable: true });
        } else {
            const newCoupon = { ...currentCoupon, id: uuidv4() };
            setCoupons([...coupons, newCoupon]);
            toast({ title: 'Cupom criado', status: 'success', duration: 3000, isClosable: true });
        }
        setCurrentCoupon({ id: '', code: '', discount: '' });
        onClose();
    };

    const handleDeleteCoupon = (id) => {
        const updatedCoupons = coupons.filter(c => c.id !== id);
        setCoupons(updatedCoupons);
        toast({ title: 'Cupom deletado', status: 'success', duration: 3000, isClosable: true });
    };

    const activeCoupons = coupons.filter(coupon => coupon.valid);
    const inactiveCoupons = coupons.filter(coupon => !coupon.valid);

    return (
        <Box p={5}>
            <Heading mb={4}>Cupons Ativos</Heading>
            <Button my={4} colorScheme="blue" onClick={onOpen}>Adicionar Cupom</Button>
            <CouponList coupons={activeCoupons} handleDeleteCoupon={handleDeleteCoupon} />

            <Heading mt={8} mb={4}>Cupons Inativos</Heading>
            <CouponList coupons={inactiveCoupons} handleDeleteCoupon={handleDeleteCoupon} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentCoupon.id ? 'Editar Cupom' : 'Criar Cupom'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Código</FormLabel>
                            <Input name="code" value={currentCoupon.code} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Desconto (%)</FormLabel>
                            <Input name="discount" value={currentCoupon.discount} onChange={handleInputChange} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleSaveCoupon}>
                            {currentCoupon.id ? 'Atualizar Cupom' : 'Criar Cupom'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CouponManager;