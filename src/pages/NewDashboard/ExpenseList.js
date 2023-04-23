import React, { useState } from 'react'
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
import { ButtonsLayout } from './style'

const SingleExpense = ({
    expense,
    activeIndex,
    setActiveIndex,
    index,
    setReport,
}) => {
    return (
        <>
            <Accordion>
                <AccordionHeader>
                    <div className="flex w-full justify-between items-center">
                        <span>{expense.title}</span>
                        <ButtonsLayout>
                            <Button
                                icon={CurrencyRupeeIcon}
                                onClick={() => {
                                    setReport(expense)
                                }}
                            >
                                Pay
                            </Button>
                            <span className="mx-2">Rs.{expense.amount}</span>
                        </ButtonsLayout>
                    </div>
                </AccordionHeader>
                <AccordionBody>
                    Amount: {expense.amount}
                    <br></br>
                    Type: {expense.__typename}
                </AccordionBody>
            </Accordion>
        </>
    )
}

export function ExpenseList({ expenses, month, year, setReport }) {
    const [activeIndex, setActiveIndex] = useState(0)
    if (!expenses) return <span>...loading...</span>
    return (
        <AccordionList className="mx-auto">
            {expenses.map((expense, index) => {
                return (
                    <SingleExpense
                        expense={expense}
                        key={index}
                        index={index}
                        month={month}
                        setReport={setReport}
                        year={year}
                        setActiveIndex={setActiveIndex}
                        activeIndex={activeIndex}
                    />
                )
            })}
        </AccordionList>
    )
}
