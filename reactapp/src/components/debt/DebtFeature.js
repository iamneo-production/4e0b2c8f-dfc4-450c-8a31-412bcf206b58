import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Text, Paper, Grid } from '@mantine/core';

const DebtFeature = () => {
  const debtPending = useStoreState((state) => state.debtPending);
  const debtCount = useStoreState((state) => state.debtCount);

  return (
          <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={3}>
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700}>{debtCount}</Text>
                        <Text fw={700} c="dimmed">TOTAL DEBTS</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Paper shadow="sm" radius="md" p="md" withBorder>
                        <Text size={"lg"} style={{color:"#F03C2E"}} fw={700}>{debtPending}</Text>
                        <Text fw={700} c="dimmed">PENDING</Text>
                    </Paper>
                </Grid.Col>
              </Grid>
            </div>
            //     <Grid>
            //     <Grid.Col span={2}>
            //         <Paper 
            //           radius="md" 
            //           p="md" 
            //           withBorder
            //           shadow='sm'
            //           >
            //             <Text style={{fontSize:"18px"}}>
            //               <b>{`${debtCount}`}</b>
            //               </Text>
            //             <Text 
            //               style={{fontSize:"16px"}}
            //               color='grey'
            //               c="dimmed"
            //               >
            //               <b>TOTAL DEBT</b>
            //               </Text>
            //         </Paper>
            //     </Grid.Col>
                
            //     <Grid.Col span={2}>
            //         <Paper 
            //           radius="md"
            //           p="md" 
            //           withBorder 
            //           shadow='sm'
            //           >
            //             <Text style={{color:"#F03C2E",fontSize:"18px"}} >
            //               <b>{`${debtPending}`}</b>
            //               </Text>
            //             <Text 
            //               color='grey'
            //               style={{fontSize:"16px"}}
            //               c="dimmed">
            //               <b>PENDING</b>
            //               </Text>
            //         </Paper>
            //     </Grid.Col>
            // </Grid>
  );
};

export default DebtFeature;
