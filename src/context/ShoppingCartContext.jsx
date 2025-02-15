import {createContext, useContext, useState, useEffect} from "react"
import {useLocalStorage} from "../components/hooks/useLocalStorage.jsx"
import {ShoppingCart} from "../components/cart/ShoppingCart.jsx"
import {getProducts} from "../services/productsService.jsx";
import { clearCache } from '../utils/cacheUtils';
import {useToast} from "@chakra-ui/react";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const toast = useToast()
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage(
        "shopping-cart",
        []
    )
    const [variety, setVariety] = useLocalStorage(
        "variety",
        "beans"
    )
    const [subscription, setSubscription] = useLocalStorage(
        "subscription",
        []
    )
    const [products, setProducts] = useState([]);
    const [isCacheCleared, setIsCacheCleared] = useState(() => {
        return localStorage.getItem("isCacheCleared") === "true";
    });

    useEffect(() => {
        if (!isCacheCleared) {
            clearCache();
            setIsCacheCleared(true);
            localStorage.setItem("isCacheCleared", "true");
        }
        getProducts().then(setProducts);
    }, [isCacheCleared]);

    const removeInactiveItemsFromCart = () => {
        const activeItemIds = products.filter(product => product.isActive).map(product => product.id);
        const updatedCartItems = cartItems.filter(cartItem => activeItemIds.includes(cartItem.id));

        if (JSON.stringify(cartItems) !== JSON.stringify(updatedCartItems)) {
            setCartItems(updatedCartItems);
        }
    };

    useEffect(() => {
        removeInactiveItemsFromCart();
    }, [cartItems, products]);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function emptyCart(justCart) {
        if (justCart) {
            setCartItems([]);
        } else {
            setCartItems([]);
            setSubscription([]);
        }
    }

    function emptySubscription() {
        setSubscription([])
    }

    function increaseCartQuantity(id) {
        setCartItems(currItems => {
            const existingItem = currItems.find(item => item.id === id);

            if (existingItem) {
                if (existingItem.quantity >= 5) {
                    toast({
                        title: 'Limite máximo.',
                        description: "Não é possível adicionar mais de 5 unidades deste item.",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                    return currItems;
                } else {
                    return currItems.map(item =>
                        item.id === id ? {...item, quantity: item.quantity + 1} : item
                    );
                }
            } else {
                return [...currItems, {id, quantity: 1}];
            }
        });
    }

    function addSubscription(incoming) {
        emptySubscription()
        setSubscription(currItems => {
            const existingItem = currItems.find(item => item.id === incoming.id);

            if (existingItem == null) {
                // If the incoming item does not exist in the array, add it
                return [...currItems, incoming];
            } else {
                // If the incoming item already exists in the array, ignore it
                return currItems;
            }
        })
    }

    function decreaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    function setVarietyForOrder(variety) {
        setVariety(variety)
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
                emptyCart,
                products,
                subscription,
                addSubscription,
                setVarietyForOrder,
                variety
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}