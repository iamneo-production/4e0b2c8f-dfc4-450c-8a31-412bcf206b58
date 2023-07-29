import {
    TextInput,
    Title,
    Text,
    Modal,
    Group,
    Button,
    Container, LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {newPassword, sendVerificationCodeForFP, verifyCode} from "../features/userSlice";
import {useDispatch,useSelector} from "react-redux";
import {useState} from "react";


export default function ForgotPasswordForm(props) {
    const forgotPasswordInProgress = useSelector(state => state.user.forgotPasswordInProgress)
    const displayMailForm = useSelector(state => state.user.displayMailForm)
    const displayOtpForm = useSelector(state => state.user.displayOtpForm)
    const displayPasswordForm = useSelector(state => state.user.displayPasswordForm)
    const [formValues,setFormValues] = useState({});
    const dispatch = useDispatch();

    const mailForm = useForm({
        initialValues: {
            email: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        }
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

    function handleRestPassword(){
        console.log("formValues",formValues)
        dispatch(newPassword({...formValues,password:passwordForm.values.password}))
    }

    function handleVerifyCode(){
        dispatch(verifyCode({otp:otpForm.values.otp,email:formValues.email}))
    }

    function handleSendVerificationCode(){
        setFormValues({...formValues,email:mailForm.values.email})
        dispatch(sendVerificationCodeForFP({email:mailForm.values.email}))
    }

    return (
        <Modal withCloseButton={false} radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <LoadingOverlay visible={forgotPasswordInProgress} overlayBlur={2} />
            <Title size="32" align="center">Reset Password</Title>
            <Container size="md">
                {displayMailForm &&
                    <div>
                        <Text style={{ marginTop: 10 }} size="md" c="dimmed">Enter Email to Generate OTP</Text>
                        <form onSubmit={mailForm.onSubmit((values) => handleSendVerificationCode())}>
                            <TextInput radius="md" style={{marginTop: 16}}
                                       withAsterisk
                                       label="Email"
                                       placeholder="your@email.com"
                                       type='email'
                                       {...mailForm.getInputProps('email')}
                            />
                            <Group style={{marginTop: 36, marginBottom: 10}}>
                                <Button radius="md" fullWidth type="submit">Continue</Button>
                            </Group>
                        </form>
                    </div>
                }
                {displayOtpForm &&
                    <div>
                        <Text style={{ marginTop: 10 }} size="md" c="dimmed">Enter Security Code</Text>
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
                    </div>
                }
                {displayPasswordForm &&
                    <div>
                        <Text style={{ marginTop: 10 }} size="md" c="dimmed">Set New Pasasword</Text>
                        <form onSubmit={passwordForm.onSubmit((values) => handleRestPassword())}>
                            <TextInput radius="md" style={{marginTop: 16}}
                                       withAsterisk
                                       label="New Password"
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
                                <Button radius="md" fullWidth type="submit">Submit</Button>
                            </Group>
                        </form>
                    </div>
                }
            </Container>
        </Modal>
    )
}