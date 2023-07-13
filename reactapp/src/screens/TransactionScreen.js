import Layout from "../components/Layout"
import TransactionHeader from "../components/transactions/TransactionHeader"
import TransactionList from "../components/transactions/TransactionList"
import TransactionForm from "../components/transactions/TransactionFrom"
import {useDispatch, useSelector} from "react-redux";
import {fetchTransaction} from "../features/transactionSlice";
import {useEffect} from "react";
import {Container, Divider, Grid, Skeleton} from '@mantine/core';

export default function TransactionScreen() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const fetchTransactionInProcess = useSelector(state => state.transaction.fetchTransactionInProcess)
    useEffect(()=>{
        dispatch(fetchTransaction({token:token}))
    },[])
    const transactionList = useSelector(state => state.transaction.transactionList)
    function GridSkeleton(){
        return(
            <Grid style={{height:90}}>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                    <Skeleton height={10} mt={10} width="20%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                    <Skeleton height={8} mt={10} width="60%" radius="xl" />
                    <Skeleton height={8} mt={10} width="30%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="30%" radius="xl" />
                    <Skeleton height={10} mt={10} width="50%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={10} width="30%" radius="xl" />
                </Grid.Col>

            </Grid>
        )
    }

    function SmallGridSkeleton(){
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
  return (
    <Layout title={"Transactions"} load={transactionList.length>0}>
        {fetchTransactionInProcess ? <div>
            <Container size={"xxl"}>
                <Grid style={{marginBottom:20}}>
                    <Grid.Col span={2}>
                        <Skeleton height={16} mt={10} width="80%" radius="xl" />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Skeleton style={{marginBottom: 10}} height={36} radius="md"/>
                    </Grid.Col>
                </Grid>
                <SmallGridSkeleton></SmallGridSkeleton>
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
                <TransactionHeader />
                <TransactionList/>
                <TransactionForm/>
            </div>}

    </Layout>
  )
}
