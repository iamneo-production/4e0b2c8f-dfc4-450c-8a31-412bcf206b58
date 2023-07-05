import { Box, Menu, Text, Navbar, NavLink, Button } from "@mantine/core";
import { ReactComponent as DashboardIcon } from "../assets/Widget.svg";
import { ReactComponent as TransactionsIcon } from "../assets/Collapse.svg";
import { ReactComponent as AccountsIcon } from "../assets/Database.svg";
import { ReactComponent as BudgetIcon } from "../assets/Date_range.svg";
import { ReactComponent as GoalsIcon } from "../assets/Road_finish.svg";
import { ReactComponent as DebtsIcon } from "../assets/Calendar.svg";
import { ReactComponent as ReportsIcon } from "../assets/Desk_alt.svg";
import { ReactComponent as AddIcon } from "../assets/Add_round.svg";
import CategoryForm from "./category/CategoryForm";
import { useState } from "react";

export default function SideBar(props) {
  const [diplayCategoryForm, setDiplayCategoryForm] = useState(false);
  function handleCategoryFormClose() {
    setDiplayCategoryForm(false);
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
              icon={<DashboardIcon />}
              rightSection={<></>}
              color={props.currentPage === "Dashboard" ? "dark" : "gray"}
              active={props.currentPage === "Dashboard"}
              disabled={props.currentPage === "Dashboard"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Transactions"
              icon={<TransactionsIcon />}
              rightSection={<></>}
              color={props.currentPage === "Transactions" ? "dark" : "gray"}
              active={props.currentPage === "Transactions"}
              disabled={props.currentPage === "Transactions"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Accounts"
              icon={<AccountsIcon />}
              rightSection={<></>}
              color={props.currentPage === "Accounts" ? "dark" : "gray"}
              active={props.currentPage === "Accounts"}
              disabled={props.currentPage === "Accounts"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Budgets"
              icon={<BudgetIcon />}
              rightSection={<></>}
              color={props.currentPage === "Budgets" ? "dark" : "gray"}
              active={props.currentPage === "Budgets"}
              disabled={props.currentPage === "Budgets"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Goals"
              icon={<GoalsIcon />}
              rightSection={<></>}
              color={props.currentPage === "Goals" ? "dark" : "gray"}
              active={props.currentPage === "Goals"}
              disabled={props.currentPage === "Goals"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Debts"
              icon={<DebtsIcon />}
              rightSection={<></>}
              color={props.currentPage === "Debts" ? "dark" : "gray"}
              active={props.currentPage === "Debts"}
              disabled={props.currentPage === "Debts"}
            />
            <NavLink
              style={{ borderRadius: 8, margin: 10, width: 230 }}
              label="Reports"
              icon={<ReportsIcon />}
              rightSection={<></>}
              color={props.currentPage === "Reports" ? "dark" : "gray"}
              active={props.currentPage === "Reports"}
              disabled={props.currentPage === "Reports"}
            />
          </Box>
        </Navbar.Section>
        <Navbar.Section>
          <Menu position="right" withArrow shadow="md" width={200}>
            <Menu.Target>
              <Button
                leftIcon={<AddIcon />}
                radius={"md"}
                style={{ margin: 10, width: 230 }}
              >
                New
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setDiplayCategoryForm(true)}>
                Add Category
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <CategoryForm
            open={diplayCategoryForm}
            close={handleCategoryFormClose}
          ></CategoryForm>
        </Navbar.Section>
      </Navbar>
    </div>
  );
}
