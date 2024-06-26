import {createContext, useContext, useEffect, useState} from "react";
import {signin as performLogin} from "../../services/client.js";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [customer, setCustomer] = useState(null);

    const setCustomerFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            setCustomer({
                username: token.email,
                name: token.user_metadata.name ? token.user_metadata.name : token.email,
                role: token.scopes,
                id: token.sub,
                stripeId: token.user_metadata.stripeId
            })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setCustomerFromToken();
        }
    }, [localStorage.getItem("access_token")]); // Add this line


    const signin = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {

                const jwtToken = res.data.session.access_token;
                localStorage.setItem("access_token", jwtToken);

                const decodedToken = jwtDecode(jwtToken);

                setCustomer({
                    username: decodedToken.email,
                    name: decodedToken.user_metadata.name ? decodedToken.user_metadata.name : decodedToken.email,
                    role: decodedToken.scopes,
                    id: decodedToken.sub,
                    stripeId: decodedToken.user_metadata.stripeId
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
        const {exp: expiration} = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut()
            return false;
        }
        return true;
    }

    const getUserId = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const {exp: expiration} = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut()
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{
            customer,
            signin,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider;