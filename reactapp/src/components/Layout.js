import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import {AppShell, Text, Header,Title} from "@mantine/core";
import {ReactComponent as NoDataSVG} from "../assets/No-data.svg";
import {useSelector} from "react-redux";
import {useState} from "react";

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
                       <Title order={1}>{props.title}</Title>
                       <div style={{textAlign:"center",alignSelf:"center",marginTop:50}}>
                           <NoDataSVG/>
                           <Text>You Haven't Created Any {props.title} Yet.</Text>
                       </div>
                   </div>
                   }
               </div>
           }
       </AppShell>
   )
}