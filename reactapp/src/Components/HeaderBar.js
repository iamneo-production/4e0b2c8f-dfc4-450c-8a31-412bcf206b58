import {
    Text,
    Image,
    Header,
    Group,
    Button,
    Box,
} from '@mantine/core';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import {useDispatch, useSelector} from "react-redux";
import {closeSigninForm, closeSignupForm, openSigninForm, openSignupForm} from '../features/userSlice'

export default function HeaderBar() {
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
        <Box pb={120}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Group>
                        <Image alt="With custom placeholder" withPlaceholder placeholder={<Text align="center">Personal Finance</Text>} maw={140} mx="auto" radius="md" src="https://raw.githubusercontent.com/UdhayakumarThangavel/UdhayakumarThangavel/main/Images/PersonalFinanceLogo.jpg" />
                    </Group>
                    <Group>
                        <Button variant="default" onClick={() => handleOpenSigninForm()}>Sign in</Button>
                        <Button onClick={() => handleOpenSignupForm()}>Sign up</Button>
                    </Group>
                </Group>
                <SigninForm open={displaySigninForm} close={handleCloseSigninForm}></SigninForm>
                <SignupForm open={displaySignupForm} close={handleCloseSignupForm}></SignupForm>
            </Header>
        </Box>
    );
}