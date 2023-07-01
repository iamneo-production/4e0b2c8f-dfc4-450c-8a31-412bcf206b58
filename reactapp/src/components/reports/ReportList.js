import { Text,Table } from '@mantine/core';
import { ReactComponent as DownloadSVG } from '../../assets/Import.svg';


export default function ReportList() {

  const list = ["Transactions Report","Budgets Report","Goals Report","Debts Report"]

  const rows = list.map((element) => (
    
     <tr key={element.name}>
     <td><Text  fw={700} >{element}</Text></td>
     <td>{<DownloadSVG/>}</td>
   </tr>
    
  ));

  return (
    <div style={{margin:30}}>
      <Table verticalSpacing="lg">
        <thead>
          <tr>
            <th><Text c="dimmed">NAME</Text></th>
            <th><Text c="dimmed">DOWNLOAD</Text></th>
          </tr>
        </thead>
        <tbody >{rows}</tbody>
      </Table>
    </div>
  )
}