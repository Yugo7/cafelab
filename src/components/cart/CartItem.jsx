import {Button, Image, Stack} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext"
import {formatCurrency} from "../utilities/formatCurrency"
import {Text} from "@chakra-ui/react";

export function CartItem(props) {
    const {removeFromCart, products} = useShoppingCart()
    if (!products) return null;
    const item = products.find(i => i.id === props.id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <Image
                src={item.imagem}
                style={{width: "125px", height: "75px", objectFit: "cover"}}
            />
            <Stack className="me-auto" >
                <Stack>
                    {item.nome}{" "}
                    {props.quantity > 1 && (
                        <span className="text-muted" style={{fontSize: ".65rem"}}>
              x{props.quantity}
            </span>
                    )}
                </Stack>
                <Stack className="text-muted" style={{fontSize: ".75rem"}}>
                    {formatCurrency(item.preco)}
                </Stack>
            </Stack>
            <Text ml={6}> {formatCurrency(item.preco * props.quantity)}</Text>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}