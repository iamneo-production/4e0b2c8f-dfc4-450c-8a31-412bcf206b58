import React from 'react';
import DebtFeature from '../components/debt/DebtFeature';
import DebtList from '../components/debt/DebtList';
import DebtHeader from '../components/debt/DebtHeader';
import Layout from "../components/Layout";
import { useStoreActions } from 'easy-peasy';
import { useSelector } from 'react-redux';

const DebtScreen = () => {
  const token  = useSelector(state => state.user.token)
  const getData=useStoreActions((action)=>action.getData);
  getData({token:token,value:0});

  return (
        <Layout title={"Debts"} load={true}>
            <DebtHeader />
            <DebtFeature />
            <DebtList />
        </Layout>
  );
};

export default DebtScreen;
