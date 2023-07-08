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
    Select, Text,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {useDispatch, useSelector} from "react-redux";
import {addTransaction, closeTransactionForm} from "../../features/transactionSlice";
import {closeAccountForm} from "../../features/accountSlice";
import {useState} from "react";

export default function TransactionForm(props) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const addTransactionInProcess = useSelector(state => state.transaction.addTransactionInProcess)
  const [showDiscard,setShowDiscard] = useState(false);
  const categoryList = useSelector(state => state.category.categoryList)
  const accountList = useSelector(state => state.account.accountList)
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

    function handleDiscard(){
        form.reset()
        setShowDiscard(false)
        dispatch(closeTransactionForm())
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }

  function handleAddTransaction(values){
    console.log(values)
      dispatch(addTransaction({...form.values,token:token,dateTime:form.values.dateTime.getTime()}))
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
  return (
    <>
      <Modal size={"xl"} withCloseButton={false} closeOnClickOutside={false} radius="lg" opened={props.open} onClose={() => { props.close() }} centered>
        <Title style={{ marginLeft: 10 }} order={3}>Add Transaction</Title>
        <form onSubmit={form.onSubmit((values) => handleAddTransaction(values))}>
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
              withAsterisk
              data={categoryData()}
                    onChange={handleTransactionType()}
                    {...form.getInputProps('categoryId')}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Account"
              withAsterisk
              placeholder="Select Account"
              data={accountData()}
                    {...form.getInputProps('accountId')}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Payment Type"
              withAsterisk
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
                <Button radius="md" color="gray" fullWidth onClick={() => setShowDiscard(true)} >Discard</Button>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Button radius="md" fullWidth type="submit">Save</Button>
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
              size="sm" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Confirm Discard">
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
    </>
  );
}