
import { Text,Table } from '@mantine/core';
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useSelector} from "react-redux";
export default function AccountList() {
    const accountList = useSelector(state => state.account.accountList)
    const accounts = [{
        accountname:"State Bank of India",
        totalDeposit:50788,
        totalWithdrawal:48185,
        currentBalance:2185
    },
    {
        accountname:"Paytm Payment Bank",
        totalDeposit:20788,
        totalWithdrawal:2365,
        currentBalance:18305
    },
    {
        accountname:"HDFC Bank",
        totalDeposit:15788,
        totalWithdrawal:14895,
        currentBalance:985
    }]

    const rows = accountList.map((element) => (
        <tr key={element.id}>
          <td><Text fw={700}>{element.name}</Text></td>
          <td><Text fw={700}>{`Rs. ${element.totalDeposit}`}</Text></td>
          <td><Text fw={700}>{`Rs. ${element.totalWithdrawal}`}</Text></td>
          <td><Text fw={700}>{`Rs. ${element.currentBalance}`}</Text></td>
          <td>{<EditSVG/>}</td>
        </tr>
      ));

    return (
        <div style={{margin:20}}>
            <Table verticalSpacing="lg">
                <thead>
                    <tr>
                        <th><Text c="dimmed">ACCOUNT DETAILS</Text></th>
                        <th><Text c="dimmed">TOTAL DEPOSIT</Text></th>
                        <th><Text c="dimmed">TOTAL WITHDRAWAL</Text></th>
                        <th><Text c="dimmed">CURRENT BALANCE</Text></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}