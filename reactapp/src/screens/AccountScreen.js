import Layout from "../components/Layout";
import AccountHeader from "../components/accounts/AccountHeader";
import AccountFeature from "../components/accounts/AccountFeature";
import AccountList from "../components/accounts/AccountList";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccount} from "../features/accountSlice";
import {useEffect} from "react";
import {Container, Divider, Grid, Skeleton} from "@mantine/core";


export default function  AccountScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        dispatch(fetchAccount({token:token}))
    },[])
    const fetchAccountInProcess = useSelector(state => state.account.fetchAccountInProcess)
    const accountList = useSelector(state => state.account.accountList)
    function GridSkeleton(){
        return(
            <Grid style={{height:60}}>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="30%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={10} width="30%" radius="xl" />
                </Grid.Col>

            </Grid>
        )
    }
    return(
        <Layout title={"Accounts"} load={accountList.length>0}>
            {fetchAccountInProcess    ? <div>
                    <Container size={"xxl"}>
                        <Grid style={{marginBottom:10}}>
                            <Grid.Col span={2}>
                                <Skeleton height={16} mt={10} width="80%" radius="xl" />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={36} radius="md"/>
                            </Grid.Col>
                        </Grid>
                        <Grid style={{marginBottom:20}}>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={80} radius="md"/>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={80} radius="md"/>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={80} radius="md"/>
                            </Grid.Col>
                        </Grid>
                        <GridSkeleton></GridSkeleton>
                        <Divider style={{marginBottom:20}}></Divider>
                        <GridSkeleton></GridSkeleton>
                        <Divider style={{marginBottom:10}}></Divider>
                        <GridSkeleton></GridSkeleton>
                        <Divider style={{marginBottom:10}}></Divider>
                        <GridSkeleton></GridSkeleton>
                        <Divider style={{marginBottom:10}}></Divider>
                        <GridSkeleton></GridSkeleton>
                    </Container>
                </div> :
                <div>
                    <AccountHeader/>
                    <AccountFeature/>
                    <AccountList/>
                </div>}

        </Layout>
)
}