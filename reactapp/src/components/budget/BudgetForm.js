import React from "react";
import "./modal.css";
import {NumberInput, Select} from "@mantine/core";

function BudgetForm({ setOpenModal }) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        x
                    </button>
                </div>
                <div className="title">
                    <h1>Add Budget</h1>
                </div>
                <div className="body">

                    <Select
                        label="Category"
                        placeholder="Select Category"
                        searchable
                        nothingFound="No options"
                        data={['WiFi', 'House Rent', 'Shopping', 'Food']}
                    />
                </div>
                <div className="body2">

                    <>
                        <NumberInput
                            label="Budget"
                            placeholder="Enter Budget"
                            hideControls
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `₹ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '₹ '
                            }
                        />
                    </>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}

export default BudgetForm;