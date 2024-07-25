import { Button, Image, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { Text, Select } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

export function CartItem(props) {
    const { removeFromCart, products } = useShoppingCart()
    if (!products) return null;
    const item = products.find(i => i.id === props.id)
    if (item == null) return null

    const handleChangeVariety = (event) => {
        setVariety(event.target.value);
    };

    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const productNameColumn = `nome_${lang === 'en' ? 'en' : 'pt'}`;
    const productDescriptionColumn = `descricao_${lang === 'en' ? 'en' : 'pt'}`;
    const productSizeColumn = `size_${lang === 'en' ? 'en' : 'pt'}`;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <Image
                src={item.imagem}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
            />
            <Stack className="me-auto" >
                <Stack>
                    {item[productNameColumn]}{" "}
                    {props.quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                            x{props.quantity}
                        </span>
                    )}
                </Stack>
                <Stack className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.preco)}
                </Stack>
            </Stack>
            <Text ml={6} textAlign="end"> {formatCurrency(item.preco * props.quantity)}</Text>

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