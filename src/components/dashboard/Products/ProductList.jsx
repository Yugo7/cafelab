import React, { useState } from 'react';
import { Box, Button, Stack, Image, Text, Tag, SimpleGrid, Spacer, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Input } from '@chakra-ui/react';
import { formatCurrency } from "@/components/utilities/formatCurrency.jsx";

const ProductList = ({ products, onEdit, onDelete }) => {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.nome_pt.toLowerCase().includes(filter.toLowerCase())
    );

    const activeProducts = filteredProducts.filter(product => product.is_active);
    const inactiveProducts = filteredProducts.filter(product => !product.is_active);

    const renderProducts = (products) => (
        <SimpleGrid minChildWidth="300px" spacing={4}>
            {products.map((product) => (
                <Stack key={product.id} p={4} borderWidth="1px" borderRadius="lg">
                    <Stack mt='6' spacing='4'>
                        <Text className="cafelab text-center" fontWeight={"bold"} fontSize={"md"}>
                            Nome: {product['nome_pt'].toUpperCase()}
                        </Text>
                        <Box alignSelf='center'>
                            Imagem:
                            <Image
                                src={product.imagem.startsWith('assets/') ? `/${product.imagem}` : product.imagem}
                                borderRadius='lg'
                                objectFit='contain'
                                maxHeight={"350px"}
                            />
                        </Box>
                        <Box align='center'>
                            <Text maxHeight={"100px"} overflow="auto">
                                Tamanhos
                            </Text>
                            <Tag size={"md"}>{product['size_pt']}</Tag>
                        </Box>
                        <Text className="cafelab text-center" fontWeight={"bold"} fontSize={"md"}>
                            Descrição:
                        </Text>
                        <Text maxHeight={"100px"} overflow="auto">
                            {product['descricao_pt']}
                        </Text>
                        <Text color='black' fontSize='2xl' alignSelf={"right"}>
                            {formatCurrency(product.preco)}
                        </Text>
                    </Stack>
                    <Spacer />
                    <Stack direction="row" spacing={4} mt={4}>
                        <Button colorScheme="yellow" onClick={() => onEdit(product)}>Editar</Button>
                        <Button colorScheme="red" onClick={() => onDelete(product)}>Excluir</Button>
                    </Stack>
                </Stack>
            ))}
        </SimpleGrid>
    );

    return (
        <Box>
            <Input
                placeholder="Filtrar por nome"
                value={filter}
                onChange={handleFilterChange}
                mb={4}
            />
            <Accordion allowMultiple>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left" fontSize="2xl" fontWeight="bold">
                            Produtos Ativos
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {renderProducts(activeProducts)}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left" fontSize="2xl" fontWeight="bold">
                            Produtos Inativos
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {renderProducts(inactiveProducts)}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default ProductList;