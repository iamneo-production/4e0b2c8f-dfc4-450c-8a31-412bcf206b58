import React from 'react';
import { Grid, Title } from '@mantine/core';
import DebtForm from './DebtForm';

const DebtHeader = () => {
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
