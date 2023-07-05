import React, { useState, useRef } from "react";
import {
  Divider,
  Text,
  Space,
  Button,
  Modal,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditNameForm from "../components/settings/EditNameForm";
import EditEmailForm from "../components/settings/EditEmailForm";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import DeleteAccount from "../components/settings/DeleteAccount";

export default function Profile() {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [form, setForm] = useState(null);

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(event.target.files[0]);
  };

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          display: "flex",
          align: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "100%" }}>
          <Space h="md" />
          <Text fw={700} fz="xl">
            Profile
          </Text>
          <Divider my="sm" />
          <Space h="lg" />
        </div>

        <div style={{ display: "inline", width: "50%" }}>
          <div style={{ display: "inline" }}>
            <Text fw={700}>Name</Text>

            <Space h="lg" />
            <Text fz="lg" style={{ display: "inline" }}>
              Sayan Das
            </Text>
            <Button
              variant="light"
              color="dark"
              radius="md"
              style={{ marginLeft: "300px" }}
              onClick={() => {
                setForm(<EditNameForm />);
                open();
              }}
            >
              Edit
            </Button>
          </div>
          <Space h="lg" />

          <div style={{ display: "inline" }}>
            <Text fw={700}>Email</Text>
            <Space h="lg" />
            <Text fz="lg" style={{ display: "inline" }}>
              sayandas@gmail.com
            </Text>
            <Button
              variant="light"
              color="dark"
              radius="md"
              style={{ marginLeft: "210px" }}
              onClick={() => {
                setForm(<EditEmailForm />);
                open();
              }}
            >
              Edit
            </Button>
          </div>
        </div>
        <div
          style={{
            width: "30%",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            rowGap: "10px",
            position: "relative",
          }}
        >
          <Text fw={700} fz="xl">
            Profile Picture
          </Text>
          <div onClick={handleImageClick}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Default image"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "1000px",
                }}
              />
            ) : (<Avatar radius="xl" />
              // <img
              //   src={logo}
              //   alt="Default image"
              //   style={{
              //     width: "150px",
              //     height: "150px",
              //     borderRadius: "1000px",
              //   }}
              // />
            )}

            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Button
              variant="light"
              color="dark"
              radius="md"
              style={{ position: "absolute", bottom: "0", left: "100px" }}
              type="file"
              // onClick={open}
            >
              Edit
            </Button>
          </div>
        </div>

        <Space h="lg" />
      </div>
      <div style={{ marginTop: "10px", marginLeft: "10px" }}>
        <Space h="md" />
        <Text fw={700} fz="xl">
          Others
        </Text>
        <Divider my="sm" />
        <Space h="lg" />
        <Button
          variant="light"
          color="dark"
          radius="md"
          style={{ width: "200px" }}
          onClick={() => {
            setForm(<ChangePasswordForm />);
            open();
          }}
        >
          Change Password
        </Button>
        <Space h="lg" />
        <Button
          variant="light"
          color="dark"
          radius="md"
          style={{ width: "200px" }}
          onClick={() => {
            setForm(<DeleteAccount />);
            open();
          }}
        >
          Delete Account
        </Button>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {form}
      </Modal>
    </>
  );
}
