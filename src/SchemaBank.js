let todayDate = new Date()

export const reportUiSchema = {
    paidDate: {
        'ui:widget': 'date',
    },
    nextDate: {
        'ui:widget': 'date',
    },
}

export const getReportSchema = ({
    expensesData,
    reportData,
    myDate = todayDate,
}) => ({
    title: 'Report Create',
    type: 'object',
    required: ['title'],
    properties: {
        title: {
            type: 'string',
            enum: expensesData.map((node, index) => node.title),
            default: reportData.title,
        },
        amount: { type: 'number', default: reportData.amount },
        description: { type: 'string', default: reportData.description },
        paidDate: {
            type: 'string',
            default: myDate.toISOString().slice(0, 10),
        },
        nextDate: {
            type: 'string',
            default: new Date(
                myDate.getFullYear(),
                myDate.getMonth() + 1,
                myDate.getDate()
            )
                .toISOString()
                .slice(0, 10),
        },
        isCompleted: { type: 'boolean', default: reportData.isCompleted },
    },
})

export const getExpenseSchema = ({ expType, frequencyType }) => ({
    title: 'Expense Create',
    type: 'object',
    required: ['title'],
    properties: {
        title: { type: 'string' },
        type: {
            type: 'string',
            enum: [...Object.values(expType)],
            default: expType.debit,
        },
        frequency: {
            type: 'string',
            enum: [...Object.values(frequencyType)],
            default: frequencyType.monthly,
        },
        amount: { type: 'number' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
    },
})

export const expenseUiSchema = {
    startDate: {
        'ui:widget': 'date',
    },
    endDate: {
        'ui:widget': 'date',
    },
}
