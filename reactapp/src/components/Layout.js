import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import {AppShell, Text, Header,Title} from "@mantine/core";
import {ReactComponent as NoDataSVG} from "../assets/No-data.svg";
import {useEffect, useState} from "react";

export default function Layout(props){
    const [isMobile, setIsMobile] = useState(false);
    const [navOpened, setNavOpened] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        // Add event listener on component mount
        window.addEventListener('resize', handleResize);

        // Call handleResize once on component mount
        handleResize();

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

   return(
       <AppShell
           padding="md"
           navbar={<SideBar navOpened={navOpened} isMobile={isMobile} currentPage={props.title}/>}
           header={<Header height={60} p="xs">{<HeaderBar navOpened={navOpened} setNavOpened={setNavOpened} isMobile={isMobile} />}</Header>}
       >
           {
               <div>
                   {props.load ? props.children : <div>
                       <Title style={{ margin: 5 }} order={2}>{props.title}</Title>
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