import {createContext, useContext} from "react"
import {useLocalStorage} from "../components/hooks/useLocalStorage.jsx"
import {useToast} from "@chakra-ui/react";
import StripeService from "../services/stripeService.jsx";
import { useAuth } from "./AuthContext.jsx";

const SubscriptionContext = createContext({})


export function useSubscription() {
    return useContext(SubscriptionContext)
}

export function SubscriptionProvider({children}) {
    const { customer } = useAuth();
    const [coffee, setCoffee] = useLocalStorage(
        "coffee",
        []
    )
    const toast = useToast();

    function getCoffeeQuantity(name) {
        return coffee.find(item => item.name === name)?.quantity || 0
    }

    const boxQuantity = coffee.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    function emptyCoffee() {
        console.log("emptyBox")
        setCoffee([]);
    }

    function addCoffee(name) {
        if (boxQuantity >= 3) {
            toast({
                title: 'Limie máximo.',
                description: "Já há 3 cafés na sua seleção.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return;
        }
        setCoffee(prevCoffees => {
            const existingCoffee = prevCoffees.find(coffee => coffee.name === name);

            if (existingCoffee) {
                return prevCoffees.map(coffee =>
                    coffee.name === name ? {...coffee, quantity: coffee.quantity + 1} : coffee
                );
            } else {
                return [...prevCoffees, {name, quantity: 1}];
            }
        });
    }

    function removeCoffee(name) {
        setCoffee(prevCoffees => {
            const existingCoffee = prevCoffees.find(coffee => coffee.name === name);

            if (existingCoffee && existingCoffee.quantity > 1) {
                // If the coffee exists and its quantity is more than 1, decrement its quantity
                return prevCoffees.map(coffee =>
                    coffee.name === name ? {...coffee, quantity: coffee.quantity - 1} : coffee
                );
            } else {
                // If the coffee's quantity is 1, remove it from the array
                return prevCoffees.filter(coffee => coffee.name !== name);
            }
        });
    }

    function createFeNoCafelab(variety, payment){
        const subscricao = {
            id: 980 + parseInt(payment),
            payment: payment,
            variety: variety
        };

        StripeService.createSubscriptionCheckoutSession(subscricao, customer)
    }

    function createEuMeExpresso(variety, payment){
        const subscricao = {
            id: 960 + parseInt(payment),
            payment: payment,
            variety: variety,
            coffee: coffee
        };
        StripeService.createSubscriptionCheckoutSession(subscricao, customer)
    }

    return (
        <SubscriptionContext.Provider
            value={{
                getCoffeeQuantity,
                addCoffee,
                removeCoffee,
                boxQuantity,
                emptyCoffee,
                createFeNoCafelab,
                createEuMeExpresso
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    )
}