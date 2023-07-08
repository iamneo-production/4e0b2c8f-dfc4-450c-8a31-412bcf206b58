import Layout from "../components/Layout"
import TransactionHeader from "../components/transactions/TransactionHeader"
import TransactionList from "../components/transactions/TransactionList"
import TransactionForm from "../components/transactions/TransactionFrom"
import {useDispatch, useSelector} from "react-redux";
import {fetchTransaction} from "../features/transactionSlice";


export default function TransactionScreen() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    dispatch(fetchTransaction({token:token}))
  return (
    <Layout title={"Transactions"} load={true}>
      <TransactionHeader />
      <TransactionList/>
      <TransactionForm/>
    </Layout>
  )
}
