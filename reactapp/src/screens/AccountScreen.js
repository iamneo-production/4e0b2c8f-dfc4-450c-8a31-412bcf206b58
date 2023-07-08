import Layout from "../components/Layout";
import AccountHeader from "../components/accounts/AccountHeader";
import AccountFeature from "../components/accounts/AccountFeature";
import AccountList from "../components/accounts/AccountList";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccount} from "../features/accountSlice";
import {useEffect} from "react";
import {fetchTransaction} from "../features/transactionSlice";


export default function  AccountScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        dispatch(fetchAccount({token:token}))
    },[])
    const accountList = useSelector(state => state.account.accountList)
    return(
        <Layout title={"Accounts"} load={accountList.length>0}>
            <AccountHeader/>
            <AccountFeature/>
            <AccountList/>
        </Layout>
)
}