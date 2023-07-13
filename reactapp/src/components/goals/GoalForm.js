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

export default function GoalForm(props){
    const form = useForm({
        initialValues: {
            name: '',
            balance: '',
            mode: ''
        },
        validate: {

        }
    });

    return(
        <Modal overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
        }} radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <Title style={{ marginLeft: 10 }} order={3}>Add Goal</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => console.log("Account"))}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Name"
                        placeholder="Ex: Emergency Fund"
                        type='email'
                        {...form.getInputProps('email')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Description"
                        placeholder="Ex: For a backup"
                        type='password'
                        {...form.getInputProps('password')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Amount"
                        placeholder="Ex: 50,000"
                        type='password'
                        {...form.getInputProps('password')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Date"
                        placeholder="choose target Date"
                        type='password'
                        {...form.getInputProps('password')}
                    />
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