import React from "react";
import {Table, Text} from "@mantine/core";
const elements = [
    { category: 'WiFi', budget: 12.011, used: 'C', left: 'Carbon' },
    { category: 'House Rent', budget: 14.007, used: 'N', left: 'Nitrogen'},
    { category: 'Shopping', budget: 88.906, used: 'Y', left: 'Yttrium'},
    { category: 'Food', budget: 137.33, used: 'Ba', left: 'Barium'},
    { category: 'Misc', budget: 140.12, used: 'Ce', left: 'Cerium'},
];
export default function BudgetList(){
        const rows = elements.map((element) => (
        <tr key={element.name}>
            <td><Text fw={700}> {element.category} </Text></td>
            <td><Text fw={700}> {element.budget} </Text></td>
            <td><Text fw={700}> {element.used} (.....ui element goes here) </Text></td>
            <td><Text fw={700}> {element.left} </Text></td>
        </tr>
    ));

    return (
        <Table verticalSpacing="md">
            <thead>
            <tr>
                <th> <Text fw={500} c="dimmed">NAME</Text> </th>
                <th> <Text fw={500} c="dimmed">BUDGET</Text> </th>
                <th><Text fw={500} c="dimmed">USED</Text></th>
                <th> <Text fw={500} c="dimmed">LEFT</Text></th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );

}