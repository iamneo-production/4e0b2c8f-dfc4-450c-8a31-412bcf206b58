import {
    Title,
    Modal,
    Button,
    Container,
    Grid, LoadingOverlay, Select, NumberInput, Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addBudget, closeBudgetForm} from "../../features/budgetSlice";

function BudgetForm(props) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const addBudgetInProcess = useSelector(state => state.budget.addBudgetInProcess)
    const [ showCancel,setShowCancel] = useState(false);
    const categoryList = useSelector(state => state.category.categoryList)
    const form = useForm({
        initialValues: {
            category: '',
            budget: ''
        },
        validate: {
            category: (value) => (
                value !== '' ? null : 'Category is required'
            ),
            budget: (value) => (
                value !== '' ? null : 'Enter Budget'
            ),
        }
    });

    function handleSubmit() {
        console.log(form.values)
        dispatch(addBudget({...form.values, token: token}))
        form.reset()
        props.close()
    }

    function handleCancel() {
        form.reset()
        setShowCancel(false)
        dispatch(closeBudgetForm())
    }
    function handleCancelConfirm(){
        setShowCancel(false)
    }
    function categoryData(){
        const data =[]
        categoryList.map(val => {
            data.push({value:val.categoryId,label:val.name})
        })
        return data
    }

    return (
        <Modal withCloseButton={false} closeOnClickOutside={false} radius="lg" size="sm" opened={props.open}
               onClose={() => {
                   props.close()
               }} centered>
            <LoadingOverlay visible={addBudgetInProcess} overlayBlur={2}/>
            <Title style={{marginLeft: 10}} order={3}>Add Budget</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>

                    <Select
                        label="Category"
                        placeholder="Select Category"
                        searchable
                        nothingFound="No options"
                        data={categoryData()}

                    />
                    <NumberInput
                        label="Budget"
                        placeholder="Enter Budget"
                        hideControls
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value) =>
                            !Number.isNaN(parseFloat(value))
                                ? `₹ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                : '₹ '
                        }

                    />
                    <Grid style={{marginTop: 16, marginBottom: 8}} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" color="gray" onClick={() => handleCancel(true)}
                                    fullWidth>Cancel</Button>
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
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showCancel} onClose={handleCancelConfirm} radius="lg" centered  withCloseButton={false} title="Confirm">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>You will lose all entered data</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth  onClick={() => setShowCancel(false)}>
                            No
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={()=> handleCancel()} radius="md" fullWidth type="submit">
                            Yes
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    )
}
export default BudgetForm;