import {
    Box, Tabs, TabList, TabPanels, Tab, TabPanel, Stack
} from '@chakra-ui/react';
import SidebarWithHeader from "../shared/SideBar.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import React, {lazy, Suspense, useState} from 'react';
import {useTranslation} from "react-i18next";
import MailMarketing from "@/components/dashboard/MailMarketing.jsx";
import Events from "@/components/dashboard/Events.jsx";
import Users from "@/components/dashboard/Users.jsx";
import Acessos from "@/components/dashboard/Acessos.jsx";

// Lazy load each component
const Balance = lazy(() => import("@/components/dashboard/balance/Balance.jsx"));
const OrdersTab = lazy(() => import("@/components/dashboard/orders/Orders.jsx"));
const AccessesTab = lazy(() => import("@/components/dashboard/AnalyticsChart.jsx"));

const Dashboard = () => {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <SidebarWithHeader>
            <Tabs index={activeTab} onChange={setActiveTab}>
                <Box overflowX="auto" whiteSpace="nowrap" m={4}>
                    <TabList>
                        <Tab>Balanço</Tab>
                        <Tab>Acessos</Tab>
                        <Tab>Pedidos</Tab>
                        <Tab>MailMarketing</Tab>
                        <Tab>Eventos</Tab>
                        <Tab>Usuarios</Tab>
                    </TabList>
                </Box>
                <TabPanels>
                    <TabPanel>
                        <Suspense fallback={<p>Loading Balance...</p>}>
                            <Stack m={{base: 0, md: 6}} spacing={4}>
                                <Balance/>
                            </Stack>
                        </Suspense>
                    </TabPanel>
                    <TabPanel>
                        <Suspense fallback={<p>Loading Access Data...</p>}>
                            <Stack m={{base: 0, md: 6}} spacing={4}>
                                <Acessos/>
                            </Stack>
                        </Suspense>
                    </TabPanel>
                    <TabPanel>
                        <Suspense fallback={<p>Loading Orders...</p>}>
                            <Stack m={{base: 0, md: 6}} spacing={4}>
                                <OrdersTab/>
                            </Stack>
                        </Suspense>
                    </TabPanel>
                    <TabPanel>
                        <Suspense fallback={<p>Loading Orders...</p>}>
                            <Stack m={{base: 0, md: 6}} spacing={4}>
                                <MailMarketing/>
                            </Stack>
                        </Suspense>
                    </TabPanel>
                    <TabPanel>
                        <Suspense fallback={<p>Loading Orders...</p>}>
                            <Stack m={{base: 0, md: 6}} spacing={4}>
                                <Events/>
                            </Stack>
                        </Suspense>
                    </TabPanel>
                    <TabPanel>
                        <Suspense fallback={<p>Loading Orders...</p>}>
                            <Stack m={{base: 0, md: 6}} spacing={4}>
                                <Users/>
                            </Stack>
                        </Suspense>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </SidebarWithHeader>
    );
};

export default Dashboard;
