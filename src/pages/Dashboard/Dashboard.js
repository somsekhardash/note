import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    DashboardLayout,
    DashboardSidebar,
    DashboardBody,
    DashboardHeader,
    DashCardV1,
    DashCardV2,
    DashCardV3,
    DashCardV4,
} from './style'
import { AppContext } from './../../Reducer'
import { ReportList } from '../NewDashboard/ReportList'
import { ExpenseList } from '../NewDashboard/ExpenseList'
import { ExpenseTree } from './ExpenseTree'
import SaveOrSubmit from './../../components/SaveOrSubmit/SaveOrSubmit'
import { Card } from 'semantic-ui-react'

function Dashboard(props) {
    let { expenses, reports, isLoading, today, setReport, selectedReport } =
        React.useContext(AppContext)

    const [reportPopup, setReportPopup] = useState({
        show: false,
        type: 'EDIT',
    })

    let totalEstimate,
        paidAmount = 0

    const month = today.getUTCMonth() + 1
    const year = today.getFullYear()

    if (!reports.length || !expenses.length) return null

    reports = reports.reduce((acc, report) => {
        const f_acc = acc.filter(
            (accreport) => accreport.expenseId !== report.expenseId
        )
        return [...f_acc, report]
    }, [])

    const existingExpencesInReports = reports.map((report) => report.expenseId)
    const youMightLikeExp = expenses.reduce((acc, expance) => {
        if (
            expance &&
            !existingExpencesInReports.includes(expance._id) &&
            expance.frequency === 'MONTHLY'
        ) {
            return [...acc, expance]
        }
        return acc
    }, [])

    const showModal = (show) => {
        if (!show) setReport(null)
    }

    const updateType = (res) => {
        setReportPopup((prev) => ({
            ...prev,
            type: res,
        }))
    }

    if (reports.length)
        totalEstimate = reports.reduce((acc, rec) => {
            return acc + rec.amount
        }, 0)

    if (reports.length)
        paidAmount = reports.reduce((acc, report) => {
            const localMonth = report.paidDate
                ? new Date(parseFloat(report.paidDate)).getUTCMonth() + 1
                : ''
            const localYear = report.paidDate
                ? new Date(parseFloat(report.paidDate)).getFullYear()
                : ''
            const isCompleted =
                report.isCompleted && month === localMonth && year === localYear

            if (isCompleted) return acc + report.amount
            else return acc
        }, 0)

    return (
        <DashboardLayout>
            <DashboardHeader></DashboardHeader>
            <DashboardSidebar></DashboardSidebar>
            <DashboardBody>
                <DashCardV1>
                    <Card header="Total" meta={paidAmount || '0'} />
                </DashCardV1>
                <DashCardV1>
                    <Card header="Estimate" meta={totalEstimate || '0'} />
                </DashCardV1>
                <DashCardV1></DashCardV1>
                <DashCardV1></DashCardV1>
                <DashCardV2>
                    <ReportList
                        reports={reports}
                        month={month}
                        year={year}
                        setReport={setReport}
                        updateType={updateType}
                    />
                    {selectedReport && (
                        <SaveOrSubmit
                            report={selectedReport}
                            show={selectedReport}
                            expenses={expenses}
                            showModal={showModal}
                            type={reportPopup.type}
                        />
                    )}
                </DashCardV2>

                <DashCardV3>
                    <ExpenseList
                        expenses={youMightLikeExp}
                        month={month}
                        year={year}
                    />
                </DashCardV3>
                <DashCardV4>
                    <ExpenseTree expenses={expenses} />
                </DashCardV4>
            </DashboardBody>
        </DashboardLayout>
    )
}

Dashboard.propTypes = {}

export default Dashboard
