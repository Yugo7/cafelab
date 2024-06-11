import {Form, Formik, useField} from "formik";
import * as Yup from "yup";
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Stack, Textarea} from "@chakra-ui/react";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

//const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = 'http://localhost:3000/';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>) : null}
        </Box>);
};

const MyTextarea = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Textarea className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>) : null}
        </Box>);
};

const ContactUsForm = ({onSuccess}) => {
    const toast = useToast();
    return (
        <>
            <p><strong>Seus dados&nbsp;</strong></p>
            <Formik
                initialValues={{
                    name: '', email: '', phone: '', description: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(70, 'Must be 70 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .required(),
                    phone: Yup.string()
                        .matches(
                            /^\d{9}$/,
                            'Phone number must be exactly 9 digits'
                        )
                        .required('Phone number is required'),
                    description: Yup.string()
                        .min(20, 'Must be 40 characters or more')
                        .max(1500, 'Must be 1500 characters or less')
                        .required('Required'),
                })}
                onSubmit={(values, {setSubmitting}) => {
                    axios.post(`${BASE_URL}contacts/`, values)
                        .then(response => {
                            // Handle success
                            console.log(response);
                            setSubmitting(false);
                            if (onSuccess) {
                                onSuccess();
                            }
                            toast({
                                title: "Sucesso!",
                                description: "Recebemos seu contacto, responderemos assim que possível.",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                        })
                        .catch(error => {
                            // Handle error
                            console.error(error);
                            setSubmitting(false);
                        });
                }}
            >
                {({isValid, isSubmitting, errors}) => {
                    console.log('isValid:', isValid);
                    console.log('isSubmitting:', isSubmitting);
                    console.log('errors:', errors);
                    return (
                        <Form>
                            <Stack isInline={true} mb={4}>
                                <MyTextInput
                                    label="Nome"
                                    name="name"
                                    type="text"
                                    placeholder="Nome"
                                />

                                <MyTextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="email@exemplo.com"
                                />
                            </Stack>

                            <Stack mb={4}>
                                <MyTextInput
                                    label="Telemovel"
                                    name="phone"
                                    type="text"
                                    placeholder="Seu telemóvel"
                                />
                            </Stack>
                            <Stack>
                                <MyTextarea
                                    label="Descrição"
                                    name="description"
                                    type="text"
                                    placeholder={"Escreva sua dúvida aqui"}
                                />
                            </Stack>
                            <Button mt={6} disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                        </Form>
                    );
                }}
            </Formik>
        </>);
};

export default ContactUsForm;