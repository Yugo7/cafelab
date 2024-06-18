import {formatCurrency} from "../utilities/formatCurrency.jsx";
import {AddressElement, Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe,} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import React, {useState} from "react"
import {Button, Card, CardBody, CardFooter, CardHeader, Stack, Text} from "@chakra-ui/react";
import {CardTitle,} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {CartItem} from "../cart/CartItem.jsx";
import {errorNotification} from "../../services/notification.js";
import {useTranslation} from "react-i18next";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
)

export function CheckoutForm({clientSecret}) {
    const { t } = useTranslation();
    const {cartItems, products} = useShoppingCart()
    const total = cartItems.reduce((total, cartItem) => {
        const item = products.find(i => i.id === cartItem.id)
        return total + (item?.preco || 0) * cartItem.quantity
    }, 0) + 5

    return (
        <Stack className="max-w-5xl w-full mx-auto space-y-8">
            <Stack direction={['column', 'row']} justify="center" align="center" spacing="12px" m={4}>

                <Stack m={6} maxHeight={"50%"} gap={3}>
                    <Text className=" fw-bold fs-5" align={"center"} mb={4}>
                        {t('stripeCheckout.yourOrder')}
                    </Text>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <Text className="ms-auto fs-10">
                        {t('shoppingCart.shipping')}{" "}
                        {formatCurrency(5)}
                    </Text>
                    <Text className="ms-auto fw-bold fs-5">
                        {t('stripeCheckout.total')}{" "}
                        {formatCurrency(total)}
                    </Text>
                </Stack>
                {stripePromise && clientSecret && (

                    <Elements options={{clientSecret}} stripe={stripePromise}>
                        <Form clientSecret={clientSecret} priceInCents={Math.round(total * 100)}/>
                    </Elements>
                )}
            </Stack>
        </Stack>
    )
}

function Form({priceInCents}) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [email, setEmail] = useState("email")
    const { t } = useTranslation();

    async function handleSubmit(e) {
        e.preventDefault()

        if (stripe == null || elements == null || email == null) return

        setIsLoading(true)

        const orderExists = false //await userOrderExists(email, productId)

        if (orderExists) {
            setErrorMessage(
                "You have already purchased this product. Try downloading it from the My Orders page"
            )
            setIsLoading(false)
            return
        }
        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            errorNotification(error.type, error.message);
            setErrorMessage(error.message);
        } else {
            errorNotification(error.type, "An unexpected error occured.");
            setErrorMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>{t('stripeCheckout.checkout')}</CardTitle>
                </CardHeader>
                <CardBody>
                    <AddressElement options={{mode: 'shipping'}}/>
                    <PaymentElement/>
                    <div className="mt-4">
                        <LinkAuthenticationElement
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </CardBody>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={stripe == null || elements == null || isLoading}
                    >
                        {
                            isLoading
                                ? t('stripeCheckout.purchasing')
                                : `${t('stripeCheckout.purchase')} - ${formatCurrency(priceInCents / 100)}`
                        }
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}