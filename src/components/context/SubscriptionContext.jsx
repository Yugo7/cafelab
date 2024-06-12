import {createContext, useContext} from "react"
import {useLocalStorage} from "../hooks/useLocalStorage"
import {useToast} from "@chakra-ui/react";
import {useShoppingCart} from "./ShoppingCartContext.jsx";
import StripeService from "../../services/stripeService.jsx";
import orderService from "../../services/orderService.jsx";

const SubscriptionContext = createContext({})

export function useSubscription() {
    return useContext(SubscriptionContext)
}

export function SubscriptionProvider({children}) {
    const [coffee, setCoffee] = useLocalStorage(
        "coffee",
        []
    )
    const {addSubscription} = useShoppingCart();
    const toast = useToast();

    function getCoffeeQuantity(name) {
        return coffee.find(item => item.name === name)?.quantity || 0
    }

    const boxQuantity = coffee.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    function emptyBox() {
        console.log("empty box")
        setCoffee([]);
    }

    function addCoffee(name) {
        if (boxQuantity >= 3) {
            console.log("teste")
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

    function getPaymentIdFeNoCafe(payment) {
        switch (String(payment)) {
            case '1':
                return 'price_1PQfp6RqqMn2mwDSzXkcq7mJ';
            case '3':
                return 'price_1PQfl6RqqMn2mwDSTjIF3N73';
            case '6':
                return 'price_1PQflcRqqMn2mwDS38lgmo0P';
            case '12':
                return 'price_1PQfoJRqqMn2mwDSatuNouMx';
            default:
                return '';
        }
    }

    function getPaymentIdMeExpresso(payment) {
        switch (String(payment)) {
            case '1':
                return 'price_1PB4tGRqqMn2mwDSTS2p1BJq';
            case '3':
                return 'price_1PQosqRqqMn2mwDSEKkjwX2u';
            case '6':
                return 'price_1PQosqRqqMn2mwDSl0kY7ubq';
            case '12':
                return 'price_1PQosqRqqMn2mwDSs83mGCvm';
            default:
                return '';
        }
    }

    function createFeNoCafelab(variety, payment){

        console.log("payment: " + payment)
        const pId = getPaymentIdFeNoCafe(payment);

        const subscricao = {
            id: 999,
            priceId: pId,
            nome: "Fé no Cafelab",
            preco: 27.90 * payment,
            periodo: payment,
            imagem: "assets/subscricao_fenocafe.jpg",
            descricao: "3 embalagens de 175g em grãos ou moídas de acordo com a sua indicação de consumo.",
            variante: variety
        };
        StripeService.createCheckoutSession(subscricao)
    }

    function createEuMeExpresso(variante, payment){

        const pId = getPaymentIdMeExpresso(payment);
        const subscricao = {
            id: 998,
            priceId: pId,
            nome: "Eu me expresso",
            preco: 25 * payment,
                periodo: payment,
            imagem: "assets/subscricao_fenocafe.jpg",
            descricao: "3 embalagens de 175g em grãos ou moídas de acordo com a sua indicação de consumo.",
            variante: variante,
            coffee: coffee
        };
        addSubscription(subscricao)
        orderService.addOrder(subscricao)
        StripeService.createCheckoutSession(subscricao)
    }

    return (
        <SubscriptionContext.Provider
            value={{
                getCoffeeQuantity,
                addCoffee,
                removeCoffee,
                boxQuantity,
                emptyBox,
                createFeNoCafelab,
                createEuMeExpresso
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    )
}