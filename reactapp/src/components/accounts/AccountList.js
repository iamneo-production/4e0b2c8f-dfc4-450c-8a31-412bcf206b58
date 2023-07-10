
import { Text,Table } from '@mantine/core';
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useSelector} from "react-redux";
export default function AccountList() {
    const accountList = useSelector(state => state.account.accountList)
    const rows = accountList.map((element) => (
        <tr key={element.accountId}>
          <td><Text fw={700}>{element.name}</Text></td>
          <td><Text fw={700}>{`Rs. ${0}`}</Text></td>
          <td><Text fw={700}>{`Rs. ${0}`}</Text></td>
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