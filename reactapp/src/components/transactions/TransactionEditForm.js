import {
    TextInput,
    Title,
    Radio,
    Modal,
    Group,
    Button,
    Container,
    Grid,
    Textarea,
    Select, Text, Loader, LoadingOverlay,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {useDispatch, useSelector} from "react-redux";
import {
    addTransaction,
    closeTransactionForm,
    editTransaction,
    fetchTransaction,
    removeTransaction
} from "../../features/transactionSlice";
import {closeAccountForm, fetchAccount} from "../../features/accountSlice";
import {useEffect, useState} from "react";
import {fetchCategory, showCategoryForm} from "../../features/categorySlice";
import AccountList from "../accounts/AccountList";

export default function TransactionEditForm(props) {
    const {id,amount,type,accountId,paymentType,categoryId,description,dateTime} = props.element
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const addTransactionInProcess = useSelector(state => state.transaction.addTransactionInProcess)
    const [showDiscard,setShowDiscard] = useState(false);
    const categoryList = useSelector(state => state.category.categoryList)
    const accountList = useSelector(state => state.account.accountList)
    const editTransactionInProcess = useSelector(state => state.transaction.editTransactionInProcess)
    const form = useForm({
        initialValues: {
            amount: '',
            type: '',
            accountId: '',
            paymentType: '',
            categoryId: '',
            description: '',
            dateTime: new Date()
        },
        validate: {
            amount: (value) => (
                value !== '' ? null : 'Amount is required'
            ),
            accountId: (value) => (
                value !== '' ? null : 'Select account'
            ),
            categoryId: (value) => (
                value !== '' ? null : 'Select category'
            ),
            paymentType: (value) => (
                value !== '' ? null : 'Select type'
            ),
        }
    });

    useEffect(()=>{
        dispatch(fetchCategory({token:token}))
        dispatch(fetchAccount({token:token}))
        form.setFieldValue('amount',props?.element?.amount)
        form.setFieldValue('categoryId',props?.element?.category?.categoryId)
        form.setFieldValue('paymentType',props?.element?.paymentType)
        form.setFieldValue('description',props?.element?.description)
        const date = new Date(props?.element?.dateTime)
        form.setFieldValue('dateTime',date)
        form.setFieldValue('type',props?.element?.category?.type)
        form.setFieldValue('accountId',props?.element?.account?.accountId)
    },[])

    function handleDiscard(){
        form.reset()
        setShowDiscard(false)
        dispatch(closeTransactionForm())
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }

    async function handleEditTransaction(values){
        await dispatch(editTransaction({...form.values,token:token,dateTime:form.values.dateTime.getTime(),transactionId:props.element.id}))
        await dispatch(fetchTransaction({token:token}))
        await dispatch(fetchAccount({token:token}))
        form.reset()
        props.close()
    }

    function categoryData(){
        const data =[]
        categoryList.map(val => {
            data.push({value:val.categoryId,label:val.name})
        })
        return data
    }
    function accountData(){
        const data =[]
        accountList.map(val => {
            data.push({value:val.accountId,label:val.name})
        })
        return data
    }
    function paymentTypeDate(){
        const data =[]
        const selectedAccount = form.values.accountId
        let paymentType = []
        accountList.map(val =>{
            if(val.accountId===selectedAccount){
                paymentType = val.paymentTypes
            }
        })
        if(paymentType.length > 0){
            paymentType.map(val => {
                data.push({value:val,label:val})
            })
        }
        return data
    }

    function handleTransactionType(){
        categoryList.map(val =>{
            if(val.categoryId===form.values.categoryId){
                form.values.type = val.type
            }
        })
    }
    function  handleCancel(){
        form.reset()
        props.close()
    }

    console.log("--------",form.isTouched())

    async function handleDelete() {
        await dispatch(removeTransaction({token: token, transactionId: props.element.id}))
        await dispatch(fetchTransaction({token:token}))
        await dispatch(fetchAccount({token:token}))
        form.reset()
        props.close()
    }

    return (
        <>

            <Modal overlayProps={{
                color: "white",
                opacity: 0.55,
                blur: 3,
            }} size={"xl"} withCloseButton={false} closeOnClickOutside={false} radius="lg" opened={props.open} onClose={() => { props.close() }} centered>
                <Title style={{ marginLeft: 10 }} order={3}>{`Edit Transaction: `}</Title>
                <form onSubmit={form.onSubmit((values) => handleEditTransaction())}>
                    <Grid style={{ margin: 10 }}>
                        <Grid.Col span={6}>
                            <Container size="md">

                                <DateTimePicker
                                    radius="md"
                                    dropdownType="modal"
                                    valueFormat="DD MMM YYYY hh:mm A"
                                    label="Date and time"
                                    placeholder="Pick date and time"
                                    maw={400}
                                    mx="auto"
                                    {...form.getInputProps('dateTime')}
                                />
                                <TextInput radius="md" style={{ marginTop: 16 }}
                                           label="Amount"
                                           placeholder="Ex: 5,000"
                                           type='number'
                                           {...form.getInputProps('amount')}
                                           withAsterisk
                                />
                                <Textarea radius="md" style={{ marginTop: 16 }}
                                          placeholder="Enter Description"
                                          label="Description"
                                          autosize
                                          minRows={4}
                                          {...form.getInputProps('description')}
                                />
                            </Container>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select radius="md"
                                    label="Category"
                                    placeholder="Select Category"
                                    searchable
                                    clearable
                                    nothingFound={categoryList.length===0 ? <Text c="blue">No data found</Text> : <Loader size="sm" variant="dots" />}
                                    withAsterisk
                                    data={categoryData()}
                                    onChange={handleTransactionType()}
                                    {...form.getInputProps('categoryId')}
                            />
                            <Select radius="md" style={{ marginTop: 16 }}
                                    label="Account"
                                    withAsterisk
                                    searchable
                                    clearable
                                    nothingFound={accountList.length===0 ? <Text c="blue">No data found</Text> : <Loader size="sm" variant="dots" />}
                                    placeholder="Select Account"
                                    data={accountData()}
                                    {...form.getInputProps('accountId')}
                            />
                            <Select radius="md" style={{ marginTop: 16 }}
                                    label="Payment Type"
                                    withAsterisk
                                    disabled={form.values.accountId===''}
                                    clearable
                                    nothingFound={paymentTypeDate().length===0 ?  <Text>No data found</Text> : <Loader size="sm" variant="dots" />}
                                    placeholder="Select Payment Type"
                                    data={paymentTypeDate()}
                                    {...form.getInputProps('paymentType')}
                            />
                            <Radio.Group style={{ marginTop: 16 }}
                                         label="Type"
                                         {...form.getInputProps('type')}
                            >
                                <Group mt="xs">
                                    <Radio disabled value="expense" label="Expenses" />
                                    <Radio  disabled value="income" label="Income" />
                                </Group>
                            </Radio.Group>
                            <Grid style={{ marginTop: 16 }} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                                <Grid.Col span={"auto"}>
                                    <Button radius="md" color="red" fullWidth onClick={() => setShowDiscard(true)} >Delete</Button>
                                </Grid.Col>
                                <Grid.Col span={"auto"}>
                                    <Button radius="md" color="gray" fullWidth onClick={() => handleCancel() }>Cancel</Button>
                                </Grid.Col>
                                <Grid.Col span={"auto"}>
                                    <Button loading={editTransactionInProcess} radius="md" fullWidth type="submit">Save</Button>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    </Grid>
                </form>
                <Modal
                    overlayProps={{
                        color: "red",
                        blur: 3,
                    }}
                    size="sm" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Confirm Delete">
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
        </>
    );
}