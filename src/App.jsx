import {BrowserRouter, createBrowserRouter, Route, Routes} from "react-router-dom"
import {ShoppingCartProvider} from "./components/context/ShoppingCartContext.jsx";
import {createStandaloneToast} from "@chakra-ui/toast";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import Agenda from "./components/events/Agenda.jsx";
import Menu from "./Menu.jsx";
import Subscricao from "./components/subscricao/Subscricao.jsx";
import {ShoppingCart} from "./components/cart/ShoppingCart.jsx";
import Contacts from "./Contacts.jsx";
import Boutique from "./components/products/Boutique.jsx";
import FeNoCafeLab from "./components/subscricao/FeNoCafeLab.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import React from "react";
import Home from "./Home.jsx";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorBoundaryComponent} from "./components/errors/ErrorBoundaryComponent.jsx";
import CheckoutSubscricao from "./components/checkout/CheckoutSubscricao.jsx";
import Cancel from "./components/checkout/Cancel.jsx";
import Success from "./components/checkout/Success.jsx";
import ErrorPage from "./components/errors/ErrorPage.jsx";
import AboutUs from "./AboutUs.jsx";
import Refunds from "./Refunds.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import AuthProvider from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Orders from "./components/orders/MyOrders.jsx";
import {SubscriptionProvider} from "./components/context/SubscriptionContext.jsx";


const {ToastContainer} = createStandaloneToast();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/agenda",
        element: <Agenda/>
    },
    {
        path: "/menu",
        element: <Menu/>
    },
    {
        path: "/subscricao",
        element: <Subscricao/>
    },
    {
        path: "/cart",
        element: <ShoppingCart/>
    },
    {
        path: "/contacto",
        element: <Contacts/>
    },
    {
        path: "/boutique",
        element: <Boutique/>
    },
    {
        path: "/subscricao/fenocafelab",
        element: <FeNoCafeLab/>
    },
    {
        path: "/checkout",
        element: (
            <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
                <Checkout/>
            </ErrorBoundary>
        )
    },
    {
        path: "/checkout-subscricao",
        element: (
            <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
                <CheckoutSubscricao/>
            </ErrorBoundary>
        )
    },
    {
        path: "/cancel",
        element: <Cancel/>
    },
    {
        path: "/success",
        element: <Success/>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    },
    {
        path: "/contactos",
        element: <Contacts/>
    },
    {
        path: "/sobre",
        element: <AboutUs/>
    },
    {
        path: "/reembolso",
        element: <Refunds/>
    },
    {
        path: "/orders",
        element: (
            <ProtectedRoute><Orders/></ProtectedRoute>
        )
    },
])

function App() {
    return (
        <ChakraProvider>
            <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
                <BrowserRouter>
                    <AuthProvider>
                        <ShoppingCartProvider>
                            <SubscriptionProvider>
                                <Routes>
                                    {router.routes.map((route, index) => (
                                        <Route key={index} path={route.path} element={route.element}/>
                                    ))}
                                </Routes>
                            </SubscriptionProvider>
                        </ShoppingCartProvider>
                    </AuthProvider>
                    <ToastContainer/>
                </BrowserRouter>
            </ErrorBoundary>
        </ChakraProvider>
    )
}

export default App