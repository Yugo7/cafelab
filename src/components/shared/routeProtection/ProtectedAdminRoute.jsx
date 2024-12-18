import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.jsx";
import { useToast } from "@chakra-ui/react";

const ProtectedAdminRoute = ({ children }) => {

    const { getUserRole } = useAuth()
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const role = getUserRole();

        if (!role) {
            navigate("/");
            return;
        }

        if (!role.includes('admin')) {
            toast({
                title: "Plaease login as an admin to access this page",
                status: "error",
                duration: 3000,
                isClosable: true,
                
            });
            navigate("/");
        }
    }, [getUserRole, navigate]);

    return children;
}

export default ProtectedAdminRoute;