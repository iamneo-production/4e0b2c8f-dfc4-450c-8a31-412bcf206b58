import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Title } from '@mantine/core';
export default function TransactionForm() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Transaction">
        {/* <Title size={22} family="Poppins" align="left">Add Transaction</Title> */}
      </Modal>
    </>
  );
}