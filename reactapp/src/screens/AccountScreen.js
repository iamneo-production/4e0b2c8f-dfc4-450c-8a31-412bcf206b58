import Layout from "../components/Layout";
import AccountHeader from "../components/accounts/AccountHeader";
import AccountFeature from "../components/accounts/AccountFeature";
import AccountList from "../components/accounts/AccountList";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccount} from "../features/accountSlice";


export default function  AccountScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    dispatch(fetchAccount({token:token}))
    return(
        <Layout title={"Accounts"} load={true}>
            <AccountHeader/>
            <AccountFeature/>
            <AccountList/>
            
        </Layout>
)
}