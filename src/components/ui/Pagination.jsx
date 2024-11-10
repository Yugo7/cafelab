import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <HStack justifyContent="center" mt={4}>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </Button>
            <Text>{currentPage} / {totalPages}</Text>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </Button>
        </HStack>
    );
};

export default Pagination;