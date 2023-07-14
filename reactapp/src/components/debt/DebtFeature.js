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
          <div style={{ marginBottom: 10 }}>
            <Grid alignItems="center"> 
              <Grid.Col span={3}>
                <Paper shadow="sm" radius="md" p="md" withBorder>
                  <Text size="lg" fw={700}>
                    {debtCount}
                  </Text>
                  <Text fw={700} c="dimmed">
                    TOTAL DEBTS
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={3}>
                <Paper shadow="sm" radius="md" p="md" withBorder>
                  <Text size="lg" style={{ color: "#F03C2E" }} fw={700}>
                    {debtPending}
                  </Text>
                  <Text fw={700} c="dimmed">
                    PENDING
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <div style={{ 
                        display: "flex", 
                        alignItems: "center",
                        justifyContent: "flex-end",
                         }}>
                  <Select
                    clearable
                    data={[
                      { value: 2, label: 'due date' },
                      { value: 1, label: 'Amount' },
                    ]}
                    placeholder="sort by"
                    label="sort by"
                    onChange={handleSelectChange}
                    size='sm'
                    />

                </div>
              </Grid.Col>
            </Grid>
          </div>
  );
};

export default DebtFeature;
