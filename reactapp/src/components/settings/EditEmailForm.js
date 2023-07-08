import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

export default function EditEmailForm() {
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Email"
        type="email"
        {...form.getInputProps("email")}
      />
      <Group style={{ marginTop: 36, marginBottom: 36 }}>
        <Button radius="md" fullWidth type="submit">
          Update
        </Button>
      </Group>
    </form>
  );
}
