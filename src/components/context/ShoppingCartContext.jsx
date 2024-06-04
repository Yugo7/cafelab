import {createContext, useContext, useState, useEffect} from "react"
import {useLocalStorage} from "../hooks/useLocalStorage"
import {ShoppingCart} from "../cart/ShoppingCart"
import {getProducts} from "../../services/productsService";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage(
        "shopping-cart",
        []
    )
    const [subscription, setSubscription] = useLocalStorage(
        "subscription",
        []
    )
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

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

    function increaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function addSubscription(incoming) {
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
        console.log(subscription);
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
                addSubscription
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}