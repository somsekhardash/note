import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import moment from 'moment'
import { AdminBashContainer } from './style'
import { ReportCard } from './../../components/ReportCard/ReportCard'
import SaveOrSubmit from './../../components/SaveOrSubmit/SaveOrSubmit'

function AdminBash({ reports, expenses, month, year }) {
    const [editPopup, setEditPopup] = useState({
        show: false,
        type: 'EDIT',
        selectedReport: null,
    })
    const checkNow = ({ report, flag }) => {
        if (report)
            setEditPopup({
                type: flag ? 'CREATE' : 'EDIT',
                show: true,
                selectedReport: { ...report },
            })
    }

    const onSelect = () => {}

    const showModal = (show) => {
        setEditPopup({
            type: 'EDIT',
            show: show,
            selectedReport: null,
        })
    }
    return (
        <AdminBashContainer>
            {reports.map((report, index) => {
                return (
                    <ReportCard
                        report={report}
                        onAction={checkNow}
                        key={index}
                        month={month}
                        year={year}
                    />
                )
            })}
            {editPopup.selectedReport && (
                <SaveOrSubmit
                    report={editPopup.selectedReport}
                    show={editPopup.show}
                    expenses={expenses}
                    type={editPopup.type}
                    hideHeader={true}
                    showModal={showModal}
                />
            )}
        </AdminBashContainer>
    )
}

export default AdminBash
