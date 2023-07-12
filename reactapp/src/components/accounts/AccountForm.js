import {
    TextInput,
    Title,
    Checkbox,
    Modal,
    Group,
    Button,
    Container,
    Grid, Text, LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAccount, closeAccountForm, fetchAccount} from "../../features/accountSlice";
import {closeCategoryForm} from "../../features/categorySlice";

export default function AccountForm(props) {
    const dispatch = useDispatch()
    const token  = useSelector(state => state.user.token)
    const addAccountInProcess = useSelector(state => state.account.addAccountInProcess)
    const [showDiscard,setShowDiscard] = useState(false);
    const form = useForm({
        initialValues: {
            name:'',
            currentBalance: '',
            paymentTypes:''
        },
        validate: {
            name: (value) => (
                value !== '' ? null : 'Name is required'
            ),
            currentBalance: (value) => (
                value !== '' ? null : 'Enter currentBalance if your account'
            ),
            paymentTypes: (value) => (
                value !== '' ? null : 'Select at least one type'
            ),
        }
    });

    async function handleSubmit(){
        await dispatch(addAccount({...form.values,token:token}))
        await dispatch(fetchAccount({token:token}))
        form.reset()
    }

    function handleDiscard(){
        form.reset()
        setShowDiscard(false)
        dispatch(closeAccountForm())
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }

    return (
        <Modal  overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
        }} withCloseButton={false} closeOnClickOutside={false} radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <LoadingOverlay visible={addAccountInProcess} overlayBlur={2} />
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
                        {...form.getInputProps('paymentTypes')}
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
                        <Button radius="md" color="gray" onClick={() => setShowDiscard(true)} fullWidth>Discard</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                        <Button radius="md" fullWidth type="submit">Save</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
            <Modal
                overlayProps={{
                    color: "red",
                    blur: 3,
                }}
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Confirm Discard">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>You will lose all the content you entered</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth  onClick={() => setShowDiscard(false)}>
                            No
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={()=> handleDiscard()} radius="md" fullWidth type="submit">
                            Yes
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    )
}