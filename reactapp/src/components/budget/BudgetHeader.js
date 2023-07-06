import {Button, Grid} from '@mantine/core';
import BudgetForm from "./BudgetForm";
import React, { useState } from "react";
export default function BudgetHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    return (

            <div>
                <Grid align="center">
                    <Grid.Col span={2}><h1>Budget</h1></Grid.Col>
                    <Grid.Col span={2}>
                        <Button
                        className="openModalBtn"
                        onClick={() => {
                            setModalOpen(true);
                        }}>Add Budget
                        </Button>
                    </Grid.Col>
                </Grid>
                {modalOpen && <BudgetForm setOpenModal={setModalOpen} />}
            </div>
    )
}