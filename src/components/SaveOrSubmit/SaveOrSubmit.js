import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Button, Image, Modal } from 'semantic-ui-react'
import { Theme as SemanticUITheme } from '@rjsf/semantic-ui'
import { withTheme } from '@rjsf/core'
import {
    Create_Report,
    Update_Report,
    reportSchema,
    reportUiSchema,
} from './../../Querys'
import moment from 'moment'
import { useCallBank } from './../../CallBank'

const Form = withTheme(SemanticUITheme)

function SaveOrSubmit({
    report,
    expenses,
    type = 'CREATE',
    show,
    hideHeader,
    showModal,
}) {
    const { CREATE_REPORT, UPDATE_REPORT } = useCallBank()

    const updateReportCall = (e) => {
        const formData = e.formData
        UPDATE_REPORT.updateReport({
            variables: {
                reportInput: {
                    findI: { _id: report._id },
                    data: {
                        title: formData.title,
                        amount: parseInt(formData.amount),
                        description: formData.description,
                        paidDate: formData.paidDate || moment().format('L'),
                        nextDate: formData.nextDate || moment().format('L'),
                        expenseId: report.expenseId,
                        isCompleted: formData.isCompleted,
                    },
                },
            },
        })
    }

    const createAReport = (e) => {
        const formData = e.formData
        if (formData.title)
            CREATE_REPORT.createReport({
                variables: {
                    reportInput: {
                        title: formData.title,
                        amount: parseInt(formData.amount),
                        description: formData.description,
                        paidDate: formData.paidDate || moment().format('L'),
                        nextDate: formData.nextDate || moment().format('L'),
                        expenseId: report.expenseId || report._id,
                        isCompleted: true,
                    },
                },
            })
        else alert('Error AdminTable')
    }

    const actionOnReport = (e) => {
        if (type === 'EDIT') {
            updateReportCall(e)
        } else {
            createAReport(e)
        }
    }

    return (
        <Modal
            onClose={() => showModal(false)}
            onOpen={() => showModal(true)}
            open={show}
        >
            <Modal.Header>{`${type} Report`}</Modal.Header>
            <Modal.Content image>
                <Form
                    className="admin-form report-create"
                    schema={reportSchema({ hideHeader, expenses, report })}
                    uiSchema={reportUiSchema}
                    onChange={() => {}}
                    onSubmit={(e) => {
                        actionOnReport(e)
                    }}
                    onError={() => {}}
                />
            </Modal.Content>
        </Modal>
    )
}

export default SaveOrSubmit
