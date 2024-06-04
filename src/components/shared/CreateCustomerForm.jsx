import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {saveCustomer} from "../../services/client.js";
import {successNotification, errorNotification} from "../../services/notification.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as PropTypes from "prop-types";

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
                </Alert>
            ) : null}
        </Box>
    );
};

const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

function SignupSuccess(props) {
    return null;
}

SignupSuccess.propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool
};
// And now we can use these
const CreateCustomerForm = ({ onSuccess }) => {
    const navigate = useNavigate();
    const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);

    const handleSignupSuccessClose = () => {
        setIsSignupSuccessOpen(false);
    };
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    age: '',
                    gender: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be 20 characters or less')
                        .required('Required'),
                    age: Yup.number()
                        .min(16, 'Must be at least 16 years of age')
                        .max(100, 'Must be less than 100 years of age')
                        .required(),
                    password: Yup.string()
                        .min(6, 'Must be 4 characters or more')
                        .required('Required'),
                    gender: Yup.string()
                        .oneOf(
                            ['MALE', 'FEMALE'],
                            'Invalid gender'
                        )
                        .required('Required'),
                })}
                onSubmit={(customer, {setSubmitting}) => {
                    setSubmitting(true);
                    saveCustomer(customer)
                        .then(res => {
                            console.log(res);
                            setIsSignupSuccessOpen(true);
                        }).catch(err => {
                            console.log(err);
                            errorNotification(
                                err.code,
                                err.response.data.message
                            )
                    }).finally(() => {
                         setSubmitting(false);
                         navigate("/");
                    })
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Jane"
                            />

                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />

                            <MyTextInput
                                label="Age"
                                name="age"
                                type="number"
                                placeholder="20"
                            />

                            <MyTextInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder={"pick a secure password"}
                            />

                            <MySelect label="Gender" name="gender">
                                <option value="">Select gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </MySelect>

                            <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
            <SignupSuccess isOpen={isSignupSuccessOpen} onClose={handleSignupSuccessClose} />
        </>
    );
};

export default CreateCustomerForm;