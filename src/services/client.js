import axios from 'axios';
import SupabaseClientUtil from "../components/utilities/SupabaseClientUtil.jsx";

const supabase = SupabaseClientUtil.supabaseClient

export const signin = async (usernameAndPassword) => {
    console.log(usernameAndPassword)
    try {
        return await supabase.auth.signInWithPassword({
            email: usernameAndPassword.username,
            password: usernameAndPassword.password,
        })
        //await axios.post(
        //    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        //    usernameAndPassword
        //)
    } catch (e) {
        throw e;
    }
}

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getCustomers = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

/*export const saveCustomer = async (customer) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            customer
        )
    } catch (e) {
        throw e;
    }
}*/

export const saveCustomer = async (customer) => {
    console.log("save customer: " + customer)
    try {
        const { data, error } = await supabase.auth.signUp({
            email: customer.email,
            password: customer.password,
            options:{
                data: {
                    name: customer.name,
                    age: customer.age,
                    gender: customer.gender,
                },
            },
        });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error creating user: ", error.message);
    }
}

export const updateCustomer = async (id, update) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteCustomer = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

/*export const signin = async (usernameAndPassword) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
            usernameAndPassword
        )
    } catch (e) {
        throw e;
    }
}*/

export const uploadCustomerProfilePicture = async (id, formData) => {
    try {
        return axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type' : 'multipart/form-data'
            }
        );
    } catch (e) {
        throw e;
    }
}

export const customerProfilePictureUrl = (id) =>
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`;
