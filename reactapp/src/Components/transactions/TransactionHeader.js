import { Flex, Button, Group, TextInput, searchValue } from '@mantine/core';
import {ReactComponent as FilterIcon} from '../../assets/Filter_alt.svg'
import { useState } from "react";
import {
    IconEdit,
    IconEye,
    IconSearch,
    IconTrash,
    IconPlus
} from "@tabler/icons-react";
export default function TransactionHeader() {
    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event) => {
        const value = event.target.value;
};
    return (
        <div>
        <Group position='apart'>
            <Group position="below">
                <h2>Transactions</h2>
                <Button>Add Transactions</Button>
                </Group>
                <Group position="below">
                <TextInput
                    my="md"
                    radius="md"
                    placeholder="Search..."
                    icon={<IconSearch />}
                    value={searchValue}
                    onChange={handleInputChange}
                // onIconClick={handleIconClick}
                style={{ borderBlockColor: "transparent" }}
                />
                <Button leftIcon={<FilterIcon/>} variant="light" color="dark">Filter</Button>
            </Group>
            </Group>
        </div >
    )
}