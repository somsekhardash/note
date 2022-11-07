export const expType = {
    debit: 'DEBIT',
    credit: 'CREDIT',
    loan: 'LOAN',
    investment: 'INVESTMENT'
}

export const frequencyType = {
    daily: 'DAILY',
    monthly: 'MONTHLY',
    yearly: 'YEARLY',
    custom: 'CUSTOM',
}


export const monthsMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

export const yearsMap = {
    2020: "2020",
    2021: "2021",
    2022: "2022",
    2023: "2023",
    2024: "2024",
    2025: "2025",
    2026: "2026",
    2027: "2027",
    2028: "2028",
    2029: "2029",
    2030: "2030"
}

export const monthTypes = [...Object.entries(monthsMap).map(([key, value]) => {
    return {
       "title": value,
       "const": parseInt(key) 
    }
})];

export const yearTypes = [...Object.entries(yearsMap).map(([key, value]) => {
    return {
       "title": value,
       "const": parseInt(key) 
    }
})];
