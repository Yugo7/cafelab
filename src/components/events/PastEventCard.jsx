import {Box, Button, Center, Heading, Image, Stack, Tag, Text, Link, useColorModeValue, useDisclosure,} from '@chakra-ui/react';

import {useRef} from 'react'
import {FiInstagram} from "react-icons/fi";
import {useTranslation} from "react-i18next";

export default function PastEventCard({date, name, description, local, imageFinish, instagramUrl}) {
    const {onOpen} = useDisclosure()
    const { t } = useTranslation();
    return (
        <Center py={6}>
            <Box
                minW={'300px'}
                w={'full'}
                m={2}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'250px'}
                    w={'full'}
                    src={imageFinish}
                    objectFit={'cover'}
                />

                <Box p={6}>
                    <Stack spacing={2} align={'center'}>
                        <Tag borderRadius={"full"}>{date}</Tag>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'}>{description}</Text>
                        <Text color={'gray.500'}>Local: {local}</Text>
                    </Stack>
                </Box>
                <Stack direction={'row'} justify={'center'} spacing={6} p={4}>
                    <Stack>
                        <Link href={instagramUrl} isExternal>
                            <Button
                            
                                bg={'red.400'}
                                color={'white'}
                                rounded={'lg'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg'
                                }}
                                _focus={{
                                    bg: 'green.500'
                                }}
                                onClick={onOpen}
                                leftIcon={<FiInstagram/>}
                                isDisabled={!instagramUrl} 
                            >
                                {t('agenda.takeALook')}
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}