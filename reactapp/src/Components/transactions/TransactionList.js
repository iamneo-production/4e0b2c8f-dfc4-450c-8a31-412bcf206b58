import { Flex, Table } from '@mantine/core';
import ArrowRIcon from '../../assets/Arrow_alt_ltop.svg'
import ArrowGIcon from '../../assets/Arrow_alt_ldown.svg'
import Edit from '../../assets/Edit.svg'

export default function TransactionList() {
    const TranactionsDate = [{
        id: 1,
        amount: 500,
        type: "expenses",
        accountName: "State bank of India",
        paymentType: "Credit card",
        category: "Sent to Fuel",
        categoryDetails: "At Avinash Indian oil fuel station",
        transactionId: "Transaction ID : #1",
        date: "23-06-2023",
        time: "10:05:AM"
    }, {
        id: 2,
        amount: 480,
        type: "expenses",
        accountName: "State bank of India",
        paymentType: "Credit card",
        category: "Sent to Movie",
        categoryDetails: "At Cine Planet Hyderabad",
        transactionId: "Transaction ID : #2",
        date: "23-06-2023",
        time: "10:05:AM"
    }, {
        id: 3,
        amount: 50,
        type: "expenses",
        accountName: "State bank of India",
        paymentType: "UPI",
        category: "Sent to Parking",
        categoryDetails: "At Cine Planet Hyderabad",
        transactionId: "Transaction ID : #3",
        date: "23-06-2023",
        time: "10:05:AM"
    },
        , {
        id: 4,
        amount: 50000,
        type: "income",
        accountName: "HDFC",
        paymentType: "-",
        category: "Received from Salary",
        categoryDetails: "Best Company",
        transactionId: "Transaction ID : #4",
        date: "23-06-2023",
        time: "10:05:AM"
    }]
    
    const dateCol = (date, time) => {
        return (
            <div>
                <p>{date}</p>
                <p>{time}</p>
            </div>
        )
    }
    const categoryCol = (category, categoryDetails, transactionId, type) => {
        return (
            <div>
                <div style={{ display: "flex" }}>
                    {type === "income" ?
                        <img src={ArrowGIcon} /> : <img src={ArrowRIcon} />}
                    <p>{category}</p>
                </div>
                <div style={{marginLeft:"24px"}}>
                    <p>{categoryDetails}</p>
                    <p>{transactionId}</p>
                </div>
            </div>
        )
    }
    const accountDetails = (accountName, paymentType) => {
        return (
            <div>
                <p>{accountName}</p>
                <p>{paymentType}</p>
            </div>
        )
    }
    const paytype =(paymentType) =>{
        return(
            <div>
                <img src={Edit}/>
            </div>
        )
    }
    const amountCol = (amount, type) => {
        console.log(amount)
        return (
            <div>
                {type === "income" ?
                    <p style={{ color: '#26AB35' }}>{"+ Rs. " + amount}</p> : <p>{"- Rs. " + amount}</p>}
            </div>
        )
    }
    const rows = TranactionsDate.map((element) => (
        <tr key={element.id}>
            <td>{dateCol(element.date, element.time)}</td>
            <td>{categoryCol(element.category, element.categoryDetails, element.transactionId, element.type)}</td>
            <td>{accountDetails(element.accountName, element.paymentType)}</td>
            <td>{amountCol(element.amount, element.type)}</td>
            <td>{paytype(element.paymentType)}</td>
        </tr>
    ));
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>DATE & TIME</th>
                        <th>TRANSACTION DETAILS</th>
                        <th>ACCOUNT DETAILS</th>
                        <th>AMOUNT</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}