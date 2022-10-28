import React from 'react'
import DataGrid from './DataGrid';
import Form from "@rjsf/core";

const types = [ 'ICICI Prudential Life Insurance',
'HDFC Credit Card',
'Home Loan Account',
'Bike Insurance',
'Scooty Insurance',
'Act fibernet',
'Reisnet',
'Electricity bill Bangalore',
'Car Loan Account',
'Home Loan Account',
'Electricity bill Berhampur',
'ORRA Bangalore Phoenix',
'ORRA Bangalore Phoenix',
'Emg Account',
'Airtel',
'Electricity bill Bangalore',
'Electricity bill Berhampur',
'Bangalore House Maintenance',
'ORRA Bangalore Phoenix',
'Airtel',
'Stock Market',
'Electricity bill Bangalore',
'Office reimbursement',
'ICICI Prudential Life Insurance',
'Car Loan Account',
'Home Loan Account',
'Electricity bill Berhampur',
'HDFC Credit Card',
'Scooty Insurance',
'Bangalore House Maintenance',
'Reisnet',
'Airtel' ]

const typeValues = [ 'ICICI-PRUDENTIAL-LIFE-INSURANCE',
'HDFC-CREDIT-CARD',
'HOME-LOAN-ACCOUNT',
'BIKE-INSURANCE',
'SCOOTY-INSURANCE',
'ACT-FIBERNET',
'REISNET',
'ELECTRICITY-BILL-BANGALORE',
'CAR-LOAN-ACCOUNT',
'HOME-LOAN-ACCOUNT',
'ELECTRICITY-BILL-BERHAMPUR',
'ORRA-BANGALORE-PHOENIX',
'ORRA-BANGALORE-PHOENIX',
'EMG-ACCOUNT',
'AIRTEL',
'ELECTRICITY-BILL-BANGALORE',
'ELECTRICITY-BILL-BERHAMPUR',
'BANGALORE-HOUSE-MAINTENANCE',
'ORRA-BANGALORE-PHOENIX',
'AIRTEL',
'STOCK-MARKET',
'ELECTRICITY-BILL-BANGALORE',
'OFFICE-REIMBURSEMENT',
'ICICI-PRUDENTIAL-LIFE-INSURANCE',
'CAR-LOAN-ACCOUNT',
'HOME-LOAN-ACCOUNT',
'ELECTRICITY-BILL-BERHAMPUR',
'HDFC-CREDIT-CARD',
'SCOOTY-INSURANCE',
'BANGALORE-HOUSE-MAINTENANCE',
'REISNET',
'AIRTEL' ];

const columns = [
{ key: 'id', name: 'ID' },
{ key: 'title', name: 'Title' }
];

const rows = [
{ id: 0, title: 'Example' },
{ id: 1, title: 'Demo' }
];
  

const schema = {
    title: "User Form",
    type: "object",
    required: ["title"],
    properties: {
        expanse: {type: "string", enumNames: types, enum: typeValues, default: "select expanse"},
        amount: {type: "integer", default: 0},
        paidDate: {type: "string", format: "date"},
        nextDate: {type: "string", format: "date"},
        endDate: {type: "string", format: "date"},
        description: {type: "string"}
    }
};

export default function UserApp() {
  return (<div>
    <Form schema={schema}
        onChange={console.log("changed")}
        onSubmit={console.log("submitted")}
        onError={console.log("errors")} />
    <DataGrid />
    </div>
  )
}
