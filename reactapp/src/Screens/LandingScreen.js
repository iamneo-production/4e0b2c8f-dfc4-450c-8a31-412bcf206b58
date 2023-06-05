import { Image, Title, Grid, Container } from '@mantine/core';
import HeaderBar from '../components/HeaderBar';
import {ReactComponent as LeaderSVG} from "../assets/Finance leaders.svg";

export default function LandingScreen() {
    return (
        <div>
            <HeaderBar isLandingPage={true} />
            <Container size="xl" style={{ marginTop: 88 }}>
                <Grid>
                    <Grid.Col justify="center" align="center" span={6}>
                        <Title style={{ marginTop: 70 }} size="48" align="center">Empower your finances, simplify your life.</Title>
                    </Grid.Col>
                    <Grid.Col justify="center" align="center" span={6}>
                        <LeaderSVG/>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>

    )
}