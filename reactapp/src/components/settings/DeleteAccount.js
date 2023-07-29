import React from 'react';
import { Button, Group, Text, TextInput } from '@mantine/core';

export default function DeleteAccount() {
  return (
    <>
    <Text fz="lg">Are you sure you want to delete your account?</Text>
    <Group position="right" mt="md">
        <Button type="submit" color='red'>Delete</Button>
      </Group>
    </>
  )
}
