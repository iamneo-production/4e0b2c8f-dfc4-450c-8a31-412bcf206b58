import React from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ChangePasswordForm() {
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(
          value
        )
          ? null
          : "Requires at least one lowercase, uppercase, number and special character.",
      confirmPassword: (value, { password }) =>
        value === password ? null : "Passwords do not match",
    },
  });
  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="New Password"
        type="password"
        {...form.getInputProps("password")}
      />
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Confirm Password"
        type="password"
        {...form.getInputProps("confirmPassword")}
      />
      <Group style={{ marginTop: 36, marginBottom: 36 }}>
        <Button radius="md" fullWidth type="submit">
          Update
        </Button>
      </Group>
    </form>
  );
}
