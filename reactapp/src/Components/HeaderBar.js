import {
    TextInput,
    Title,
    Text,
    Modal,
    Image,
    Header,
    Group,
    Button,
    Box,
    Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';


export default function HeaderBar() {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
          email: '',
          password:''
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });
    return (
        <Box pb={120}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>

                    <Group>
                        <Image maw={140} mx="auto" radius="md" src="https://raw.githubusercontent.com/UdhayakumarThangavel/UdhayakumarThangavel/main/Images/PersonalFinanceLogo.jpg" />
                    </Group>
                    <Group>
                        <Button variant="default" onClick={open}>Sign in</Button>
                        <Button >Sign up</Button>
                    </Group>
                </Group>
                <Modal radius="lg" size="sm" opened={opened} onClose={close} centered>
                    <Title size="32" align="center">Hello!!</Title>
                    <Container size="md">
                        <Text style={{ marginTop: 10 }} size="md" c="dimmed">Use your email to continue with personal finance app  </Text>
                        <form onSubmit={form.onSubmit((values) => console.log(values))}>
                            <TextInput radius="md" style={{marginTop:16}}
                                withAsterisk
                                label="Email"
                                placeholder="your@email.com"
                                type='email'
                                {...form.getInputProps('email')}
                            />
                            <TextInput radius="md" style={{marginTop:16}}
                                withAsterisk
                                label="Password"
                                placeholder="Password"
                                type='password'
                                {...form.getInputProps('password')}
                            />
                            <Group style={{marginTop:36,marginBottom:36}}>
                                <Button radius="md" fullWidth type="submit">Submit</Button>
                            </Group>
                        </form>
                    </Container>

                </Modal>
            </Header>
        </Box>
    );
}