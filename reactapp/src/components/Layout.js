import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import {AppShell, Text, Header,Title} from "@mantine/core";
import {ReactComponent as NoDataSVG} from "../assets/No-data.svg";

export default function Layout(props){
   return(
       <AppShell
           padding="md"
           navbar={<SideBar currentPage={props.title}/>}
           header={<Header height={60} p="xs">{<HeaderBar/>}</Header>}
       >
           {
               <div>
                   {props.load ? props.children : <div>
                       <Title order={2}>{props.title}</Title>
                       <div style={{textAlign:"center",alignSelf:"center",marginTop:50}}>
                           <NoDataSVG/>
                           <Text>You don’t have any {props.title} yet.</Text>
                       </div>
                   </div>
                   }
               </div>
           }
       </AppShell>
   )
}