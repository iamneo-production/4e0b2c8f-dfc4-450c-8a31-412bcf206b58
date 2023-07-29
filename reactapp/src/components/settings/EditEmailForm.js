import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {editEmail, validateToken} from "../../features/userSlice";

export default function EditEmailForm({close}) {
  const currentUser = useSelector(state => state.user.currentUser)
  const form = useForm({
    initialValues: {
      email: currentUser.email,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  async function handleEditEmail(values){
    console.log(values)
    await dispatch(editEmail({ ...form.values, token: token }));
    await dispatch(validateToken(token));
    close();
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleEditEmail(values))}>
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Email"
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
