import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import moment from 'moment'
import { Create_Report, Update_Report } from './../../Querys'

export function AdminTable({ reports, month, year }) {
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
        { field: 'amount', headerName: 'Amount', width: 100, editable: true },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
            editable: true,
        },
        { field: '__typename', headerName: 'Typename', width: 100 },
        {
            field: 'isCompleted',
            headerName: 'IsCompleted',
            width: 100,
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
            width: 100,
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
            width: 100,
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
            width: 50,
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

    const checkForStatus = ({ row }) => {
        var a = moment(parseInt(row.nextDate))
        var b = moment()
        if (month && year) {
            var m = b.format('M')
            var y = b.format('Y')
            if (parseInt(m) > parseInt(month) || parseInt(y) > parseInt(year)) {
                b = moment(
                    moment(`${year}-${month}-1`)
                        .endOf('month')
                        .format('YYYY-MM-DD')
                )
            }
        }

        if (
            row.paidDate &&
            (moment(parseInt(row.paidDate)).month() + 1).toString() ===
                month.toString() &&
            row?.isCompleted
        )
            return 'green'

        if (!!a.diff(b, 'days')) return a.diff(b, 'days') > 0 ? 'orange' : 'red'
        return 'yellow'
    }

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
                experimentalFeatures={{ newEditingApi: true }}
                rows={res}
                columns={columns}
                getRowClassName={(params) => checkForStatus(params)}
            />
        </div>
    )
}
