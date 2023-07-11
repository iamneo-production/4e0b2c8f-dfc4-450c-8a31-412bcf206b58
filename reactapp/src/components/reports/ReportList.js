import {Card, Button, Text, Table, Group,Grid } from '@mantine/core';
import { ReactComponent as DownloadSVG } from '../../assets/Import.svg';
import {useSelector} from "react-redux";
import axios from "axios";
import {baseUrl} from "../../api/config";
import { saveAs } from 'file-saver';
import {ReactComponent as ExcelIcon} from "../../assets/ExcelFile.svg";
import {useState} from "react";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../../assets/success-icon.svg";

export default function ReportList() {

    const list = ["Transactions Report","Budgets Report","Goals Report","Debts Report"]
    const token = useSelector(state => state.user.token)
    const [transactionReportLoading,setTransactionReportLoading] = useState(false);
    async function handleTransactionReportExcel() {
        setTransactionReportLoading(true)
        try {
            const response = await axios.get(`${baseUrl}/report/transaction/excel`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob', // Set the response type to blob
            });
            const date = new Date()
            saveAs(response.data, `TransactionReport_${date.toLocaleDateString()}.xlsx`);
            setTransactionReportLoading(false)
            notifications.show({
                title: 'Started downloading...',
                message: 'see your downloads!!',
                icon: <SuccessIcon />,
                radius:"lg",
                autoClose: 5000,
            })
        } catch (error) {
            console.error('Error downloading Excel file:', error);
            setTransactionReportLoading(false)
            notifications.show({
                title: error.message,
                message: 'Please try again!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        }
    }


    return (
        <div style={{margin:30}}>
            <Grid>
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Transaction Report</Text>
                        </Group>
                        <Text size="sm" color="dimmed">
                            This will generate a full report on transaction in excel format.
                        </Text>
                        <Button loading={transactionReportLoading} onClick={() => handleTransactionReportExcel()} leftIcon={<ExcelIcon style={{height:16,width:16}}/>} variant="light" color="green" fullWidth mt="md" radius="md">
                            Download Excel Report
                        </Button>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    )
}