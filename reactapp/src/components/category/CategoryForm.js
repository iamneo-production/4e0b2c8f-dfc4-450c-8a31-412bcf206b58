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

export default function CategoryForm(props) {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      categoryType: "",
    },
    validate: {},
  });
  // console.log(props.value);
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
          onSubmit={form.onSubmit((values) => console.log("Category Added ! "))}
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
            {...form.getInputProps("categoryType")}
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
