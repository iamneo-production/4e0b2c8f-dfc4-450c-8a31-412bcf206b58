import {
    Grid,
    TextInput,
    Title,
    Text,
    Modal,
    Group,
    Button,
    Container,
} from '@mantine/core';
import {useForm} from '@mantine/form';


export default function SignupForm(props) {
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: {
            firstName: (value) => (
                value !== '' ? null : 'First name is required'
            ),
            lastName: (value) => (
                value !== '' ? null : 'Last name is required'
            ),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(value) ? null : 'Requires at least one lowercase, uppercase, number and special character.'
            ),
            confirmPassword: (value, {password}) => (
                value === password ? null : 'Passwords do not match'
            )
        },
    });
    return (
        <Modal radius="lg" size="md" opened={props.open} onClose={() => {
            props.handleSignup()
        }} centered>
            <Title size="32" align="center">Signup</Title>
            <Container size="md">
                <Text style={{marginTop: 10}} size="md" c="dimmed">Fill the details to continue with personal finance
                    app </Text>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput radius="md" style={{marginTop: 16}}
                                       withAsterisk
                                       label="First Name"
                                       placeholder="Ex: Udhayakumar"
                                       type='firstName'
                                       {...form.getInputProps('firstName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput radius="md" style={{marginTop: 16}}
                                       withAsterisk
                                       label="Last Name"
                                       placeholder="Ex: T"
                                       type='lastName'
                                       {...form.getInputProps('lastName')}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput radius="md" style={{marginTop: 16}}
                               withAsterisk
                               label="Email"
                               placeholder="your@email.com"
                               type='email'
                               {...form.getInputProps('email')}
                    />
                    <TextInput radius="md" style={{marginTop: 16}}
                               withAsterisk
                               label="Password"
                               placeholder="Password"
                               type='password'
                               {...form.getInputProps('password')}
                    />
                    <TextInput radius="md" style={{marginTop: 16}}
                               withAsterisk
                               label="Confirm Password"
                               placeholder="Confirm Password"
                               type='password'
                               {...form.getInputProps('confirmPassword')}
                    />
                    <Group style={{marginTop: 36, marginBottom: 10}}>
                        <Button radius="md" fullWidth type="submit">Submit</Button>
                    </Group>
                </form>
            </Container>
        </Modal>
    )
}