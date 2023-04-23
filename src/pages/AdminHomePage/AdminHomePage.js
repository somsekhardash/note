import React, { useState, useEffect } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import './../AdminHome/AdminHome.css'
import { AdminTable } from './AdminTable'
import AdminBash from './AdminBash'
import { Input, Menu, Button } from 'semantic-ui-react'
import { AdminHomePageContainer } from './style'
import { ConditionalRender } from './../../Utils'
import { Form, Checkbox, Modal } from 'semantic-ui-react'
import { CreateExpense } from '../../components/CreateExpense/CreateExpense'
import { CreateReport } from '../../components/CreateReport/CreateReport'

import { AppContext } from './../../Reducer'

export function AdminHomePage() {
    const { expenses, reports, isLoading } = React.useContext(AppContext)

    let expensesData = expenses[0]?.filter((exp) => exp.frequency === 'MONTHLY')
    let reportsData = reports[0]

    console.log(expensesData, reportsData)
    console.log('================')

    const [month, setMonth] = useState(new Date().getUTCMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())

    const [currentDate, setCurrentDate] = useState(new Date())
    const [showExpanseModal, setShowExpanseModal] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [tableView, setTableView] = useState(false)

    const onDateChange = (event, data) => {
        setMonth(new Date(data.value).getUTCMonth() + 1)
        setYear(new Date(data.value).getFullYear())
        setCurrentDate(data.value)
        // plzFetchReports({
        //     month: (new Date(data.value).getUTCMonth() + 1).toString(),
        //     year: new Date(data.value).getFullYear().toString(),
        // })
    }

    if (isLoading || !reportsData || !expensesData) return <p>Loading...</p>

    reportsData = reportsData.reduce((acc, report) => {
        const f_acc = acc.filter(
            (accreport) => accreport.expenseId !== report.expenseId
        )
        return [...f_acc, report]
    }, [])

    const finalResult = expensesData.reduce((acc, expance) => {
        if (acc && !acc.map((acc) => acc.expenseId).includes(expance._id)) {
            return [...acc, expance]
        }
        return acc
    }, reportsData)

    return (
        <div className="admin-home ui container">
            <AdminHomePageContainer>
                <Menu>
                    <Menu.Item>
                        <SemanticDatepicker
                            onChange={onDateChange}
                            value={currentDate}
                        />
                    </Menu.Item>
                    <Form.Field className="center-menu">
                        <Modal
                            onClose={() => setShowExpanseModal(false)}
                            onOpen={() => setShowExpanseModal(true)}
                            open={showExpanseModal}
                            trigger={
                                <Button primary>Create Expense Modal</Button>
                            }
                        >
                            <CreateExpense />
                        </Modal>

                        <Modal
                            onClose={() => setShowReportModal(false)}
                            onOpen={() => setShowReportModal(true)}
                            open={showReportModal}
                            trigger={
                                <Button secondary>Create Report Modal</Button>
                            }
                        >
                            <CreateReport
                                expensesData={expensesData}
                                reportData={{
                                    isCompleted: true,
                                }}
                            />
                        </Modal>
                        <Checkbox
                            toggle
                            label="View"
                            checked={tableView}
                            onClick={() =>
                                setTableView((tableView) => !tableView)
                            }
                        />
                    </Form.Field>
                    <Menu.Item position="right">
                        <Input
                            className="icon"
                            icon="search"
                            placeholder="Search..."
                        />
                    </Menu.Item>
                </Menu>
            </AdminHomePageContainer>
            <ConditionalRender shouldRender={tableView}>
                <AdminTable month={month} year={year} reports={finalResult} />
            </ConditionalRender>
            <ConditionalRender shouldRender={!tableView}>
                <AdminBash
                    month={month}
                    year={year}
                    reports={finalResult}
                    expenses={expensesData}
                />
            </ConditionalRender>
        </div>
    )
}
