import {createContext, useContext} from "react"
import {useLocalStorage} from "../hooks/useLocalStorage"
import {useToast} from "@chakra-ui/react";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";

const SubscriptionContext = createContext({})

export function useSubscription() {
    return useContext(SubscriptionContext)
}

export function SubscriptionProvider({children}) {
    const [coffee, setCoffee] = useLocalStorage(
        "coffee",
        []
    )
    const {addSubscription, emptyCart} = useShoppingCart();
    const toast = useToast();

    function getCoffeeQuantity(name) {
        console.log(coffee)
        return coffee.find(item => item.name === name)?.quantity || 0
    }

    const boxQuantity = coffee.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    function emptyBox() {
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

    function createFeNoCafelab(variante){
        const subscricao = {
            id: 999,
            nome: "Fé no Cafelab",
            preco: 19.99,
            imagem: "assets/bundle.png",
            descricao: "3 embalagens de 175g em grãos ou moídas de acordo com a sua indicação de consumo.",
            variante: variante
        };
        addSubscription(subscricao)
    }

    return (
        <SubscriptionContext.Provider
            value={{
                getCoffeeQuantity,
                addCoffee,
                removeCoffee,
                boxQuantity,
                emptyBox,
                createFeNoCafelab
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    )
}