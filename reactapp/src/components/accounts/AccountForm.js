import {
    TextInput,
    Title,
    Checkbox,
    Modal,
    Group,
    Button,
    Container,
    Grid
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function AccountForm(props) {
    const form = useForm({
        initialValues: {
            name: '',
            balance: '',
            mode: ''
        },
        validate: {

        }
    });
    return (
        <Modal radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <Title style={{ marginLeft: 10 }} order={3}>Add Account</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => console.log("Account"))}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Name"
                        placeholder="Ex: State Bank of India"
                        type='email'
                        {...form.getInputProps('email')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Balance"
                        placeholder="Ex: 5,000"
                        type='password'
                        {...form.getInputProps('password')}
                    />
                    <Checkbox.Group style={{marginTop:16}}
                        defaultValue={['']}
                        label="Payment Mode"
                        withAsterisk
                    >
                        <Group style={{marginTop:10}} mt="xs">
                            <Checkbox value="upi" label="UPI" />
                            <Checkbox value="debiCard" label="Debit Card" />
                            <Checkbox value="creditCard" label="Credit Card" />
                            <Checkbox value="netBanking" label="Net Banking" />
                        </Group>
                    </Checkbox.Group>
                    <Grid style={{marginTop:16,marginBottom:8}} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth type="submit">Cancel</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                        <Button radius="md" fullWidth type="submit">Save</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
        </Modal>
    )
}