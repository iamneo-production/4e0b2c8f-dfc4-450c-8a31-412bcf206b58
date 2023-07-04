import { Flex, Button, Group, TextInput, searchValue } from '@mantine/core';
import {ReactComponent as FilterIcon} from '../../assets/Filter_alt.svg'
import {ReactComponent as SearchIcon} from '../../assets/Search.svg'
import { useState } from "react";
import TransactionForm from './TransactionFrom';

export default function TransactionHeader() {
    const [searchValue, setSearchValue] = useState("");
    const [displayTransactionForm, setDisplayTransactionForm] = useState(false)

    function handleTransactionFormClose(){
        setDisplayTransactionForm(false)
    }
    const handleInputChange = (event) => {
        const value = event.target.value;
};
    return (
        <div>
        <Group position='apart'>
            <Group position="below">
                <h2>Transactions</h2>
                <Button onClick={() => setDisplayTransactionForm(true)}>Add Transactions</Button>
                </Group>
                <Group position="below">
                <TextInput
                    my="md"c
                    icon={<SearchIcon/>}
                    radius="sm"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleInputChange}
                // onIconClick={handleIconClick}
                style={{ borderBlockColor: "transparent" }}
                />
                <Button leftIcon={<FilterIcon/>} variant="outline" color='gray' radius={"sm"}>Filter</Button>
            </Group>
            </Group>
            <TransactionForm open={displayTransactionForm} close={handleTransactionFormClose}></TransactionForm>
        </div >
    )
}