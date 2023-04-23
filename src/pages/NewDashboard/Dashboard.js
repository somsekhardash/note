import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../../Reducer'
import { ReportList } from './ReportList'
import { ExpenseList } from './ExpenseList'
import { ExpenseTree } from '../Dashboard/ExpenseTree'
import SaveOrSubmit from '../../components/SaveOrSubmit/SaveOrSubmit'
import { CreateExpense } from '../../components/CreateExpense/CreateExpense'
import { CreateReport } from '../../components/CreateReport/CreateReport'
import { Modal } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { ReportDonutChart } from './ReportDonutChart'

import {
    Card,
    Metric,
    Text,
    Title,
    Flex,
    Tab,
    BadgeDelta,
    TabList,
    DeltaType,
    Grid,
    Button,
    Col,
    AccordionList,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from '@tremor/react'

export function Dashboard(props) {
    const [selectedView, setSelectedView] = useState('1')
    let {
        expenses,
        reports,
        isLoading,
        today,
        setReport,
        selectedReport,
        setDate,
    } = useContext(AppContext)

    const [showExpanseModal, setShowExpanseModal] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)

    const [reportPopup, setReportPopup] = useState({
        show: false,
        type: 'EDIT',
    })

    let totalEstimate,
        paidAmount = 0

    const month = today.getUTCMonth() + 1
    const year = today.getFullYear()

    if (!reports.length || !expenses.length) return null

    reports = reports.reduce((acc, report) => {
        const f_acc = acc.filter(
            (accreport) => accreport.expenseId !== report.expenseId
        )
        return [...f_acc, report]
    }, [])

    const existingExpencesInReports = reports.map((report) => report.expenseId)
    const youMightLikeExp = expenses.reduce((acc, expance) => {
        if (
            expance &&
            !existingExpencesInReports.includes(expance._id) &&
            expance.frequency === 'MONTHLY'
        ) {
            return [...acc, expance]
        }
        return acc
    }, [])

    const showModal = (show) => {
        if (!show) setReport(null)
    }

    const updateType = (res) => {
        setReportPopup((prev) => ({
            ...prev,
            type: res,
        }))
    }

    if (reports.length)
        totalEstimate = reports.reduce((acc, rec) => {
            return acc + rec.amount
        }, 0)

    // if(expenses.length)
    // totalEstimate = expenses.reduce((acc, rec) => {
    //     return acc + rec.amount
    // },totalEstimate);

    if (reports.length)
        paidAmount = reports.reduce((acc, report) => {
            const localMonth = report.paidDate
                ? new Date(parseFloat(report.paidDate)).getUTCMonth() + 1
                : ''
            const localYear = report.paidDate
                ? new Date(parseFloat(report.paidDate)).getFullYear()
                : ''
            const isCompleted =
                report.isCompleted && month === localMonth && year === localYear

            if (isCompleted) return acc + report.amount
            else return acc
        }, 0)

    const onDateChange = (event, data) => {
        setDate(new Date(data.value))
        // plzFetchReports({
        //     month: (new Date(data.value).getUTCMonth() + 1).toString(),
        //     year: new Date(data.value).getFullYear().toString(),
        // })
    }

    return (
        <main className="bg-slate-50 margin-auto w-9/12 mt-1">
            {/* <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text> */}

            <TabList
                defaultValue="1"
                onValueChange={(value) => setSelectedView(value)}
                className="flex-row justify-between items-center"
            >
                <span className="flex flex-row justify-around">
                    <Tab value="1" className="mx-1" text="Overview" />
                    <Tab value="2" text="Detail" />
                </span>
                <span className="flex flex-row justify-around py-1.5">
                    <Modal
                        onClose={() => setShowExpanseModal(false)}
                        onOpen={() => setShowExpanseModal(true)}
                        open={showExpanseModal}
                        trigger={
                            <Button size="md" className="mx-2">
                                Create Expance
                            </Button>
                        }
                    >
                        <CreateExpense />
                    </Modal>

                    <Modal
                        onClose={() => setShowReportModal(false)}
                        onOpen={() => setShowReportModal(true)}
                        open={showReportModal}
                        trigger={<Button size="md">Create Report</Button>}
                    >
                        <CreateReport
                            expensesData={expenses}
                            reportData={{
                                isCompleted: true,
                            }}
                        />
                    </Modal>
                </span>
            </TabList>

            {selectedView === '1' ? (
                <>
                    <Grid numColsLg={3} numColsMd={2} className="mt-6 gap-6">
                        <Card>
                            <Flex alignItems="start">
                                <Text>Total</Text>
                                <BadgeDelta deltaType="moderateIncrease">
                                    {(
                                        (100 * paidAmount) /
                                        totalEstimate
                                    ).toFixed(2)}{' '}
                                    %
                                </BadgeDelta>
                            </Flex>
                            <Flex
                                justifyContent="start"
                                alignItems="baseline"
                                className="truncate space-x-3"
                            >
                                <Metric>Rs. {paidAmount}</Metric>
                                <Text className="truncate">
                                    from {totalEstimate}
                                </Text>
                            </Flex>
                        </Card>
                        <Card>
                            <div className="h-28" />
                        </Card>
                        <Card>
                            <div className="h-28">
                                <SemanticDatepicker
                                    onChange={onDateChange}
                                    value={today}
                                />
                            </div>
                        </Card>
                    </Grid>

                    <Grid numColsLg={6} className="mt-6 gap-6">
                        <Col numColSpanLg={4}>
                            <div className="mt-6">
                                <Card className="overflow-y-scroll">
                                    <div className="custom-height-38">
                                        <ReportList
                                            reports={reports}
                                            month={month}
                                            year={year}
                                            setReport={setReport}
                                            updateType={updateType}
                                        />
                                        {selectedReport && (
                                            <SaveOrSubmit
                                                report={selectedReport}
                                                show={selectedReport}
                                                expenses={expenses}
                                                showModal={showModal}
                                                type={reportPopup.type}
                                            />
                                        )}
                                        <ExpenseList
                                            expenses={youMightLikeExp}
                                            month={month}
                                            setReport={setReport}
                                            year={year}
                                        />
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col numColSpanLg={2}>
                            <div className="mt-6">
                                <Card>
                                    <div className="custom-height-38 overflow-y-scroll">
                                        <ExpenseTree expenses={expenses} />
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Grid>
                </>
            ) : (
                <Card className="mt-6">
                    <div className="custom-height-38">
                        <ReportDonutChart
                            paidAmount={paidAmount}
                            reports={reports}
                            month={month}
                            year={year}
                            today={today}
                        />
                    </div>
                </Card>
            )}
        </main>
    )
}
