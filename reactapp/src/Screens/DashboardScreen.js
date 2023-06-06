import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import {AppShell, Text, Header,Title} from "@mantine/core";
import {ReactComponent as NoDataSVG} from "../assets/No-data.svg";

export default function  DashboardScreen(){
    return(
        <div>
            <AppShell
                padding="md"
                navbar={<SideBar/>}
                header={<Header height={60} p="xs">{<HeaderBar/>}</Header>}
            >
                {
                    <div>
                        <Title order={2}>Dashboard</Title>
                        <div style={{textAlign:"center",alignSelf:"center",marginTop:50}}>
                            <NoDataSVG/>
                            <Text>You don’t have any transactions yet.</Text>
                        </div>
                    </div>


                }
            </AppShell>
        </div>
    )
}