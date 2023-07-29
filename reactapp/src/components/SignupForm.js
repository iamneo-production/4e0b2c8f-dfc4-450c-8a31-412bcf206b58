import {
    Grid,
    TextInput,
    Title,
    Text,
    Modal,
    Group,
    Button,
    Container,
    LoadingOverlay
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useDispatch, useSelector} from "react-redux";
import {createAccount, sendVerificationCode, verifyCode} from "../features/userSlice";
import {useState} from "react";

export default function SignupForm(props) {
    const signupInProgress = useSelector(state => state.user.signupInProgress)
    const displayUserDetailsForm = useSelector(state => state.user.displayUserDetailsForm)
    const displayOtpForm = useSelector(state => state.user.displayOtpForm)
    const displayPasswordForm = useSelector(state => state.user.displayPasswordForm)
    const [formValues,setFormValues] = useState({});
    const dispatch = useDispatch()
    const userDetailsForm = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },

        validate: {
            firstName: (value) => (
                value !== '' ? null : 'First name is required'
            ),
            lastName: (value) => (
                value !== '' ? null : 'Last name is required'
            ),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        },
    });

    const otpForm = useForm({
        initialValues: {
            otp: ''
        },

        validate: {
            otp: (value) => (value.length===6 ? null : 'Enter valid OTP'
            )
        },
    });

    const passwordForm = useForm({
        initialValues: {
            password: '',
            confirmPassword: ''
        },

        validate: {
            password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(value) ? null : 'Requires at least one lowercase, uppercase, number and special character.'
            ),
            confirmPassword: (value, {password}) => (
                value === password ? null : 'Passwords do not match'
            )
        },
    });

    function handleCreateAccount(){
        dispatch(createAccount({...formValues,...passwordForm.values}))
        userDetailsForm.reset()
        otpForm.reset()
        passwordForm.reset()
    }

    function handleVerifyCode(){
        dispatch(verifyCode({otp:otpForm.values.otp,email:formValues.email}))
    }

    function handleSendVerificationCode(){
        setFormValues({...formValues,email:userDetailsForm.values.email,firstName:userDetailsForm.values.firstName,lastName:userDetailsForm.values.lastName})
        dispatch(sendVerificationCode({email:userDetailsForm.values.email}))
    }
    return (
        <Modal withCloseButton={false} radius="lg" size="sm" opened={props.open} onClose={() => {
            props.close()
        }} centered>
            <LoadingOverlay visible={signupInProgress} overlayBlur={2} />
            <Title size="32" align="center">Signup</Title>
            <Container size="md">
                <Text style={{marginTop: 10}} size="md" c="dimmed">Fill the details to continue with personal finance
                    app </Text>
                {displayUserDetailsForm &&
                    <form onSubmit={userDetailsForm.onSubmit((values) => handleSendVerificationCode())}>
                        <Grid>
                            <Grid.Col span={6}>
                                <TextInput radius="md" style={{marginTop: 16}}
                                           withAsterisk
                                           label="First Name"
                                           placeholder="Ex: Udhayakumar"
                                           type='firstName'
                                           {...userDetailsForm.getInputProps('firstName')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput radius="md" style={{marginTop: 16}}
                                           withAsterisk
                                           label="Last Name"
                                           placeholder="Ex: T"
                                           type='lastName'
                                           {...userDetailsForm.getInputProps('lastName')}
                                />
                            </Grid.Col>
                        </Grid>
                        <TextInput radius="md" style={{marginTop: 16}}
                                   withAsterisk
                                   label="Email"
                                   placeholder="your@email.com"
                                   type='email'
                                   {...userDetailsForm.getInputProps('email')}
                        />
                        <Group style={{marginTop: 36, marginBottom: 10}}>
                            <Button radius="md" fullWidth type="submit">Continue</Button>
                        </Group>
                    </form>
                }
                {displayOtpForm &&
                    <form onSubmit={otpForm.onSubmit((values) => handleVerifyCode())}>
                        <TextInput radius="md" style={{marginTop: 16}}
                                   withAsterisk
                                   label="Enter Security Code"
                                   placeholder="Ex: 001666"
                                   type='otp'
                                   {...otpForm.getInputProps('otp')}
                        />
                        <Group style={{marginTop: 36, marginBottom: 10}}>
                            <Button radius="md" fullWidth type="submit">Verify Code</Button>
                        </Group>
                    </form>
                }
                {displayPasswordForm &&
                    <form onSubmit={passwordForm.onSubmit((values) => handleCreateAccount())}>
                        <TextInput radius="md" style={{marginTop: 16}}
                                   withAsterisk
                                   label="Password"
                                   placeholder="Password"
                                   type='password'
                                   {...passwordForm.getInputProps('password')}
                        />
                        <TextInput radius="md" style={{marginTop: 16}}
                                   withAsterisk
                                   label="Confirm Password"
                                   placeholder="Confirm Password"
                                   type='password'
                                   {...passwordForm.getInputProps('confirmPassword')}
                        />
                        <Group style={{marginTop: 36, marginBottom: 10}}>
                            <Button radius="md" fullWidth type="submit">Create Account</Button>
                        </Group>
                    </form>
                }
            </Container>
        </Modal>
    )
}