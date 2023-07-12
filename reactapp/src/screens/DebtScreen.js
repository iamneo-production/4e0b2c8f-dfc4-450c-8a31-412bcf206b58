import React from 'react';
import DebtFeature from '../components/debt/DebtFeature';
import DebtList from '../components/debt/DebtList';
import DebtForm from '../components/debt/DebtForm';
import DebtHeader from '../components/debt/DebtHeader';
import Layout from "../components/Layout";
import { useStoreActions } from 'easy-peasy';
import { useSelector } from 'react-redux';

const DebtScreen = () => {
  const token  = useSelector(state => state.user.token)
  const getData=useStoreActions((action)=>action.getData);
  getData(token);

  return (
        <Layout title={"Debts"} load={true}>
          <div style={{ display: 'flex'}}>
            <DebtHeader />
          </div>
          <div>
            <DebtFeature />
            {/* { (!debts || debts.length ===0 ) ? (
                <NoDebt />
              ) : ( */}
                <DebtList />
              {/* )} */}
          </div>
        </Layout>
  );
};

export default DebtScreen;
