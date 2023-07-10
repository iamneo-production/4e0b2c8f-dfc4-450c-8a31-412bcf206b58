import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Text, Paper, Grid } from '@mantine/core';

const DebtFeature = () => {
  const debtPending = useStoreState((state) => state.debtPending);
  const debtCount = useStoreState((state) => state.debtCount);

  return (

                <Grid>
                <Grid.Col span={2}>
                    <Paper 
                      radius="md" 
                      p="md" 
                      withBorder>
                        <Text style={{fontSize:"24px"}}>
                          <b>{`${debtCount}`}</b>
                          </Text>
                        <Text 
                          style={{fontSize:"17px"}}
                          color='grey'>
                          <b>TOTAL DEBT</b>
                          </Text>
                    </Paper>
                </Grid.Col>
                
                <Grid.Col span={2}>
                    <Paper 
                      radius="md"
                      p="md" 
                      withBorder 
                      style={{fontSize:"17px"}}>
                        <Text style={{color:"#F03C2E",fontSize:"24px"}} >
                          <b>{`${debtPending}`}</b>
                          </Text>
                        <Text 
                          color='grey'
                          style={{fontSize:"17px"}}>
                          <b>PENDING</b>
                          </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
  );
};

export default DebtFeature;
