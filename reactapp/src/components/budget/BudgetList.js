
import {Table, Text} from "@mantine/core";
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useSelector} from "react-redux";

export default function BudgetList(){
    const budgetList = useSelector(state => state.budget.budgetList)
        const rows = budgetList.map((element) => (
        <tr key={element.budgetId}>
            <td><Text fw={700}> {element.category} </Text></td>
            <td><Text fw={700}> {element.budget} </Text></td>
            <td><Text fw={700}> {element.used} (.....ui element goes here) </Text></td>
            <td><Text fw={700}> {element.left} </Text></td>
            <td>{<EditSVG/>}</td>
        </tr>
    ));

    return (
        <div style={{margin:20}}>
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
        </div>
    );

}