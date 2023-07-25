import React from 'react';
import { useStoreState,useStoreActions } from 'easy-peasy';
import { Text, Paper, Grid, Select } from '@mantine/core';
import { useSelector } from 'react-redux';

const DebtFeature = () => {
  const debtPending = useStoreState((state) => state.debtPending);
  const debtCount = useStoreState((state) => state.debtCount);
  const getData=useStoreActions((action)=>action.getData);
  const token  = useSelector(state => state.user.token);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption!==null){
      getData({token:token,value:selectedOption});
    }
    else{
      getData({token:token,value:0});
      }
    }
  return (
        <div style={{ marginBottom: 10}}>
            <Grid align='center' right={"10"}> 
              <Grid.Col span={"content"}>
                <Paper miw={"200px"} radius="md" p="md" withBorder>
                  <Text size="lg" fw={700}>
                    {debtCount}
                  </Text>
                  <Text fw={700} c="dimmed">
                    TOTAL DEBTS
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={"content"}>
                <Paper miw={"200px"} radius="md" p="md" withBorder>
                  <Text size="lg" style={{ color: "#F03C2E" }} fw={700}>
                    {debtPending}
                  </Text>
                  <Text fw={700} c="dimmed">
                    PENDING
                  </Text>
                </Paper>
              </Grid.Col>
                <Grid.Col span={"content"} style={{position:"absolute",right:"50px"}}>
            
                  <Select
                    clearable
                    data={[
                      { value: 2, label: 'due date' },
                      { value: 1, label: 'Amount' },
                    ]}
                    placeholder="Default"
                    label="sort by"
                    onChange={handleSelectChange}
                    size='sm'
                    />
                </Grid.Col>
      
            </Grid>
          </div>
  );
};

export default DebtFeature;
