import {Select, Stack, Text} from "@chakra-ui/react";
import React, {useState} from "react";

const [payment, setPayment] = useState('3');
function getPaymentText() {
    switch (payment) {
        case '1':
            return '€27.90 / mês';
        case '3':
            return '€83.70 / trimestre';
        case '6':
            return '€167.40 / semestre';
        case '12':
            return '€334.80 / ano';
        default:
            return '';
    }
}

const PaymentsSelector = ({ payment, handleChangePayment }) => {
    return (
        <>
            <Stack my={4}>
                <Select value={payment} onChange={handleChangePayment}>
                    <option value='3'>Pagamentos trimestrais</option>
                    <option value='6'>Pagamentos semestrais</option>
                    <option value='12'>Pagamentos anuais</option>
                </Select>
            </Stack>
            <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                {getPaymentText()}
            </Text>
            <Text className="ms-auto fw-bold" fontSize={"2xl"}>
                (€27.90 /mês)
            </Text>
        </>
    );
}

export default PaymentsSelector;