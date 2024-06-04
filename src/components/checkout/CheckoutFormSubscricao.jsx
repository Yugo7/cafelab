import {formatCurrency} from "../utilities/formatCurrency.jsx";
import {AddressElement, CardElement, Elements, LinkAuthenticationElement, useElements, useStripe,} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {useState} from "react"
import {Button, Card, CardBody, CardFooter, CardHeader, Stack, Text} from "@chakra-ui/react";
import {CardText, CardTitle,} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {CartItem} from "../cart/CartItem.jsx";

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
        // Fully customizable with appearance API.
        appearance: {/*...*/},
    };

    console.log(subscription)

    return (
        <Stack className="max-w-5xl w-full mx-auto space-y-8">
            <Stack direction={['column', 'row']} justify="center" align="center" spacing="12px" m={4}>

                <Stack m={6} maxHeight={"50%"} gap={3}>
                    <Text className=" fw-bold fs-5" align={"center"} mb={4}>
                        Seu pedido
                    </Text>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <Text className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            total
                        )}
                    </Text>
                </Stack>
                    <Elements stripe={stripePromise} options={options}>
                        <Form total={priceInCents}/>
                    </Elements>
            </Stack>
        </Stack>
    )
}

function Form(total) {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(email)
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: email,
                address: {
                    line1: address
                }
            }
        });

        console.log(error)
        if (error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message);
        } else {
            console.log(error.message);
            setErrorMessage("An unexpected error occured.");
        }
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
                    <AddressElement options={{mode: 'shipping'}}/>
                    <Stack mt={6}></Stack>
                    <CardElement/>
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
                                ? "Purchasing..."
                                : `Purchase - ${formatCurrency(total)}`}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}