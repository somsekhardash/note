import React from 'react'
import { DonutChart } from '@tremor/react'
import { isCompleted } from './../../Utils'

export function ReportDonutChart({ paidAmount, reports, year, month }) {
    // const reportsData = reports.map(report => {
    //     const isRCompleted = isCompleted({ report, year, month })
    //     if(isRCompleted)
    //         return {
    //             name: report.title,
    //             amout: parseInt(report.amount)
    //         }

    // });

    const reportsData = reports.reduce((acc, report) => {
        // const isCompleted =
        // report.isCompleted && month === localMonth && year === localYear
        const isRCompleted = isCompleted({ report, year, month })
        console.log(isRCompleted)
        if (isRCompleted) {
            return [
                ...acc,
                {
                    name: report.title,
                    amout: parseInt(report.amount),
                },
            ]
        }
        return acc
    }, [])

    console.log(reportsData)

    const valueFormatter = (number) => number
    return (
        <DonutChart
            style={{ height: '500px', width: '500px' }}
            data={reportsData}
            category="amout"
            index="name"
            valueFormatter={valueFormatter}
            colors={[
                'slate',
                'violet',
                'indigo',
                'rose',
                'cyan',
                'amber',
                'aqua',
                'fuchsia',
                'gray',
                'green',
                'maroon',
                'navy',
                'olive',
                'orange',
                'purple',
                'red',
                'silver',
                'teal',
                'white',
                'yellow',
            ]}
        />
    )
}
