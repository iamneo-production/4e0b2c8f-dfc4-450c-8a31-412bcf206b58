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
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addAccount} from "../../features/accountSlice";

export default function AccountForm(props) {
    const dispatch = useDispatch()
    const form = useForm({
        initialValues: {
            name:'',
            currentBalance: '',
            paymentType:''
        },
        validate: {

        }
    });

    function handleSubmit(){
        console.log(form.values)
        dispatch(addAccount(form.values))
        form.reset()
        props.close()
    }
    return (
        <Modal radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <Title style={{ marginLeft: 10 }} order={3}>Add Account</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Name"
                        placeholder="Ex: State Bank of India"
                        type='text'
                        {...form.getInputProps('name')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Balance"
                        placeholder="Ex: 5,000"
                        type='number'
                        {...form.getInputProps('currentBalance')}
                    />
                    <Checkbox.Group style={{marginTop:16}}
                        {...form.getInputProps('paymentType')}
                        label="Payment Type"
                        withAsterisk
                    >
                        <Group style={{marginTop:10}} mt="xs">
                            <Checkbox  value="UPI" label="UPI" />
                            <Checkbox  value="Debit Card" label="Debit Card" />
                            <Checkbox  value="Credit Card" label="Credit Card" />
                            <Checkbox  value="Net Banking" label="Net Banking" />
                        </Group>
                    </Checkbox.Group>
                    <Grid style={{marginTop:16,marginBottom:8}} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth>Cancel</Button>
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