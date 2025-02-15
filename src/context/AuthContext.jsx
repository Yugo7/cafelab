import { createContext, useContext, useEffect, useState } from "react";
import { signin as performLogin, requestResetPasswordServer, resetPasswordServer } from "../services/client.js";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);

    const setCustomerFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            let decodedToken = jwtDecode(token);
            console.log(decodedToken.roles.map(role => role.authority));
            setCustomer({
                username: decodedToken.username,
                email: decodedToken.sub,
                name: decodedToken.name ? decodedToken.name : decodedToken.sub,
                role: decodedToken.roles.map(role => role.authority),
                id: decodedToken.id
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setCustomerFromToken();
        }
    }, []);

    const signin = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.data.token;
                localStorage.setItem("access_token", jwtToken);
                setCustomerFromToken();
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        setCustomer(null);
    };

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp: expiration } = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut();
            return false;
        }
        return true;
    };

    const getUserId = () => {
        if (!customer) {
            return false;
        }
        return customer.id;
    };

    const requestResetPassword = async (email) => {
        requestResetPasswordServer(email).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };

    const resetPassword = async (password, token) => {
        resetPasswordServer(password, token).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };

    const getUserRole = () => {
        if (!isCustomerAuthenticated()) {
            return false;
        }
        const token = localStorage.getItem("access_token");

        const decodedToken = jwtDecode(token);
        return decodedToken.roles.map(role => role.authority);
    };

    return (
        <AuthContext.Provider value={{
            customer,
            signin,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken,
            getUserRole,
            getUserId,
            requestResetPassword,
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;