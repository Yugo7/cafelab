import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShoppingCartProvider } from "./components/context/ShoppingCartContext.jsx";
import { createStandaloneToast } from "@chakra-ui/toast";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import Agenda from "./components/events/Agenda.jsx";
import Menu from "./components/menu/Menu.jsx";
import Subscricao from "./components/subscricao/Subscricao.jsx";
import { ShoppingCart } from "./components/cart/ShoppingCart.jsx";
import Contacts from "./Contacts.jsx";
import Boutique from "./components/products/Boutique.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import React from "react";
import Home from "./Home.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryComponent } from "./components/errors/ErrorBoundaryComponent.jsx";
import CheckoutSubscricao from "./components/checkout/CheckoutSubscricao.jsx";
import Cancel from "./components/checkout/Cancel.jsx";
import Success from "./components/checkout/Success.jsx";
import ErrorPage from "./components/errors/ErrorPage.jsx";
import AboutUs from "./AboutUs.jsx";
import Refunds from "./Refunds.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./components/shared/routeProtection/ProtectedRoute.jsx";
import ProtectedAdminRoute from "./components/shared/routeProtection/ProtectedAdminRoute.jsx";
import Orders from "./components/user/MyOrders.jsx";
import { SubscriptionProvider } from "./components/context/SubscriptionContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InstallPrompt from "./components/utilities/InstallPrompt.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./lang/i18n";
import Service from "./Service.jsx";
import ConsentBanner from "./components/shared/ConsentBanner.jsx";
import Consent from "./Consent.jsx";
import { Analytics } from "@vercel/analytics/react";
import ProfilePage from "./components/user/Dashboard.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import ForgotPassword from "./components/login/ForgotPassword.jsx";
import ResetPassword from "./components/login/ResetPassword.jsx";
import Products from "./components/dashboard/Produtos.jsx";
import Events from "./components/dashboard/Events.jsx";
import Loyalty from "./components/dashboard/Loyalty.jsx";
import Users from "@/components/dashboard/Users.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const { ToastContainer } = createStandaloneToast();

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/signup", element: <Signup /> },
  { path: "/agenda", element: <Agenda /> },
  { path: "/menu", element: <ProtectedRoute><Menu /></ProtectedRoute> },
  { path: "/subscricao", element: <Subscricao /> },
  { path: "/cart", element: <ShoppingCart /> },
  { path: "/privacidade", element: <Consent /> },
  { path: "/boutique", element: <Boutique /> },
  { path: "/checkout", element: <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}><Checkout /></ErrorBoundary> },
  { path: "/checkout-subscricao", element: <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}><CheckoutSubscricao /></ErrorBoundary> },
  { path: "/cancel", element: <Cancel /> },
  { path: "/success", element: <Success /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "/contacto", element: <Contacts /> },
  { path: "/sobre", element: <AboutUs /> },
  { path: "/servico", element: <Service /> },
  { path: "/reembolso", element: <Refunds /> },
  { path: "/orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
  { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
  { path: "/dashboard", element: <ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute> },
  { path: "/dashboard/produtos", element: <ProtectedAdminRoute><Products /></ProtectedAdminRoute> },
  { path: "/dashboard/eventos", element: <ProtectedAdminRoute><Events /></ProtectedAdminRoute> },
  { path: "/dashboard/fidelidade", element: <ProtectedAdminRoute><Loyalty /></ProtectedAdminRoute> },
  { path: "/dashboard/users", element: <ProtectedAdminRoute><Users /></ProtectedAdminRoute> },
];

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
          <BrowserRouter>
            <InstallPrompt />
            <AuthProvider>
              <Elements stripe={stripePromise}>
                <ShoppingCartProvider>
                  <SubscriptionProvider>
                    <Routes>
                      {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                      ))}
                    </Routes>
                  </SubscriptionProvider>
                </ShoppingCartProvider>
              </Elements>
            </AuthProvider>
            <ToastContainer />
            <ConsentBanner />
          </BrowserRouter>
        </ErrorBoundary>
      </ChakraProvider>
      <Analytics />
    </I18nextProvider>
  );
}

export default App;