import React from 'react';
import {
    Box,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    IconButton,
    Tag
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { formatCurrency } from "@/components/utilities/formatCurrency.jsx";

const CouponList = ({ coupons, handleDeleteCoupon }) => {
    return (
        <Accordion allowToggle>
            {coupons.map(coupon => (
                <AccordionItem key={coupon.id}>
                    <h2>
                        <AccordionButton>
                            <AccordionIcon />
                            <Tag colorScheme="blue" mx={2}>
                                {coupon.promotionCodes.length} código(s)
                            </Tag>
                            <Box flex="1" textAlign="left" fontWeight={"bold"}>
                                {coupon.name.toUpperCase()}
                            </Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Text fontWeight={"semibold"}>Desconto: {coupon.percent_off ? `${coupon.percent_off}%` : `${formatCurrency(coupon.amount_off / 100)}`}</Text>
                        <Text fontWeight={"semibold"}>Duração: {coupon.duration === 'forever' ? "ilimitado" : "fixo"}</Text>
                        <Text fontWeight={"semibold"}>Válido: {coupon.valid ? 'Sim' : 'Não'}</Text>
                        {coupon.redeem_by && <Text>Resgatar até: {new Date(coupon.redeem_by * 1000).toLocaleDateString()}</Text>}
                        <Text fontWeight={"semibold"}>CÓDIGOS:</Text>
                        <Accordion allowToggle>
                            {coupon.promotionCodes.map(promo => (
                                <AccordionItem key={promo.id}>
                                    <h2>
                                        <AccordionButton>
                                            <Tag colorScheme={"green"} mr={2}>{promo.times_redeemed}/{promo.max_redemptions ? promo.max_redemptions : '-'}</Tag>
                                            <Box flex="1" textAlign="left">
                                                {promo.code}
                                            </Box>
                                            <Tag colorScheme={promo.active ? "green" : "red"} mr={2}>
                                                {promo.active ? "Ativo" : "Inativo"}
                                            </Tag>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Text>Ativo: {promo.active ? 'Sim' : 'Não'}</Text>
                                        <Text>Máximo de Redenções: {promo.max_redemptions ? promo.max_redemptions : 'Ilimitado'}</Text>
                                        <Text>Redenções: {promo.times_redeemed}</Text>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <IconButton
                            aria-label="Deletar cupom"
                            icon={<MdDelete />}
                            onClick={() => handleDeleteCoupon(coupon.id)}
                            mt={2}
                        />
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default CouponList;