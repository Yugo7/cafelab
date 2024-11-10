import { createContext, useContext, useEffect, useState } from "react";
import { signin as performLogin, requestResetPasswordServer, resetPasswordServer } from "../../services/client.js";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [customer, setCustomer] = useState(null);

    const setCustomerFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            setCustomer({
                username: token.email,
                name: token.name ? token.name : token.email,
                role: token.scopes,
                //stripeId: token.user_metadata.stripeId
            })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setCustomerFromToken();
        }
    }, [localStorage.getItem("access_token")]);


    const signin = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.data;
                localStorage.setItem("access_token", jwtToken);

                const decodedToken = jwtDecode(jwtToken);
                console.log(decodedToken)
                setCustomer({
                    username: decodedToken.email,
                    name: decodedToken.name ? decodedToken.name : decodedToken.email,
                    role: decodedToken.scopes,
                })
                resolve(res);

            }).catch(err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token")
        setCustomer(null)
    }

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp: expiration } = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut()
            return false;
        }
        return true;
    }

    const getUserId = () => {
        if (!customer) {
            return false;
        }
        return customer.id;
    }

    const requestResetPassword = async (email) => {
        requestResetPasswordServer(email).then(res => {
            console.log(res)
        }).catch(err => {   
            console.log(err)    
        })
    }
    
    const resetPassword = async (password, token) => {
        resetPasswordServer(password, token).then(res => {
            console.log(res)
        }).catch(err => {   
            console.log(err)    
        })
    }
    
    const getUserRole = () => {
        if (!isCustomerAuthenticated()) {
            return false;
        }
        const token = localStorage.getItem("access_token");
        const { role } = jwtDecode(token);
        return role ? role : false;
    }

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
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider;