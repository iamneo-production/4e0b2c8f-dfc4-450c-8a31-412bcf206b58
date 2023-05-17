import { Image, Title, Grid, Container } from '@mantine/core';
import HeaderBar from '../Components/HeaderBar';

export default function LandingScreen() {
    return (
        <div>
            <HeaderBar />
            <Container size="xl">
                <Grid>
                    <Grid.Col justify="center" align="center" span={6}>
                        <Title style={{ marginTop: 70 }} size="48" align="center">Empower your finances, simplify your life.</Title>
                    </Grid.Col>
                    <Grid.Col justify="center" align="center" span={6}>
                        <Image withPlaceholder maw={400} mx="auto" radius="md" src="https://raw.githubusercontent.com/UdhayakumarThangavel/UdhayakumarThangavel/77d4a2b38f01f8dadcfe4bf55546335fae173d1e/Images/FinanceLeadersImage.svg" alt="Random image" />
                    </Grid.Col>
                </Grid>
            </Container>
        </div>

    )
}