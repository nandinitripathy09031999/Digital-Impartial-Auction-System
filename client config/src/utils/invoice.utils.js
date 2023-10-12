import { formatter } from "./formatter"
import crossfilter from "crossfilter2";
export const setStats = data =>{
    let arStats = [];
    arStats.push([...new Set(data.map(d => d.customer_number))].length)
    arStats.push(formatter(data.reduce((acc,curr) => acc + curr.actual_open_amount,0)))
    arStats.push(Math.round(data.reduce((acc,curr) => acc + curr.dayspast_due,0)/data.length))
    arStats.push(data.reduce((acc,curr) =>acc + curr.isOpen,0))
    return arStats;
}

export const setCustInfo = data =>{
    return data.map(d =>({
        id:d.pk_id,
        custName:d.customer_name,
        custNum:d.customer_number,
        amt:d.actual_open_amount
      }))
}

export const setCustStats = data =>{
    let custStats = [];
    custStats.push(formatter(data.reduce((acc,curr) => acc + curr.actual_open_amount,0)));
    custStats.push(data.reduce((acc,curr) =>acc + curr.isOpen,0));
    return custStats;
}
export const setCustDetails = (data,name) =>{
    return data.filter(d => d.customer_name === name)
}

export const modifyStats = (data,diff) =>{
    data[0] +=diff;
    return data;
}

export const modifyInvoice = (data,idx,payload) => utils(data,idx,payload)

const utils = ( data,idx,payload) =>{
    return data.map(d =>
        d.pk_id === idx ?
         {...d,total_open_amount:payload.openAmount,doctype:payload.docType}
        :
         d
    )
}

export const overAllInvoice = (data,idx,payload) => utils(data,idx,payload)

export const setBussCode = (data) =>{
    const dataSet = crossfilter(data)
    const bussCodeGrouped = dataSet.dimension(d =>d.business_code).group()
    return bussCodeGrouped.top(Infinity);
}

export const getArStats = (code,data) =>{
    const dataSet = crossfilter(data)   
    const filterData = dataSet.dimension(d => d.business_code).top(Infinity).filter(f => f.business_code === code)
    return setStats(filterData)
}

export const getfilterData = (code,data) =>{
    const dataSet = crossfilter(data)   
    const filterData = dataSet.dimension(d => d.business_code).top(Infinity).filter(f => f.business_code === code)
    return filterData;   
}