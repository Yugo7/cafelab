import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormLabel, Input, Textarea, Stack, Switch, Select } from '@chakra-ui/react';
import { productService } from '@/services/productsService.jsx';

const ProductForm = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState(product || {});
    const [imageFile, setImageFile] = useState(null);
    const [secaoTypes, setSecaoTypes] = useState([]);

    useEffect(() => {
        const fetchSecaoTypes = async () => {
            try {
                setSecaoTypes(await productService.getSecaoValues());
            } catch (error) {
                console.error('Failed to fetch secao types:', error);
            }
        };

        fetchSecaoTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setImageFile(files[0]);
    };

    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageFile) {
            formData.image = imageFile;
        }
        await productService.createProduct(formData);
        onSave(formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl isRequired>
                    <FormLabel htmlFor="nome_pt">Nome(PT)</FormLabel>
                    <Input type="text" name="nome_pt" id="nome_pt" value={formData.nome_pt || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="nome_en">Nome (EN)</FormLabel>
                    <Input type="text" name="nome_en" id="nome_en" value={formData.nome_en || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="descricao_pt">Descrição (PT)</FormLabel>
                    <Textarea name="descricao_pt" id="descricao_pt" value={formData.descricao_pt || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="descricao_en">Descrição (EN)</FormLabel>
                    <Textarea name="descricao_en" id="descricao_en" value={formData.descricao_en || ''} onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="origem">Origem</FormLabel>
                    <Input type="text" name="origem" id="origem" value={formData.origem || ''} onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="grao">Grão</FormLabel>
                    <Input type="text" name="grao" id="grao" value={formData.grao || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="preco">Preço</FormLabel>
                    <Input type="number" name="preco" id="preco" value={formData.preco || ''} onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="imagem">Imagem</FormLabel>
                    <Input type="file" name="imagem" id="imagem" onChange={handleFileChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="secao">Seção</FormLabel>
                    <Select name="secao" id="secao" value={formData.secao || ''} onChange={handleChange}>
                        {secaoTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="size_en">Tamanho (EN)</FormLabel>
                    <Input type="text" name="size_en" id="size_en" value={formData.size_en || ''} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="size_pt">Tamanho (PT)</FormLabel>
                    <Input type="text" name="size_pt" id="size_pt" value={formData.size_pt || ''} onChange={handleChange} />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="is_active" mb="0">
                        Ativo?
                    </FormLabel>
                    <Switch id="is_active" name="is_active" isChecked={formData.is_active || false} onChange={handleToggleChange} />
                </FormControl>
                <Button type="submit" colorScheme="blue">Save</Button>
            </Stack>
        </form>
    );
};

export default ProductForm;