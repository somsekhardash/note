import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import './../AdminHome/AdminHome.css'

const Fetch_Reports = gql`
    query FetchReports($month: String) {
        fetchReports(month: $month) {
            success
            data {
                description
                type
                isCompleted
                nextDate
                paidDate
                amount
                _id
            }
        }
    }
`

export function AdminHomePage() {
    const {
        loading: fetchReportsLoader,
        error: fetchReportsError,
        data: fetchReportsData,
        refetch: plzFetchReports,
    } = useQuery(Fetch_Reports, {
        variables: { getAll: true },
        notifyOnNetworkStatusChange: true,
    })
    const reportsData = fetchReportsData?.fetchReports?.data


    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const month = urlSearchParams.get('month') || new Date().getUTCMonth()+1;
        if(month) {

        } 
    }, [])
    
    if (fetchReportsLoader) return <p>Loading...</p>
    if (fetchReportsError) return <p>...Error...</p>

   
    return (
        <div className="admin-home">
            {fetchReportsData.map(()=>{
                
            })}
        </div>
    )
}
