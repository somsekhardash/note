import React from 'react'
import { Card, Button, Label } from 'semantic-ui-react'
import { dateFormater, isCompleted, ConditionalRender } from './../../Utils'
import { ReportCardContainer } from './style'

export function ReportCard({ report, onAction, onSelect, year, month }) {
    const isRCompleted = isCompleted({ report, year, month })

    return (
        <ReportCardContainer>
            <Card className="full-width">
                <Card.Content>
                    <Card.Header content={report.title} />
                    <Card.Meta
                        content={
                            <>
                                Next Payment Date:{' '}
                                {dateFormater(report.nextDate)}
                                <br></br>
                                Paid Date: {dateFormater(report.paidDate)}
                                <br></br>
                                Amount: <b>{report.amount}</b>
                                <br></br>
                                Type: {report.__typename}
                            </>
                        }
                    />
                    <Card.Description content={report.description} />
                </Card.Content>
                <Card.Content extra>
                    <Button.Group>
                        <ConditionalRender shouldRender={!isRCompleted}>
                            <Button
                                positive
                                onClick={() => onAction({ report, flag: true })}
                            >
                                Pay
                            </Button>
                            <Button.Or text="or" />
                        </ConditionalRender>
                        <Button
                            onClick={() => onAction({ report, flag: false })}
                        >
                            Edit
                        </Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        </ReportCardContainer>
    )
}
