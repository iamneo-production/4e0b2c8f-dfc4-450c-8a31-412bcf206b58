import {useState} from "react";
import {Avatar, Button, Group, Table, Text, UnstyledButton} from "@mantine/core";
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useDispatch, useSelector} from "react-redux";
import {showBudgetForm} from "../../features/budgetSlice";
import BudgetForm from "./BudgetForm";

export default function BudgetList(){
        const dispatch= useDispatch()

        const [rowToEdit,setRowToEdit]=useState(null)

    //needs fix
    const handleEditRow = (idx) =>{setRowToEdit(idx); dispatch(showBudgetForm())}

        const budgetList = useSelector(state => state.budget.budgetList)
        const rows = budgetList.map((element) => (
        <tr key={element.budgetId}>
            <td><Text fw={700}> {element.category.name} </Text></td>
            <td><Text fw={700}> {element.amount} </Text></td>
            <td><Text fw={700}> {element.used} (.....progress bar) </Text></td>
            <td><Text fw={700}> {element.left} </Text></td>
            <td><Button variant="subtle" leftIcon={<EditSVG/>} onClick={()=>handleEditRow()}/></td>
        </tr>
    ));

    return (
        <div style={{margin:20}}>
            <Table verticalSpacing="md" >
                <thead>
                <tr>
                    <th> <Text c="dimmed">NAME</Text> </th>
                    <th> <Text c="dimmed">BUDGET</Text> </th>
                    <th> <Text c="dimmed">USED</Text></th>
                    <th> <Text c="dimmed">LEFT</Text></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );


}