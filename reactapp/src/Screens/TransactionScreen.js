import Layout from "../components/Layout"
import { Button } from '@mantine/core';
export default function TransactionScreen() {
    return (
        <Layout title={"Transactions"} load={true}>
            <div>
                <Button>
                    Settings
                </Button>

            </div>
        </Layout>
    )
}