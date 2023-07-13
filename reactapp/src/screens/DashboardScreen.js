import Layout from "../components/Layout";
import {validateToken} from "../features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAccount} from "../features/accountSlice";

export default function  DashboardScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        dispatch(validateToken(token))
    },[])

    return(
        <Layout title={"Dashboard"} load={false}>
            <div>
                {/*
                    Code here
                */}
            </div>
        </Layout>
    )
}