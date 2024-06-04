import {Button, Offcanvas, Stack} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency.jsx"
import { CartItem } from "./CartItem"
import { Link } from "react-router-dom"


export function ShoppingCart(props) {
    const { closeCart, cartItems, products, emptyCart } = useShoppingCart()
    return (
        <Offcanvas show={props.isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                if (!products) {
                                    return total;
                                }
                                const item = products.find(i => i.id === cartItem.id)
                                return total + (item?.preco || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                    <Button variant="outline-danger" onClick={emptyCart}>Empty Cart</Button>
                    <Link to="/checkout">
                    <Button variant="outline-dark" >Checkout</Button>
                    </Link>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}