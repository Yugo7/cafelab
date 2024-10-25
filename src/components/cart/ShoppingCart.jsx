import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency.jsx"
import { CartItem } from "./CartItem"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { Text, Stack, Select } from "@chakra-ui/react";

export function ShoppingCart(props) {
    const { t } = useTranslation();
    const { closeCart, cartItems, products, emptyCart, variety, setVarietyForOrder } = useShoppingCart()

    const handleChangeVariety = (event) => {
        setVarietyForOrder(event.target.value);
    };

    const hasCoffee = cartItems.some(cartItem => {
        const product = products.find(product => product.id === cartItem.id);
        return product?.secao === 'CAFE';
    });

    return (
        <Offcanvas show={props.isOpen} size="md" onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{t('shoppingCart.title')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length === 0 ? (
                    <Text pt={4} align={"center"}>Empty Cart</Text>
                ) : (
                    <Stack gap={3}>
                        {cartItems.map(item => (
                            <CartItem key={item.id} {...item} />
                        ))}
                        {hasCoffee && (
                            <Stack>
                                <Text>{t('subscription.howYouWantYourCoffee')}</Text>
                                <Select
                                    size="md"
                                    value={variety}
                                    onChange={handleChangeVariety}
                                >
                                    <option value='beans'>{t('subscription.beans')}</option>
                                    <option value='expresso'>{t('subscription.espresso')}</option>
                                    <option value='frenchpress'>{t('subscription.frenchPress')}</option>
                                    <option value='v60'>{t('subscription.v60')}</option>
                                </Select>
                            </Stack>)}
                        <Text className="ms-auto fs-10">
                            {t('shoppingCart.shipping')}{" "}
                            {formatCurrency(5)}
                        </Text>
                        <Text className="ms-auto fw-bold fs-5">
                            {t('shoppingCart.total')}{" "}
                            {formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    if (!products) {
                                        return total;
                                    }
                                    const item = products.find(i => i.id === cartItem.id)
                                    return total + (item?.preco || 0) * cartItem.quantity
                                }, 0) + 5
                            )}
                        </Text>
                        <Button variant="outline-danger" onClick={emptyCart}>{t('shoppingCart.emptyCart')}</Button>
                        <Link to="/checkout">
                            <Button variant="outline-dark">{t('shoppingCart.checkout')}</Button>
                        </Link>
                    </Stack>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    )
}