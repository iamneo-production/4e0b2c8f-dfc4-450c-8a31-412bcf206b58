import Layout from "../components/Layout"
import TransactionHeader from "../components/transactions/TransactionHeader"
import TransactionList from "../components/transactions/TransactionList"
import TransactionForm from "../components/transactions/TransactionFrom"
import {useDispatch, useSelector} from "react-redux";
import {fetchTransaction} from "../features/transactionSlice";
import {useEffect} from "react";


export default function TransactionScreen() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        dispatch(fetchTransaction({token:token}))
    },[])
    const transactionList = useSelector(state => state.transaction.transactionList)
  return (
    <Layout title={"Transactions"} load={transactionList.length>0}>
      <TransactionHeader />
      <TransactionList/>
      <TransactionForm/>
    </Layout>
  )
}
