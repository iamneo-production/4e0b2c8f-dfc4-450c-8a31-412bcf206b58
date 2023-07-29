import React,{useState} from 'react';
import { Grid, Title,Button } from '@mantine/core';
import DebtForm from './DebtForm';

const DebtHeader = () => {
  const [debtFormOpen, setDebtFormOpen] = useState(false);

  const openDebtForm = () => {
    setDebtFormOpen((prev) => !prev);
  };
  return (
    <div style={{marginBottom:10}}>
        <Grid>
          <Grid.Col span={"content"}>
              <Title style={{ margin: 5 }} order={2}>Debts</Title>
          </Grid.Col>
          <Grid.Col style={{margin:8}} span={"content"}>
              <Button radius="md" miw={"120px"} onClick={openDebtForm} fullWidth>
                  New Debt
              </Button>
              <DebtForm isOpen={debtFormOpen} onClose={openDebtForm}/>
          </Grid.Col>
        </Grid>
    </div>
  );
};

export default DebtHeader;
