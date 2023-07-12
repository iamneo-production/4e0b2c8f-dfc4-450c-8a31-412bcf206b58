import {Badge, Flex, Table, Text} from '@mantine/core';
import ArrowRIcon from '../../assets/Arrow_alt_ltop.svg'
import ArrowGIcon from '../../assets/Arrow_alt_ldown.svg'
import Edit from '../../assets/Edit.svg'
import {useSelector} from "react-redux";
import TransactionEditForm from "./TransactionEditForm";
import {useState} from "react";

export default function TransactionList() {
    const transactionList = useSelector(state => state.transaction.transactionList)
    const [displayTransactionEditForm,setDisplayTransactionEditForm] = useState(false);
    const [selectedEditElement,setSelectedEditElement] = useState(null);
    function handleTransactionEditFormClose(){
        setDisplayTransactionEditForm(false)
    }
    function handleTransactionEditFormOpen(element){
        setSelectedEditElement(element)
        setDisplayTransactionEditForm(true)
    }
    const dateCol = (date) => {
        const dateTime = new Date(date)
        const dateoptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <Text fw={700} fz="md" style={{marginBottom:5}}>{dateTime.toLocaleDateString('en-US',dateoptions)}</Text>
                <Text fw={500} c="dimmed" fz="sm">{dateTime.toLocaleTimeString('en-US')}</Text>
            </div>
        )
    }
    const categoryCol = (category, description, id, ) => {
        return (
            <div style={{marginBottom:12}}>
                <div style={{ display: "flex",marginBottom:5,marginTop:8 }}>
                    {category.type === "income" ?
                        <img src={ArrowGIcon} /> : <img src={ArrowRIcon} />}
                    {category.type === "income" ?
                        <Text fw={700} fz="md">Received from: {<Badge color="green">{category.name}</Badge>}</Text>  : <Text fw={700} fz="md">Sent to: {<Badge  color="red">{category.name}</Badge>}</Text>}

                </div>
                <div style={{ marginLeft: "24px" }}>
                    <Text fw={500} size="xs" lineClamp={1} style={{marginBottom:3}} c="dimmed" >{description}</Text>
                    <Text fw={500} c="dimmed" fz="sm">{`Transaction ID : #${id}`}</Text>
                </div>
            </div>
        )
    }
    const accountDetails = (account, paymentType) => {
        return (
            <div style={{marginBottom:12}}>
                <Text fw={700} fz="md" style={{marginBottom:5}}>{account.name}</Text>
                <Text fw={500} c="dimmed" fz="sm">{paymentType}</Text>
            </div>
        )
    }
    const paytype = (element) => {
        return (
            <div style={{marginBottom:12}}>
                <img src={Edit} onClick={() => handleTransactionEditFormOpen(element)}/>
            </div>
        )
    }
    const amountCol = (amount, type) => {
        return (
            <div style={{marginBottom:12}}>
                {type === "income" ?
                
                <Text fw={700} fz="md" style={{marginBottom:12,color: '#26AB35'}}>{"+ Rs. " + amount.toLocaleString("en-US")}</Text> : <Text fw={700} fz="md" style={{marginBottom:12}}>{"- Rs. " + amount.toLocaleString("en-US")}</Text>}
            </div>
        )
    }
    const rows = transactionList.map((element) => (
        <tr key={element.id} >
            <td>{dateCol(element.dateTime)}</td>
            <td>{categoryCol(element.category, element.description, element.id)}</td>
            <td>{accountDetails(element.account, element.paymentType)}</td>
            <td>{amountCol(element.amount, element.category.type)}</td>
            <td>{paytype(element)}</td>
        </tr>
    ));

    return (
        <div>
            {displayTransactionEditForm && <TransactionEditForm element={selectedEditElement} open={displayTransactionEditForm}
                                                                close={handleTransactionEditFormClose}></TransactionEditForm>}
            <Table >
                <thead>
                    <tr>
                        <th><Text fw={700}  c="dimmed" >DATE & TIME</Text></th>
                        <th><Text fw={700}  c="dimmed" >TRANSACTION DETAILS</Text></th>
                        <th><Text fw={700}  c="dimmed" >ACCOUNT DETAILS</Text></th>
                        <th><Text fw={700}  c="dimmed" >AMOUNT</Text></th>
                        <th><Text c="dimmed">EDIT</Text></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}