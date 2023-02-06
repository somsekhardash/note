import React, { useState, useEffect } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import './../AdminHome/AdminHome.css'
import { useQuery, gql } from '@apollo/client'
import { AdminTable } from './AdminTable'
import AdminBash from './AdminBash'
import { Input, Menu } from 'semantic-ui-react'
import { AdminHomePageContainer } from './style'
import { ConditionalRender } from './../../Utils'
import { Fetch_Reports, Fetch_Expenses } from './../../Querys'
import { Form, Checkbox } from 'semantic-ui-react'

export function AdminHomePage() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const iMonth = urlSearchParams.get('month') || new Date().getUTCMonth() + 1
    const iYear = urlSearchParams.get('year') || new Date().getFullYear()

    const [month, setMonth] = useState(iMonth)
    const [year, setYear] = useState(iYear)

    const [currentDate, setNewDate] = useState(new Date())
    const [tableView, setTableView] = useState(false)

    const {
        loading: fetchReportsLoader,
        error: fetchReportsError,
        data: fetchReportsData,
        refetch: plzFetchReports,
    } = useQuery(Fetch_Reports, {
        variables: { month: month.toString(), year: year.toString() },
        notifyOnNetworkStatusChange: true,
    })

    const onDateChange = (event, data) => {
        setMonth(new Date(data.value).getUTCMonth() + 1)
        setYear(new Date(data.value).getFullYear())
        setNewDate(data.value)
        plzFetchReports({
            month: (new Date(data.value).getUTCMonth() + 1).toString(),
            year: new Date(data.value).getFullYear().toString(),
        })
    }

    const {
        loading: fetchExpensesLoader,
        error: fetchExpensesError,
        data: fetchExpensesData,
    } = useQuery(Fetch_Expenses, {
        variables: {
            frequency: 'MONTHLY',
        },
        notifyOnNetworkStatusChange: true,
    })

    const expensesData = fetchExpensesData?.fetchExpenses?.data

    if (fetchReportsLoader || fetchExpensesLoader) return <p>Loading...</p>
    if (fetchReportsError || fetchExpensesError) return <p>...Error...</p>

    let newReports = fetchReportsData?.fetchReports?.data

    newReports = newReports.reduce((acc, report) => {
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
    }, newReports)

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
                    <Form.Field>
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
