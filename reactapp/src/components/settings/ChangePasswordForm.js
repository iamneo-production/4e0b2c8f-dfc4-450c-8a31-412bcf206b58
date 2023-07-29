import React from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { editPassword } from "../../features/userSlice";

export default function ChangePasswordForm({ close }) {
  const form = useForm({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      oldPassword: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(
          value
        )
          ? null
          : "Requires at least one lowercase, uppercase, number and special character.",
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

  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  async function handleEditPassword(values) {
    console.log(values);
    dispatch(editPassword({ ...form.values, token: token }));
    close();
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleEditPassword(values))}>
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Old Password"
        type="password"
        {...form.getInputProps("oldPassword")}
      />
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
