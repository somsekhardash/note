export const dateFormater = (date) => {
    return new Date(parseInt(date)).toLocaleDateString('en-US')
}

export const isEmpty = (value) => {
    return  value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
}