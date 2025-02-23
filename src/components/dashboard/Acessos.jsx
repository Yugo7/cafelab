import AnalyticsChart from "@/components/dashboard/AnalyticsChart.jsx";
import Origins from "@/components/dashboard/Origins.jsx";
import {useState} from "react";

const Acessos = () => {

    const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });

    return (
        <>
            <AnalyticsChart setDateRange={setDateRange} />
            <Origins dateRange={dateRange} />
        </>
    );
}

export default Acessos;