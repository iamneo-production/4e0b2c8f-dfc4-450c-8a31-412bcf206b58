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
  Select,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {useDispatch, useSelector} from "react-redux";
import {addTransaction} from "../../features/transactionSlice";

export default function TransactionForm(props) {
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.category.categoryList)
  const accountList = useSelector(state => state.account.accountList)
  const form = useForm({
    initialValues: {
      amount: '',
      type: '',
      accountName: '',
      paymentType: '',
      category: '',
      description: '',
      date: new Date()
    },
    validate: {

    }
  });

  function handleAddTransaction(values){
    console.log(values)
      dispatch(addTransaction({
          amount: values.amount,
          type: values.type,
          accountName: values.accountName,
          paymentType: values.paymentType,
          category: values.category,
          description: values.description,
          date: values.date.toDateString(),
          time: values.date.toLocaleTimeString('en-US')
      }))
      form.reset()
      props.close()
  }

  function categoryData(){
      const data =[]
      categoryList.map(val => {
          data.push({value:val.id,label:val.name})
      })
      return data
  }
  function accountData(){
      const data =[]
      accountList.map(val => {
          data.push({value:val.id,label:val.name})
      })
      return data
  }
  function paymentTypeDate(){
      const data =[]
      const selectedAccount = form.values.accountName
      let paymentType = []
      accountList.map(val =>{
          if(val.id===selectedAccount){
              paymentType = val.paymentType
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
      let data =''
      categoryList.map(val =>{
          if(val.id===form.values.category){
              data = val.type
          }
      })
      return data
  }
  function  handleCancel(){
      form.reset()
      props.close()
  }
  return (
    <>
      <Modal size={"xl"} radius="lg" opened={props.open} onClose={() => { props.close() }} centered>
        <Title style={{ marginLeft: 10 }} order={3}>Add Transaction</Title>
        <form onSubmit={form.onSubmit((values) => handleAddTransaction(values))}>
        <Grid style={{ margin: 10 }}>
          <Grid.Col span={6}>
            <Container size="md">

                <DateTimePicker
                    dropdownType="modal"
                    valueFormat="DD MMM YYYY hh:mm A"
                    label="Date and time"
                    placeholder="Pick date and time"
                    maw={400}
                    mx="auto"
                    {...form.getInputProps('date')}
                />
                <TextInput radius="md" style={{ marginTop: 16 }}
                  label="Amount"
                  placeholder="Ex: 5,000"
                  type='number'
                  {...form.getInputProps('amount')}
                />
                <Textarea style={{ marginTop: 16 }}
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
              data={categoryData()}
                    {...form.getInputProps('category')}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Account"
              placeholder="Select Account"
              data={accountData()}
                    {...form.getInputProps('accountName')}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Payment Type"
              placeholder="Select Payment Type"
              data={paymentTypeDate()}
                    {...form.getInputProps('paymentType')}
            />
            <Radio.Group style={{ marginTop: 16 }}
              label="Type"
                         defaultValue = {handleTransactionType()}
              {...form.getInputProps('type')}
            >
              <Group mt="xs">
                <Radio  value="expense" label="Expenses" />
                <Radio  value="income" label="Income" />
              </Group>
            </Radio.Group>
            <Grid style={{ marginTop: 16 }} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
              <Grid.Col span={"auto"}>
                <Button radius="md" color="gray" fullWidth onClick={() => handleCancel()} >Cancel</Button>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Button radius="md" fullWidth type="submit">Save</Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        </form>
      </Modal>
    </>
  );
}