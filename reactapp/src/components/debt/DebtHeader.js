import React, { useState } from 'react';
import { Grid,Button, Title } from '@mantine/core';
import DebtForm from './DebtForm';

const DebtHeader = () => {
  // const [form,setForm]=useState(false);
  // const formOpen=()=>{
  //   console.log("hii")
  //   setForm(true);
  //   return <DebtForm formOpen={form} />
  // };
  return (
    <div style={{marginBottom:10}}>
        <Grid>
          <Grid.Col span={"content"}>
              <Title style={{ margin: 5 }} order={2}>Debts</Title>
          </Grid.Col>
          <DebtForm />
        </Grid>
    </div>
  );
};

export default DebtHeader;
