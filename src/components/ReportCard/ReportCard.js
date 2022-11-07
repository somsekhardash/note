import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { dateFormater } from "./../../Utils";

export function ReportCard({report, onAction, onSelect}) {
    return (
        <div className="report-card">
            <Card onClick={onSelect}>
                <Card.Content>
                    <Card.Header content={report.type} />
                    <Card.Meta
                        content={
                            <>
                                Next Payment Date: {dateFormater(report.nextDate)}
                                <br></br>
                                Paid Date: {dateFormater(report.paidDate)}
                                <br></br>
                                Amount: <b>{report.amount}</b>
                            </>
                        }
                    />
                    <Card.Description content={report.description} />
                    {!report.isCompleted && (
                        <Button
                            onClick={() => onAction(report)}
                            circular
                            color="facebook"
                            icon="play"
                            className="margin-top"
                        />
                    )}
                </Card.Content>
            </Card>
        </div>
    )
}
