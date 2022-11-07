import React from 'react'
import { Card, Button } from 'semantic-ui-react'

export function ExpenseCard({expense, onSelect, onAction}) {
    return (
        <div className='expense-card'>
            <Card onClick={onSelect}>
                <Card.Content>
                    <Card.Header content={expense.title} />
                    <Card.Meta
                        content={
                            <>
                                Frequency: {expense.frequency}
                                <br></br>
                                type: {expense.type}
                            </>
                        }
                    />
                    <Button
                        onClick={() => onAction(expense)}
                        circular
                        color="facebook"
                        icon="play"
                        className="margin-top"
                    />
                </Card.Content>
            </Card>
        </div>
    )
}
