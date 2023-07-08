import { Flex, Title, Button, Group, Grid, TextInput, searchValue } from '@mantine/core';
import { ReactComponent as FilterIcon } from '../../assets/Filter_alt.svg'
import { ReactComponent as SearchIcon } from '../../assets/Search.svg'
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeTransactionForm, showTransactionForm} from "../../features/transactionSlice";

export default function TransactionHeader() {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch()
    function handleTransactionFormClose() {
        dispatch(closeTransactionForm())
    }
    const handleInputChange = (event) => {
        const value = event.target.value;
    };
    return (
        <div>
            <Grid justify="space-around">
                <Grid.Col span={6}>
                    <Grid>
                        <Grid.Col span={5}>
                            <Title order={1}>Transactions</Title>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button radius="md" fullWidth style={{ margin: 8 }} onClick={() => dispatch(showTransactionForm())}>Add Transactions</Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Grid>
                        <Grid.Col span={8}>
                            <TextInput
                                style={{ margin: 8 }}
                                icon={<SearchIcon />}
                                radius="md"
                                placeholder="Search..."
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button radius="md" style={{ margin: 8 }} leftIcon={<FilterIcon />} variant="outline" color='gray'>Filter</Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </div >
    )
}