
import { Text,Table } from '@mantine/core';
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useSelector} from "react-redux";
import {useState} from "react";
import AccountEditForm from "./AccountEditForm";
export default function AccountList() {
    const accountList = useSelector(state => state.account.accountList)
    const [displayAccountEditForm,setDisplayAccountEditForm] = useState(false);
    const [selectedEditElement,setSelectedEditElement] = useState(null);
    function handleEdit(element){
        setSelectedEditElement(element)
        setDisplayAccountEditForm(true)
    }

    function handleAccountEditFormClose(){
        setDisplayAccountEditForm(false)
    }
    const rows = accountList.map((element) => (
        <tr key={element.accountId}>
          <td><Text fw={700}>{element.name}</Text></td>
          <td><Text fw={700}>{`Rs. ${element.totalIncome.toLocaleString("en-US")}`}</Text></td>
          <td><Text fw={700}>{`Rs. ${element.totalExpenses.toLocaleString("en-US")}`}</Text></td>
          <td><Text fw={700} style={{color: "#26AB35"}}>{`Rs. ${element.currentBalance.toLocaleString("en-US")}`}</Text></td>
          <td>{<EditSVG onClick={() => handleEdit(element) }/>}</td>
        </tr>
      ));

    return (
        <div >
            {displayAccountEditForm && <AccountEditForm element={selectedEditElement} open={displayAccountEditForm}  close={handleAccountEditFormClose} />}
            <Table verticalSpacing="lg">
                <thead>
                    <tr>
                        <th><Text c="dimmed">ACCOUNT DETAILS</Text></th>
                        <th><Text c="dimmed">TOTAL INCOME</Text></th>
                        <th><Text c="dimmed">TOTAL EXPENSES</Text></th>
                        <th><Text c="dimmed">CURRENT BALANCE</Text></th>
                        <th><Text c="dimmed">EDIT</Text></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}