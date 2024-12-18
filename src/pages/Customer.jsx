import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "../components/shared/SideBar.jsx";
import {useEffect, useState} from 'react';
import {getCustomers} from "../services/client.js";
import CustomerCard from "../components/customer/CustomerCard.jsx";
import CreateCustomerDrawer from "../components/customer/CreateCustomerDrawer.jsx";
import {errorNotification} from "../services/notification.js";
import UserService from "@/services/UserService.jsx";

const Customer = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    const  fetchCustomers = async () =>  {
        setLoading(true);
        try {
            const data = await UserService.getUsers();
            setCustomers(data)
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    alignSelf={"center"}
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer
                    fetchCustomers={fetchCustomers}
                />
                <Text mt={5}>Ooops there was an error</Text>
            </SidebarWithHeader>
        )
    }

    if (customers.length <= 0) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer
                    fetchCustomers={fetchCustomers}
                />
                <Text mt={5}>No customers available</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <CreateCustomerDrawer
                fetchCustomers={fetchCustomers}
            />
            <Wrap justify={"center"} spacing={"30px"}>
                {customers.map((user, index) => (
                    <WrapItem key={index}>
                        <CustomerCard user={user} />
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default Customer;