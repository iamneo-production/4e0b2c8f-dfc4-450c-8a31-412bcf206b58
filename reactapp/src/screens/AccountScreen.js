import Layout from "../components/Layout";
import AccountHeader from "../components/accounts/AccountHeader";
import AccountFeature from "../components/accounts/AccountFeature";
import AccountList from "../components/accounts/AccountList";


export default function  AccountScreen(){
    return(
        <Layout title={"Accounts"} load={true}>
            <AccountHeader/>
            <AccountFeature/>
            <AccountList/>
            
        </Layout>
)
}