import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

function EditNameForm() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
    },

    validate: {
      firstName: (value) => (value !== "" ? null : "First name is required"),
      lastName: (value) => (value !== "" ? null : "Last name is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="First Name"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Last Name"
        {...form.getInputProps("lastName")}
      />
      <Group style={{ marginTop: 36, marginBottom: 36 }}>
        <Button radius="md" fullWidth type="submit">
          Update
        </Button>
      </Group>
    </form>
  );
}
export default EditNameForm;
