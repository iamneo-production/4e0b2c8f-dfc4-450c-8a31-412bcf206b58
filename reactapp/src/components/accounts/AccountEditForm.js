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
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAccount, changeAccount, closeAccountForm, fetchAccount, removeAccount} from "../../features/accountSlice";
import {closeCategoryForm} from "../../features/categorySlice";

export default function AccountEditForm(props) {
    console.log(props.element)
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

    useEffect(() =>{
        form.setFieldValue('name',props?.element?.name)
        form.setFieldValue('currentBalance',props?.element?.currentBalance)
        form.setFieldValue('paymentTypes',props?.element?.paymentTypes)
    },[])

    async function handleDelete() {
        await dispatch(removeAccount({token: token, accountId: props.element.accountId}))
        await dispatch(fetchAccount({token: token}))
        form.reset()
        props.close()
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }

    function  handleCancel(){
        form.reset()
        props.close()
    }

    async function handleUpdate() {
        await dispatch(changeAccount({...form.values, token: token, accountId: props.element.accountId}))
        await dispatch(fetchAccount({token: token}))
        form.reset()
        props.close()
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
                <form onSubmit={form.onSubmit((values) => handleUpdate())}>
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
                            <Button radius="md" color="red" fullWidth onClick={() => setShowDiscard(true)} >Delete</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" color="gray" onClick={() => handleCancel()} fullWidth>Cancel</Button>
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
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Confirm Delete">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>This will delete this transaction.</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth  onClick={() => setShowDiscard(false)}>
                            No, Cancel
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={()=> handleDelete()} radius="md" fullWidth type="submit">
                            Yes, Delete
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    )
}