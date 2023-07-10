import {
    Text,
    Header,
    Group,
    Button,
    Box, Avatar, Menu,
} from '@mantine/core';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import {useDispatch, useSelector} from "react-redux";
import {closeSigninForm, closeSignupForm, openSigninForm, openSignupForm,logoutAccount} from '../features/userSlice'
import {ReactComponent as SettingIcon } from "../assets/Setting_line.svg";
import {ReactComponent as LogoutIcon} from "../assets/Sign_out_squre.svg";
import {ReactComponent as AppLogo} from "../assets/App logo.svg";
import {useNavigate} from "react-router-dom";
export default function HeaderBar(props) {
    const displaySigninForm = useSelector(state => state.user.displaySigninForm)
    const displaySignupForm = useSelector(state => state.user.displaySignupForm)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();
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

    function handleLogout(){
        dispatch(logoutAccount())
        navigate("/")
    }
    return (
        <Box >
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Group>
                        <AppLogo style={{width:140,height:60}}/>
                    </Group>
                        {props.isLandingPage?
                            <Group>
                                <Button radius="xl" variant="subtle" onClick={() => handleOpenSigninForm()}>Sign in</Button>
                                <Button radius="xl" onClick={() => handleOpenSignupForm()}>Sign up</Button>
                            </Group>

                            :<Group>
                                <Menu trigger="hover" openDelay={100} shadow="md" width={200}>
                                    <Menu.Target>
                                        <Group>
                                            <Avatar radius="xl" />
                                            <div style={{ flex: 1 }}>
                                                <Text size="sm" weight={500}>
                                                    {currentUser.firstName}
                                                </Text>

                                                <Text color="dimmed" size="xs">
                                                    {currentUser.email}
                                                </Text>
                                            </div>
                                        </Group>

                                    </Menu.Target>
                                    <Menu.Dropdown >
                                        <Menu.Item transitionProps={{ transition: 'slide-down', duration: 150 }} icon={<SettingIcon style={{height:"16px",width:"16px"}}/>}><Text size={"sm"}>Setting</Text></Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item transitionProps={{ transition: 'slide-down', duration: 150 }} onClick={()=>{handleLogout()}} color="red" icon={<LogoutIcon style={{height:"16px",width:"16px"}}/>}><Text size={"sm"}>Logout</Text></Menu.Item>
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