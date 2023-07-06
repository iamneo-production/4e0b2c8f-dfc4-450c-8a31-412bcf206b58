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
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {useDispatch} from "react-redux";
import {addCategory} from "../../features/categorySlice";

export default function CategoryForm(props) {
  const dispatch = useDispatch()
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      type: "",
    },
    validate: {},
  });
  function handleSubmit(){
    dispatch(addCategory(form.values))
    form.reset()
    props.close()
  }

  return (
    <Modal
      radius="lg"
      size="sm"
      opened={props.open}
      onClose={() => {
        props.close();
      }}
      centered
    >
      <Title style={{ marginLeft: 10 }} order={3}>
        Add Category
      </Title>
      <Container size="md">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit())}
        >
          <TextInput
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
            withAsterisk
            label="Description"
            placeholder="Description"
            type="textarea"
            {...form.getInputProps("description")}
          />
          <Radio.Group
            radius="md"
            style={{ marginTop: 16 }}
            name="categoryType"
            label="Select your Category Type"
            description=""
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
              <Button radius="md" color="gray" fullWidth type="submit">
                Cancel
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
    </Modal>
  );
}
