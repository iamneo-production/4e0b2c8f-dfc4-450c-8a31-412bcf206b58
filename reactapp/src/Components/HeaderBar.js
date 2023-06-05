import {
    Text,
    Image,
    Header,
    Group,
    Button,
    Box, Avatar, Menu,
} from '@mantine/core';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import {useDispatch, useSelector} from "react-redux";
import {closeSigninForm, closeSignupForm, openSigninForm, openSignupForm} from '../features/userSlice'
import {ReactComponent as SettingIcon } from "../assets/Setting_line.svg";
import {ReactComponent as LogoutIcon} from "../assets/Sign_out_squre.svg";

export default function HeaderBar(props) {
    const displaySigninForm = useSelector(state => state.user.displaySigninForm)
    const displaySignupForm = useSelector(state => state.user.displaySignupForm)
    const dispatch = useDispatch()

    function handleOpenSigninForm() {
        dispatch(openSigninForm())
    }
    function handleOpenSignupForm() {
        dispatch(openSignupForm())
    }
    function handleCloseSigninForm() {
        dispatch(closeSigninForm())
    }
    function handleCloseSignupForm() {
        dispatch(closeSignupForm())
    }
    return (
        <Box >
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Group>
                        <Image alt="With custom placeholder" withPlaceholder placeholder={<Text align="center">Personal Finance</Text>} maw={140} mx="auto" radius="md" src="https://raw.githubusercontent.com/UdhayakumarThangavel/UdhayakumarThangavel/main/Images/PersonalFinanceLogo.jpg" />
                    </Group>
                        {props.isLandingPage?
                            <Group>
                                <Button variant="default" onClick={() => handleOpenSigninForm()}>Sign in</Button>
                                <Button onClick={() => handleOpenSignupForm()}>Sign up</Button>
                            </Group>

                            :<Group>
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <Avatar radius="xl" />
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item icon={<SettingIcon style={{height:"20px",width:"20px"}}/>}>Settings</Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item color="red" icon={<LogoutIcon style={{height:"20px",width:"20px"}}/>}>Logout</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                                </Group>
                        }
                </Group>
                <SigninForm open={displaySigninForm} close={handleCloseSigninForm}></SigninForm>
                <SignupForm open={displaySignupForm} close={handleCloseSignupForm}></SignupForm>

            </Header>
        </Box>
    );
}