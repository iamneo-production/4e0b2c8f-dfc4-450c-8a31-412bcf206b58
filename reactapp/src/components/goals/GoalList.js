import { Table, Button,Text} from '@mantine/core';

export default function GoalList() {

    const goals = [{
        name: "Emergency fund",
        targetDate: "22 Aug 2023",
        targetAmount: 50000,
        status: "Pending"
    },
    {
        name: "Savings",
        targetDate: "31 Dec 2023",
        targetAmount: 100000,
        status: "Pending"
    },
    {
        name: "Himachal Trip",
        targetDate: "1 Nov 2023",
        targetAmount: 30000,
        status: "Pending"
    }]

    const rows = goals.map((element) => (
        <tr key={element.name}>
            <td><Text fw={700}>{element.name}</Text></td>
            <td><Text fw={700}>{element.targetDate}</Text></td>
            <td><Text fw={700}>{`Rs. ${element.targetAmount}`}</Text></td>
            <td><Text style={{color:"#F38C13"}} fw={700}>{element.status}</Text></td>
            <td>{<Button color="gray">Details</Button>}</td>
        </tr>
    ));

    return (
        <div style={{margin:20}}>
            <Table verticalSpacing="lg">
                <thead>
                    <tr>
                        <th><Text c="dimmed">NAME</Text></th>
                        <th><Text c="dimmed">TARGET DATE</Text></th>
                        <th><Text c="dimmed">TARGET AMOUNT</Text></th>
                        <th><Text c="dimmed">STATUS</Text></th>
                        <th><Text c="dimmed">DETAILS</Text></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}