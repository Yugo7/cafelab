import axiosInstance from "@/services/axiosInstance.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signin = async (usernameAndPassword) => {
    try {
        return await axiosInstance.post(
            `${BASE_URL}auth/login`,
            {
                email: usernameAndPassword.username,
                password: usernameAndPassword.password,
            }
        )
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
        return await axiosInstance.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const requestResetPasswordServer = async (email) => {
    try {
        return await axiosInstance.post(
            `${BASE_URL}user/forgot-password`,
            { email: email}
        ) 
    } catch (e) {
        throw e;

    }
}

export const resetPasswordServer = async (pw, token) => {
    try {
        return await axiosInstance.post(
            `${BASE_URL}user/change-password/${token}`,
            { password: pw}
        ) 
    } catch (e) {
        throw e;
    }
}

export const createCustomer = async (customer) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}user`, {
            customer
        });
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
}

export const updateCustomer = async (id, update) => {
    try {
        return await axiosInstance.put(
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
        return await axiosInstance.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const uploadCustomerProfilePicture = async (id, formData) => {
    try {
        return axiosInstance.post(
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
