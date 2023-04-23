import React, { useState } from 'react'
// import { Button, Image, List, Accordion, Icon } from 'semantic-ui-react'
import { dateFormater } from '../../Utils'
import {
    AccordionList,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Button,
} from '@tremor/react'
import {
    RefreshIcon,
    CheckCircleIcon,
    CurrencyRupeeIcon,
    AcademicCapIcon,
} from '@heroicons/react/outline'
import { Badge, BadgeDelta } from '@tremor/react'
import { ButtonsLayout } from './style'

const SingleReport = ({
    report,
    activeIndex,
    setActiveIndex,
    index,
    month,
    year,
    setReport,
    updateType,
}) => {
    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }

    const localMonth = report.paidDate
        ? new Date(parseFloat(report.paidDate)).getUTCMonth() + 1
        : ''
    const localYear = report.paidDate
        ? new Date(parseFloat(report.paidDate)).getFullYear()
        : ''

    const isCompleted =
        report.isCompleted && month === localMonth && year === localYear
    return (
        <Accordion>
            <AccordionHeader>
                <div className="flex w-full justify-between items-center">
                    <span>
                        {report.title}({dateFormater(report.nextDate)})
                    </span>
                    <ButtonsLayout>
                        {isCompleted ? (
                            <>
                                <Badge icon={CheckCircleIcon}>Paid</Badge>
                                <Button
                                    icon={RefreshIcon}
                                    className="mx-2"
                                    onClick={() => {
                                        setReport(report)
                                        updateType('EDIT')
                                    }}
                                >
                                    Edit
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    icon={CurrencyRupeeIcon}
                                    onClick={() => {
                                        setReport(report)
                                        updateType('CREATE')
                                    }}
                                >
                                    Pay
                                </Button>
                                <Button
                                    icon={AcademicCapIcon}
                                    onClick={() => alert(123)}
                                    className="mx-2"
                                >
                                    Snooze
                                </Button>
                            </>
                        )}
                        <span className="mx-2">Rs.{report.amount}</span>
                    </ButtonsLayout>
                </div>
            </AccordionHeader>
            <AccordionBody>
                Next Payment Date: {dateFormater(report.nextDate)}
                <br></br>
                Paid Date: {dateFormater(report.paidDate)}
                <br></br>
                Amount: {report.amount}
                <br></br>
                Type: {report.__typename}
            </AccordionBody>
        </Accordion>
    )
}

export function ReportList({ reports, month, year, setReport, updateType }) {
    const [activeIndex, setActiveIndex] = useState(0)
    if (!reports) return <span>...loading...</span>
    return (
        <AccordionList className="mx-auto">
            {reports.map((report, index) => {
                return (
                    <SingleReport
                        report={report}
                        key={index}
                        index={index}
                        month={month}
                        year={year}
                        setActiveIndex={setActiveIndex}
                        activeIndex={activeIndex}
                        setReport={setReport}
                        updateType={updateType}
                    />
                )
            })}
        </AccordionList>
    )
}
