import React from "react";
import {MdStar} from "react-icons/md";
import SidebarWithHeader from "../shared/SideBar.jsx";
import ProductCard from "./ProductCard.jsx";
import OurPicks from "./OurPicks.jsx";
import {Stack} from "@chakra-ui/react";

export default function ProductDetails(id) {
    const product = {
        id: 1,
        nome: 'Brazil Santos',
        descricao: 'Description of the product',
        origem: 'Origin of the product',
        variedade: 'Variety of the product',
        grao: 'Grain of the product',
        preco: 'Price of the product',
        imagem: 'assets/brasil.jpg',
        alt: 'Alt text for the product image'
    };

    return (
            <Stack>
                    <ProductCard
                        id={product.id}
                        nome={product.nome}
                        descricao={product.descricao}
                        origem={product.origem}
                        variedade={product.variedade}
                        grao={product.grao}
                        preco={product.preco}
                        imagem={product.imagem}
                        alt={product.alt}
                    />
            </Stack>
    );
}