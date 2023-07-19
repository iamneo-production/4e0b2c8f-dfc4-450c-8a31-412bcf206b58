import {
  TextInput,
  Title,
  Modal,
  Group,
  Button,
  Container,
  Grid,
  Textarea,
  Radio,
  Text,
  LoadingOverlay
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, closeCategoryForm, fetchCategory} from "../../features/categorySlice";
import {useState} from "react";

export default function CategoryForm(props) {
  const dispatch = useDispatch()
  const token  = useSelector(state => state.user.token)
  const addCategoryInProcess = useSelector(state => state.category.addCategoryInProcess)
  const [showDiscard,setShowDiscard] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      type: "",
    },
    validate: {
      name: (value) => (
          value !== '' ? null : 'Name is required'
      ),
      type: (value) => (
          value !== '' ? null : 'Select the type'
      ),
    },
  });
  async function handleSubmit(){
    await dispatch(addCategory({...form.values,token:token}))
    await dispatch(fetchCategory({token:token}))
    form.reset()
  }

  function handleDiscard(){
    form.reset()
    setShowDiscard(false)
    dispatch(closeCategoryForm())
  }

  function handleDiscardCancel(){
    setShowDiscard(false)
  }

  return (
    <Modal
      radius="lg"
      size="sm"
      opened={props.open}
      withCloseButton={false}
      closeOnClickOutside={false}
      overlayProps={{
        color: "white",
        opacity: 0.55,
        blur: 3,
      }}
      onClose={() => {
        props.close();
      }}
      centered
    >
      <LoadingOverlay visible={addCategoryInProcess} overlayBlur={2} />
      <Title style={{ marginLeft: 10 }} order={3}>
        Add Category
      </Title>
      <Container size="md">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit())}
        >

          <TextInput
            data-autofocus
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Name"
            placeholder="Name"
            type="text"
            {...form.getInputProps("name")}
          />
          <Textarea
            radius="md"
            style={{ marginTop: 16 }}
            label="Description"
            placeholder="Description"
            type="textarea"
            {...form.getInputProps("description")}
          />
          <Radio.Group
            radius="md"
            style={{ marginTop: 16 }}
            name="categoryType"
            label="Type"
            description="select type of the category"
            withAsterisk
            {...form.getInputProps("type")}
          >
            <Group mt="xs">
              <Radio value="expense" label="Expense" />
              <Radio value="income" label="Income" />
            </Group>
          </Radio.Group>

          <Grid
            style={{ marginTop: 16, marginBottom: 8 }}
            gutter={5}
            gutterXs="md"
            gutterMd="xl"
            gutterXl={50}
          >
            <Grid.Col span={"auto"}>
              <Button radius="md" variant={"default"} fullWidth onClick={() => setShowDiscard(true)}>
                Discard
              </Button>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Button radius="md" fullWidth type="submit">
                Save
              </Button>
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
  );
}
