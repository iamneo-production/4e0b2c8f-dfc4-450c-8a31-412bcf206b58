import { Text,Table } from '@mantine/core';
import { ReactComponent as DownloadSVG } from '../../assets/Import.svg';
import {useSelector} from "react-redux";
import axios from "axios";
import {baseUrl} from "../../api/config";
import { saveAs } from 'file-saver';

export default function ReportList() {

    const list = ["Transactions Report","Budgets Report","Goals Report","Debts Report"]
    const token = useSelector(state => state.user.token)

    async function handleTransactionReportExcel() {
        try {
            console.log("1");
            const response = await axios.get(`${baseUrl}/report/transaction/excel`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob', // Set the response type to blob
            });
            const date = new Date()
            saveAs(response.data, `TransactionReport_${date.toLocaleDateString()}.xlsx`);
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }
    }


    return (
        <div style={{margin:30}}>
            <Table verticalSpacing="lg">
                <thead>
                <tr>
                    <th><Text c="dimmed">NAME</Text></th>
                    <th><Text c="dimmed">DOWNLOAD</Text></th>
                </tr>
                </thead>
                <tbody >
                <tr>
                    <td><Text  fw={700} >Transaction Report</Text></td>
                    <td>{<DownloadSVG onClick={() => handleTransactionReportExcel()}/>}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}