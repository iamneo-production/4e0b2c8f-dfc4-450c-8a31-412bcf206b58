import React, { useState, useRef } from "react";
import {
    Divider,
    Text,
    Space,
    Button,
    Modal,
    Avatar,
    useMantineTheme, Container, Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditNameForm from "../components/settings/EditNameForm";
import EditEmailForm from "../components/settings/EditEmailForm";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import DeleteAccount from "../components/settings/DeleteAccount";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {ReactComponent as AvatarIcon} from "../assets/User_duotone.svg";
import { editImage, validateToken } from "../features/userSlice";
import Layout from "../components/Layout";

export default function ProfileScreen() {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [form, setForm] = useState(null);
  const [formName, setFormName] = useState(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  //image
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    // let url = await toBase64(file);
    setImage(file);
    // console.log(url);
    await dispatch(editImage({ image: file, token: token }));
    await dispatch(validateToken(token));
  };
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Layout title={""} load={true}>
          <Title style={{ margin: 5 }} order={2}>Profile</Title>
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
            <Divider my="sm" />
            <Space h="lg" />
          </div>

          <div style={{ display: "inline", width: "50%" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "450px",
                alignItems: "center",
                gap: "10px 0",
              }}
            >
              <Text c={"dimmed"} fw={700} style={{ width: "100%" }}>
                Name
              </Text>

              <Space h="lg" />
              <Text fw={500} fz="lg" style={{ display: "inline", maxWidth:"calc(100%-75px)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace:"nowrap" }}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              <Button
                variant="default"
                color="dark"
                radius="md"
                onClick={() => {
                    setFormName("Edit Name")
                  setForm(<EditNameForm close={close} />);
                  open();
                }}
              >
                Edit
              </Button>
            </div>
            <Space h="lg" />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "450px",
                alignItems: "center",
                gap: "10px 0",
              }}
            >
              <Text c={"dimmed"} fw={700} style={{ width: "100%" }}>
                Email
              </Text>
              <Space h="lg" />
              <Text fw={500} fz="lg" style={{ display: "inline", maxWidth:"calc(100%-75px)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace:"nowrap" }}>
                {currentUser.email}
              </Text>
              <Button
                variant="default"
                color="dark"
                radius="md"
                
                onClick={() => {
                    setFormName("Edit Email")
                  setForm(<EditEmailForm close={close} />);
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
            <Text c={"dimmed"} fw={700} >
              Profile Picture
            </Text>
            <div onClick={handleImageClick}>
              {currentUser.profileImage ? (
                <img
                  src={`data:image/jpeg;base64,${currentUser.profileImage}`}
                  alt="Default image"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    borderRadius: "1000px",
                  }}
                />
              ) : (
                  <AvatarIcon  style={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                      borderStyle:"solid",
                      borderWidth:1,
                      borderColor:"rgba(0,0,0,0.2)",
                      borderRadius: "1000px",
                  }}/>
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
                variant="default"
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
            variant="default"
            color="dark"
            radius="md"
            style={{ width: "200px" }}
            onClick={() => {
                setFormName("Change Passwod")
              setForm(<ChangePasswordForm close={close} />);
              open();
            }}
          >
            Change Password
          </Button>
          <Space h="lg" />
          <Button
            variant="default"
            color="dark"
            radius="md"
            style={{ width: "200px" }}
            onClick={() => {
                setFormName("Delete Account")
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
          radius="lg"
          size="sm"
          centered
          overlayProps={{
              color: "white",
              opacity: 0.55,
              blur: 3,
          }}
          title={<Title style={{ marginLeft: 10 }} order={3}>
              {formName}
          </Title>}
        >
            <Container>

                {form}
            </Container>

        </Modal>
      </Layout>
    </>
  );
}
