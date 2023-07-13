import { Box, Text, Navbar, Menu, NavLink, Button } from "@mantine/core";
import { ReactComponent as DashboardIcon } from "../assets/Widget.svg";
import { ReactComponent as TransactionsIcon } from "../assets/Collapse.svg";
import { ReactComponent as AccountsIcon } from "../assets/Database.svg";
import { ReactComponent as BudgetIcon } from "../assets/Date_range.svg";
import { ReactComponent as GoalsIcon } from "../assets/Road_finish.svg";
import { ReactComponent as DebtsIcon } from "../assets/Calendar.svg";
import { ReactComponent as ReportsIcon } from "../assets/Desk_alt.svg";
import { ReactComponent as AddIcon } from "../assets/Add_round.svg";
import { ReactComponent as AddCategoryIcon } from "../assets/Folder_add_duotone_line.svg";
import { ReactComponent as AddDebtIcon } from "../assets/Calendar_add_duotone.svg";
import { ReactComponent as AddBudgetIcon } from "../assets/Date_range_duotone.svg";
import { ReactComponent as AddTransactionIcon } from "../assets/Collapse_light_duotone.svg";
import { ReactComponent as AddAccountIcon } from "../assets/Database_duotone.svg";
import { ReactComponent as AddGoalIcon } from "../assets/Road_finish_duotone_line.svg";


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryForm from "./category/CategoryForm";
import {useDispatch, useSelector} from "react-redux";
import {closeCategoryForm, fetchCategory, showCategoryForm} from "../features/categorySlice";
import {closeTransactionForm, showTransactionForm} from "../features/transactionSlice";
import {closeAccountForm, showAccountForm} from "../features/accountSlice";
import AccountForm from "./accounts/AccountForm";
import TransactionForm from "./transactions/TransactionFrom";
import BudgetForm from "./budget/BudgetForm";
import {closeBudgetForm, showBudgetForm} from "../features/budgetSlice";

export default function SideBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const displayCategoryForm = useSelector(state => state.category.displayCategoryForm)
  const displayTransactionForm = useSelector(state => state.transaction.displayTransactionForm)
  const displayAccountForm = useSelector(state => state.account.displayAccountForm)
  const displayBudgetForm = useSelector(state => state.budget.displayBudgetForm)
  const token = useSelector(state => state.user.token)
  //dispatch(fetchTransaction({token:token}))
  //dispatch(fetchCategory({token:token}))
  //dispatch(fetchAccount({token:token}))
  function handleCategoryFormClose() {
    dispatch(closeCategoryForm());
  }
  function handleTransactionFormClose() {
    dispatch(closeTransactionForm());
  }
  function handleAccountFormClose() {
    dispatch(closeAccountForm());
  }

  function handleBudgetFormClose() {
    dispatch(closeBudgetForm());
  }

  return (
    <div>
      <Navbar
        width={{
          // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
          sm: 300,

          // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
          lg: 250,

          // When other breakpoints do not match base width is used, defaults to 100%
          base: 100,
        }}
      >
        <Navbar.Section mt="xs">
          <Text fw={500} style={{ margin: 20 }}>
            Main menu
          </Text>
        </Navbar.Section>
        <Navbar.Section grow mt="md">
          <Box>
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Dashboard"
              icon={<DashboardIcon style={{width:16,height:16}}/>}
              rightSection={<></>}
              onClick={() => navigate("/dashboard")}
              active={props.currentPage === "Dashboard"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Transactions"
              icon={<TransactionsIcon  style={{width:16,height:16}} />}
              rightSection={<></>}
              onClick={() => navigate("/transaction")}
              active={props.currentPage === "Transactions"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Accounts"
              icon={<AccountsIcon style={{width:16,height:16}}/>}
              rightSection={<></>}
              onClick={() => navigate("/account")}
              active={props.currentPage === "Accounts"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Budgets"
              icon={<BudgetIcon style={{width:16,height:16}}/>}
              rightSection={<></>}
              onClick={() => navigate("/budget")}
              active={props.currentPage === "Budgets"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Goals"
              icon={<GoalsIcon style={{width:16,height:16}}/>}
              rightSection={<></>}
              onClick={() => navigate("/goal")}
              active={props.currentPage === "Goals"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Debts"
              icon={<DebtsIcon style={{width:16,height:16}}/>}
              rightSection={<></>}
              onClick={() => navigate("/debts")}
              active={props.currentPage === "Debts"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Reports"
              icon={<ReportsIcon style={{width:16,height:16}}/>}
              onClick={() => navigate("/report")}
              rightSection={<></>}
              active={props.currentPage === "Reports"}
            />
          </Box>
        </Navbar.Section>
        <Navbar.Section>
          <Menu position="right" radius={"md"} withArrow shadow="md" width={200} transitionProps={{ transition: 'scale-x', duration: 150 }}>
            <Menu.Target >
              <div style={{ padding: 10 }}>
                <Button
                    leftIcon={<AddIcon style={{width:16,height:16}}/>}
                    radius={"md"}
                    fullWidth
                >
                  Add
                </Button>
              </div>

            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<AddCategoryIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => dispatch(showCategoryForm())}>
                <Text size={"sm"}>Add Category</Text>
              </Menu.Item>
              <Menu.Item icon={<AddAccountIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => dispatch(showAccountForm())}>
                Add Account
              </Menu.Item>
              <Menu.Item icon={<AddTransactionIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => dispatch(showTransactionForm())}>
                Add Transaction
              </Menu.Item>
              <Menu.Item icon={<AddBudgetIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() =>dispatch(showBudgetForm())}>
                Add Budget
              </Menu.Item>
              <Menu.Item icon={<AddGoalIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => {}}>
                Add Goal
              </Menu.Item>
              <Menu.Item icon={<AddDebtIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => {}}>
                Add Debt
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <CategoryForm
            open={displayCategoryForm}
            close={handleCategoryFormClose}
          ></CategoryForm>
          <AccountForm
              open={displayAccountForm}
              close={handleAccountFormClose}></AccountForm>
          <TransactionForm
              open={displayTransactionForm}
              close={handleTransactionFormClose}></TransactionForm>
          <BudgetForm open={displayBudgetForm} close={handleBudgetFormClose}/>
        </Navbar.Section>
      </Navbar>
    </div>
  );
}
