import React, { useEffect, useState } from 'react';
import { Box, Input, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FaCheckDouble } from "react-icons/fa";
import UserService from '../../services/UserService.jsx';
import SidebarWithHeader from "@/components/shared/SideBar.jsx";
import UserModal from './Users/UserModal.jsx';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await UserService.getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = async (user) => {
        setSelectedUser(user);
        try {
            const userOrders = await UserService.getUserOrders(user.username);
            setOrders(userOrders);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setOrders([]);
            } else {
                console.error('Failed to fetch orders:', error);
            }
        }
        setIsModalOpen(true);
    };

    const filteredUsers = users.filter(user =>
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <SidebarWithHeader>
            <Box p={4}>
                <Heading mb={4}>Base de clientes</Heading>
                <Input
                    placeholder="Pesquisar cliente por nome ou email"
                    mb={4}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Email</Th>
                            <Th>Endereço</Th>
                            <Th>NIF</Th>
                            <Th>tipo</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredUsers.map((user) => (
                            <Tr key={user.id} onClick={() => handleUserClick(user)} cursor="pointer">
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.address ? `${user.address.line1}, ${user.address.line2}, ${user.address.city}, ${user.address.country}, ${user.address.postal_code}` : 'Nenhum endereço disponível'}</Td>
                                <Td>{user.nif || 'Nenhum NIF disponível'}</Td>
                                <Td>{user.role.join(', ')}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedUser={selectedUser}
                orders={orders}
            />
        </SidebarWithHeader>
    );
};

export default UsersPage;