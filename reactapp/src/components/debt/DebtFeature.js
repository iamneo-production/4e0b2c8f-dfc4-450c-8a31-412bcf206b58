import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Text, Paper, Grid } from '@mantine/core';

const DebtFeature = () => {
  const debtPending = useStoreState((state) => state.debtPending);
  const debtCount = useStoreState((state) => state.debtCount);

  return (
          <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={"content"}>
                    <Paper
                      miw={"200px"}
                      radius="md" 
                      p="md" 
                      withBorder>
                        <Text size={"lg"} fw={700}>
                          {debtCount}
                        </Text>
                        <Text fw={700} c="dimmed">
                          TOTAL DEBTS
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Paper
                      miw={"200px"}
                      radius="md"
                      p="md" 
                      withBorder>
                        <Text size={"lg"} style={{color:"#F03C2E"}} fw={700}>
                          {debtPending}
                        </Text>
                        <Text fw={700} c="dimmed">
                          PENDING
                        </Text>
                    </Paper>
                </Grid.Col>
              </Grid>
            </div>
  );
};

export default DebtFeature;
