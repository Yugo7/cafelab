import {formatCurrency} from "../utilities/formatCurrency.jsx";
import {AddressElement, CardElement, Elements, LinkAuthenticationElement, useElements, useStripe,} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {useState} from "react"
import {Button, Card, CardBody, CardFooter, CardHeader, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {CardText, CardTitle, Image,} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import StripeService, {createPaymentMethod, createStripeSubscription, updateStripeCustomerAddress} from "../../services/stripeService.jsx";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
)

export function CheckoutFormSubscricao({clientSecret}) {

    const {cartItems, subscription, products, emptyCart} = useShoppingCart()
    const total = subscription.reduce((total, item) => total + item.preco, 0);
    const priceInCents = Math.round(total * 100);
    const options = {
        mode: 'subscription',
        amount: priceInCents,
        currency: 'eur',
        paymentMethodCreation: 'manual',
    };
    const sectWidth = useBreakpointValue({base: "100%", md: "50%"});

    return (
        <Stack className="max-w-5xl w-full mx-auto space-y-8">
            <Stack direction={['column', 'row']} justify="center" align="center" spacing="12px" m={4}>
                <Stack direction={['column', 'row']} m={6} width={"100%"} maxW={sectWidth} gap={3} justifyContent={"end"} >
                    <Stack width={"100%"}>
                        <Text className="cafelab" fontWeight={"medium"} fontSize={"lg"} align={"center"} mb={4}>
                            SUA SUBSCRIÇÃO
                        </Text>
                        <Stack gap={2} className="d-flex align-items-center">
                            <Text className="cafelab" fontWeight={"medium"} fontSize={"2xl"} align={"center"} mb={4}>
                                {subscription[0].nome.toUpperCase()}
                            </Text>
                            <Image
                                src={subscription[0].imagem}
                                style={{width: "175px", height: "275px", objectFit: "cover"}}
                            />
                            <Stack pt={6} className="d-flex align-items-left">
                                {subscription[0].coffee ? subscription[0].coffee.map((coffee, index) => (
                                    <Stack direction={"row"}>
                                        <Text className="cafelab" fontWeight={"normal"} fontSize={"lg"} align={"left"}>
                                            - {coffee.name.toUpperCase()} x {coffee.quantity}
                                        </Text>
                                    </Stack>
                                )) : null}

                                <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                                    {formatCurrency(
                                        subscription[0].preco
                                    )} /mês
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack m={4} width={"100%"} maxW={sectWidth} alignItems={"center"}>
                    <Elements stripe={stripePromise} options={options}>
                        <Form priceInCents={priceInCents}/>
                    </Elements>
                </Stack>
            </Stack>
        </Stack>
    )
}

function Form({priceInCents}) {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [shippingInfo, setShippingInfo] = useState('');
    const [address, setAddress] = useState('');
    const {customer} = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const handleEmailChange = (event) => {
        setEmail(event.value.email);
    };

    const handleAddressChange = (event) => {
        if (event.value && event.value.name) {
            setShippingInfo(event.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const stripeCustomer = customer.stripeId ? customer.stripeId : await StripeService.createCustomer(email, shippingInfo.name).then(data => data.id);
        await updateStripeCustomerAddress(stripeCustomer, shippingInfo);

        console.log("stripeCustomer: " + stripeCustomer);
        const cardElement = elements.getElement(CardElement);

        console.log("cardElement: ", cardElement);
        const {paymentMethod, error} = await createPaymentMethod(cardElement, email, stripeCustomer);

        console.log("paymentMethod: ", paymentMethod);
        if (error) {
            console.log("Error creating payment method: ", error);
            setErrorMessage(error.message);
            return;
        }

        const priceId = "price_1PB4tGRqqMn2mwDSTS2p1BJq";
        const subscription = await createStripeSubscription(stripeCustomer, priceId);

        if (subscription.error) {
            console.log("Error creating subscription: ", subscription.error);
            setErrorMessage(subscription.error.message);
            return;
        }

        console.log(subscription);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    {errorMessage && (
                        <CardText className="text-destructive">
                            {errorMessage}
                        </CardText>
                    )}
                </CardHeader>
                <CardBody>
                    <AddressElement options={{mode: 'shipping'}} onChange={handleAddressChange}/>
                    <Stack mt={6}></Stack>
                    <CardElement options={{hidePostalCode: true}}/>
                    <div className="mt-4">
                        <LinkAuthenticationElement
                            onChange={handleEmailChange}
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
                                ? "Purchasing..."
                                : `Purchase - ${formatCurrency(priceInCents / 100)}`}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}