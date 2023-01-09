import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import moment from 'moment'

const Create_Report = gql`
    mutation CreateReport($reportInput: CreateReportInput) {
        createReport(reportInput: $reportInput) {
            amount
            description
            paidDate
            nextDate
            isCompleted
            expenseId
        }
    }
`

const Update_Report = gql`
    mutation UpdateReport($reportInput: UpdateReportInput) {
        updateReport(reportInput: $reportInput) {
            amount
            description
            paidDate
            nextDate
        }
    }
`

export function AdminTable({ reports, month }) {
    const [createReport, { data, loading, error }] = useMutation(Create_Report)
    const [
        updateReport,
        { data: updateDate, loading: updateLoader, error: updateError },
    ] = useMutation(Update_Report)
    const createAReport = (param) => {
        if (param.title)
            createReport({
                variables: {
                    reportInput: {
                        title: param.title,
                        amount: parseInt(param.amount),
                        description: param.description,
                        paidDate: param.paidDate || moment().format('L'),
                        nextDate: param.nextDate || moment().format('L'),
                        expenseId: param.expenseId || param.id,
                        isCompleted: true,
                    },
                },
            })
        else alert('Error AdminTable')
    }

    const updateAReport = (param) => {
        if (param.title)
            updateReport({
                variables: {
                    reportInput: {
                        findI: { _id: param.id },
                        data: {
                            title: param.title,
                            amount: parseInt(param.amount),
                            description: param.description,
                            paidDate: param.paidDate || moment().format('L'),
                            nextDate: param.nextDate || moment().format('L'),
                            expenseId: param.expenseId || param.id,
                        },
                    },
                },
            })
    }

    const columns = [
        { field: 'title', headerName: 'Title', width: 250 },
        { field: 'amount', headerName: 'Amount', width: 80, editable: true },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
        },
        { field: '__typename', headerName: 'Typename', width: 80 },
        {
            field: 'isCompleted',
            headerName: 'IsCompleted',
            width: 60,
            renderCell: (params) => {
                return params.row.paidDate &&
                    (
                        moment(parseInt(params.row.paidDate)).month() + 1
                    ).toString() === month.toString() &&
                    params?.row?.isCompleted ? (
                    <Button
                        circular
                        color="facebook"
                        icon="play"
                        disabled={true}
                        className="margin-top"
                    />
                ) : (
                    <Button
                        circular
                        onClick={() => createAReport(params?.row)}
                        color="facebook"
                        icon="play"
                        className="margin-top"
                    />
                )
            },
        },
        {
            field: 'paidDate',
            headerName: 'LastPaidDate',
            width: 150,
            valueGetter: ({ value }) => {
                if (typeof value === 'string') return new Date(parseInt(value))
                return value
            },
            editable: true,
            type: 'date',
        },
        {
            field: 'nextDate',
            headerName: 'NextPaymentDate',
            width: 150,
            valueGetter: ({ value }) => {
                if (typeof value === 'string') return new Date(parseInt(value))
                return value
            },
            editable: true,
            type: 'date',
        },
        {
            field: 'Edit',
            headerName: 'EDIT',
            width: 60,
            renderCell: (params) => {
                return (
                    <Button
                        circular
                        onClick={() => updateAReport(params?.row)}
                        color="facebook"
                        icon="play"
                        className="margin-top"
                    />
                )
            },
        },
        { field: 'id', hide: true },
    ]

    const res = reports.map((res) => {
        return { ...res, id: res._id }
    })
    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
                experimentalFeatures={{ newEditingApi: true }}
                rows={res}
                columns={columns}
            />
        </div>
    )
}
