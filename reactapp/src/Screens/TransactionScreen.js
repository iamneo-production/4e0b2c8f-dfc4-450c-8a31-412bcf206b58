import Layout from "../components/Layout"
import TransactionHeader from "../components/transactions/TransactionHeader"
import TransactionList from "../components/transactions/TransactionList"
import TransactionForm from "../components/transactions/TransactionFrom"


export default function TransactionScreen() {
  return (
    <Layout load={true}>
      <TransactionHeader />
      <TransactionList/>
      <TransactionForm/>
    </Layout>
  )
}
