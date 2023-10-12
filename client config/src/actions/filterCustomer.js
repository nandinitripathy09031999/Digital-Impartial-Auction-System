export const filterCustomer = name => ({
    type:'FILTER_INVOICE',
    payload:name,
})

export const setCustStats = payload =>({
    type:'SET_CUST_STATS',
    payload,
})

export const filterByCode = payload =>({
    type:'FILTER_BY_CODE',
    payload
})