import {Form, Formik, useField} from "formik";
import * as Yup from "yup";
import {errorNotification, successNotification} from "../../services/notification.js";
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Stack, Textarea} from "@chakra-ui/react";

const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
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

const ContactUsForm = ({onSuccess}) => {
    return (
        <>
            <p><strong>Formulário&nbsp;</strong></p>
            <Formik
                initialValues={{
                    name: '', email: '', phone: 0, description: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be 20 characters or less')
                        .required(),
                    description: Yup.string()
                        .min(40, 'Must be 40 characters or more')
                        .max(1500, 'Must be 1500 characters or less')
                        .required('Required'),
                })}

            >
                {({isValid, isSubmitting}) => (
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
                                placeholder="20"
                            />
                        </Stack>
                        <Stack spacing={8} direction='row'>
                            <Textarea
                                label="description"
                                name="description"
                                type="text"
                                placeholder={"Escreva sua dúvida aqui"}
                            />
                        </Stack>

                        <Button mt={6} disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                    </Form>)}
            </Formik>
        </>);
};

export default ContactUsForm;