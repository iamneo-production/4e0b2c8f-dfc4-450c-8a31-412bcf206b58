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
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

export default function TransactionForm(props) {
  const form = useForm({
    initialValues: {
      name: '',
      balance: '',
      mode: ''
    },
    validate: {

    }
  });

  return (
    <>
      <Modal size={"xl"} radius="lg" opened={props.open} onClose={() => { props.close() }} centered>
        <Title style={{ marginLeft: 10 }} order={3}>Add Transaction</Title>
        <Grid style={{ margin: 10 }}>
          <Grid.Col span={6}>
            <Container size="md">
              <form onSubmit={form.onSubmit((values) => console.log("Account"))}>
                <DateInput
                  label="Date input"
                  placeholder="Date input"
                  maw={400}
                  mx="auto"
                />
                <TextInput radius="md" style={{ marginTop: 16 }}
                  withAsterisk
                  label="Amount"
                  placeholder="Ex: 5,000"
                  type='password'
                  {...form.getInputProps('password')}
                />
                <Textarea style={{ marginTop: 16 }}
                  placeholder="Enter Description"
                  label="Description"
                  autosize
                  minRows={4}
                />
              </form>
            </Container>
          </Grid.Col>
          <Grid.Col span={6}>
            <Select radius="md"
              label="Category"
              placeholder="Select Category"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Account"
              placeholder="Select Account"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Payment Type"
              placeholder="Select Payment Type"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
            <Radio.Group style={{ marginTop: 16 }}
              label="Type"
              withAsterisk
            >
              <Group mt="xs">
                <Radio value="react" label="Expenses" />
                <Radio value="svelte" label="Income" />
              </Group>
            </Radio.Group>
            <Grid style={{ marginTop: 16 }} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
              <Grid.Col span={"auto"}>
                <Button radius="md" color="gray" fullWidth type="submit">Cancel</Button>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Button radius="md" fullWidth type="submit">Save</Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}