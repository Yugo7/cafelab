import axios from 'axios';
import SupabaseClientUtil from "../components/utilities/SupabaseClientUtil.jsx";

const supabase = SupabaseClientUtil.supabaseClient

export const signin = async (usernameAndPassword) => {
    try {
        return await supabase.auth.signInWithPassword({
            email: usernameAndPassword.username,
            password: usernameAndPassword.password,
        })
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


export const resetPassword = async (email) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}user/change-password`,
            { email: email}
        )
    } catch (e) {
        throw e;
    }
}

export const saveCustomer = async (customer, stripeData) => {
    console.log("save customer: " + customer)
    try {
        const { data, error } = await supabase.auth.signUp({
            email: customer.email,
            password: customer.password,
            scope: "customer",
            options: {
                data: {
                    name: customer.name,
                    age: customer.age,
                    gender: customer.gender,
                    stripeId: stripeData.id,
                    role: "customer",
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

export const uploadCustomerProfilePicture = async (id, formData) => {
    try {
        return axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type': 'multipart/form-data'
            }
        );
    } catch (e) {
        throw e;
    }
}

export const customerProfilePictureUrl = (id) =>
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`;
