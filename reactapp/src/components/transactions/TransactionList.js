import { Flex, Table, Text } from '@mantine/core';
import ArrowRIcon from '../../assets/Arrow_alt_ltop.svg'
import ArrowGIcon from '../../assets/Arrow_alt_ldown.svg'
import Edit from '../../assets/Edit.svg'
import {useDispatch, useSelector} from "react-redux";

export default function TransactionList() {
    const transactionList = useSelector(state => state.transaction.transactionList)
    const dateCol = (date) => {
        const dateTime = new Date(date)
        const dateoptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <Text fw={700} fz="md" style={{marginBottom:12}}>{dateTime.toLocaleDateString('en-US',dateoptions)}</Text>
                <Text fw={500} c="dimmed" fz="sm">{dateTime.toLocaleTimeString('en-US')}</Text>
            </div>
        )
    }
    const categoryCol = (category, description, id, ) => {
        return (
            <div style={{marginBottom:12}}>
                <div style={{ display: "flex",marginBottom:8,marginTop:8 }}>
                    {category.type === "income" ?
                        <img src={ArrowGIcon} /> : <img src={ArrowRIcon} />}
                    <Text fw={700} fz="md">{category.name}</Text>
                </div>
                <div style={{ marginLeft: "24px" }}>
                    <Text fw={500} style={{marginBottom:8}} c="dimmed" fz="sm">{description}</Text>
                    <Text fw={500} c="dimmed" fz="sm">{`Transaction ID : #${id}`}</Text>
                </div>
            </div>
        )
    }
    const accountDetails = (account, paymentType) => {
        return (
            <div style={{marginBottom:12}}>
                <Text fw={700} fz="md" style={{marginBottom:12}}>{account.name}</Text>
                <Text fw={500} c="dimmed" fz="sm">{paymentType}</Text>
            </div>
        )
    }
    const paytype = (paymentType) => {
        return (
            <div style={{marginBottom:12}}>
                <img src={Edit} />
            </div>
        )
    }
    const amountCol = (amount, type) => {
        return (
            <div style={{marginBottom:12}}>
                {type === "income" ?
                
                <Text fw={700} fz="md" style={{marginBottom:12,color: '#26AB35'}}>{"+ Rs. " + amount}</Text> : <Text fw={700} fz="md" style={{marginBottom:12}}>{"- Rs. " + amount}</Text>}
            </div>
        )
    }
    const rows = transactionList.map((element) => (
        <tr key={element.id} >
            <td>{dateCol(element.dateTime)}</td>
            <td>{categoryCol(element.category, element.description, element.id)}</td>
            <td>{accountDetails(element.account, element.paymentType)}</td>
            <td>{amountCol(element.amount, element.category.type)}</td>
            <td>{paytype(element.paymentType)}</td>
        </tr>
    ));
    return (
        <div>
            <Table style={{marginTop:10}}>
                <thead>
                    <tr>
                        <th><Text fw={700}  c="dimmed" >DATE & TIME</Text></th>
                        <th><Text fw={700}  c="dimmed" >TRANSACTION DETAILS</Text></th>
                        <th><Text fw={700}  c="dimmed" >ACCOUNT DETAILS</Text></th>
                        <th><Text fw={700}  c="dimmed" >AMOUNT</Text></th>
                        <th><Text fw={700}  c="dimmed" ></Text></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}