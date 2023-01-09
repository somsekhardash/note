import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import moment from 'moment'

export function ExpenseTable({ data }) {
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
        { field: 'id', hide: true },
    ]

    const res = data.map((res) => {
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
