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
import {loginAccount} from "../features/userSlice";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function SigninForm(props) {
    const signinInProgress = useSelector(state => state.user.signinInProgress)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(value) ? null : 'Requires at least one lowercase, uppercase, number and special character.'
            )
        }
    });
    function handleSubmit(){
        dispatch(loginAccount(form.values))
    }


    return (
        <Modal radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <LoadingOverlay visible={signinInProgress} overlayBlur={2} />
            <Title size="32" align="center">Hello!!</Title>
            <Container size="md">
                <Text style={{ marginTop: 10 }} size="md" c="dimmed">Use your email to continue with personal finance app  </Text>
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        type='email'
                        {...form.getInputProps('email')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Password"
                        placeholder="Password"
                        type='password'
                        {...form.getInputProps('password')}
                    />
                    <Group style={{ marginTop: 36, marginBottom: 36 }}>
                        <Button radius="md" fullWidth type="submit">Submit</Button>
                    </Group>
                </form>
            </Container>
        </Modal>
    )
}