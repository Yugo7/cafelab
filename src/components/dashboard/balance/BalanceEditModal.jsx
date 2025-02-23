import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select
} from "@chakra-ui/react";
import React from "react";

const BalanceEditModal = ({isOpen, onClose, formData, handleInputChange, handleSubmit}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add/Edit Balance</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <Input type="text" name="orderId" value={formData.orderId} onChange={handleInputChange}
                               placeholder="Order ID" mb={2}/>
                        <Input type="date" name="date" value={formData.date} onChange={handleInputChange}
                               placeholder="Date" mb={2} required/>
                        <Input type="text" name="description" value={formData.description}
                               onChange={handleInputChange} placeholder="Description" mb={2} required/>
                        <Input type="number" name="amount" value={formData.amount} onChange={handleInputChange}
                               placeholder="Amount" mb={2} required/>
                        <Select name="type" value={formData.type} onChange={handleInputChange} mb={2}>
                            <option value="INCOME">INCOME</option>
                            <option value="EXPENSE">EXPENSE</option>
                        </Select>
                        <Input type="text" name="category" value={formData.category} onChange={handleInputChange}
                               placeholder="Category" mb={2} required/>
                        <Button type="submit" colorScheme="blue" mt={4}>Add/Update</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>);
}

export default BalanceEditModal;