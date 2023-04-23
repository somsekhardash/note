import React from 'react'
import { Accordion } from 'semantic-ui-react'
import { dateFormater } from './../../Utils'

const expenseContent = (expense) => {
    let totalAmount = 0
    const reportPanels = expense.reports.map((report) => {
        totalAmount += report.amount
        return {
            key: report._id,
            title: dateFormater(report.paidDate),
            content: {
                content: (
                    <div>
                        Amount: {report.amount}
                        <br />
                        Description: {report.description}
                        <br />
                        Next Date: {dateFormater(report.nextDate)}
                        <br />
                        Paid Date: {dateFormater(report.paidDate)}
                        <br />
                    </div>
                ),
            },
        }
    })
    return (
        <div>
            Amount: {expense.amount}
            <br />
            Frequency: {expense.frequency}
            <br />
            Start Date: {dateFormater(expense.startDate)}
            <br />
            End Date: {dateFormater(expense.endDate)}
            <br />
            Total Amount: {totalAmount}
            <br />
            <Accordion.Accordion defaultActiveIndex={0} panels={reportPanels} />
        </div>
    )
}

export const ExpenseTree = ({ expenses }) => {
    const expenceData = expenses.map((exp) => {
        return {
            key: exp._id,
            title: exp.title,
            content: {
                content: expenseContent(exp),
            },
        }
    })
    return <Accordion defaultActiveIndex={0} panels={expenceData} styled />
}
