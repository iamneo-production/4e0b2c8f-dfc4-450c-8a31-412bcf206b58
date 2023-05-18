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
import { useState } from 'react';


export default function HeaderBar() {
    const [openSignin, setOpenSignin] = useState(false);
    function handleSignin() {
        setOpenSignin(false)
    }
    const [openSignup, setOpenSignup] = useState(false);
    function handleSignup() {
        setOpenSignup(false)
    }
    return (
        <Box pb={120}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Group>
                        <Image alt="With custom placeholder" withPlaceholder placeholder={<Text align="center">Personal Finance</Text>} maw={140} mx="auto" radius="md" src="https://raw.githubusercontent.com/UdhayakumarThangavel/UdhayakumarThangavel/main/Images/PersonalFinanceLogo.jpg" />
                    </Group>
                    <Group>
                        <Button variant="default" onClick={() => { setOpenSignin(true) }}>Sign in</Button>
                        <Button onClick={() => { setOpenSignup(true) }}>Sign up</Button>
                    </Group>
                </Group>
                <SigninForm open={openSignin} handleSignin={handleSignin}></SigninForm>
                <SignupForm open={openSignup} handleSignup={handleSignup}></SignupForm>
            </Header>
        </Box>
    );
}