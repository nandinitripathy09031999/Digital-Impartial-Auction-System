import {setStats,
    setCustInfo,
    setCustDetails,
    modifyStats,
    modifyInvoice,
    overAllInvoice,
    setBussCode,
    getArStats,
    getfilterData
} from '../utils/invoice.utils';
const init = {
    data:null,
    arStats:null,
    custInfo:null,
    custDetails:null,
    custStats:null,
    openAmount:0,
    docType:'',
    idx :0,
    bussCode:null,
    filterData:null,
    codeName:''
}

const InvoiceReducer = (state = init,action) =>{
    switch(action.type){
        case 'SET_INVOICE':
            return {...state, 
                data:action.payload,
                arStats:setStats(action.payload),
                custInfo:setCustInfo(action.payload),
                custDetails:null,
                bussCode:setBussCode(action.payload),
                filterData:action.payload
            };
        case 'FILTER_INVOICE':
            return {...state,
                custDetails:setCustDetails(state.data,action.payload)}
        case 'SET_CUST_STATS':
            return {...state,
                custStats:action.payload}
        case 'SET_IDX_SELECTED':
            return {...state,
                idx:action.payload,
                openAmount:state.data[action.payload - 1].total_open_amount,
                docType:state.data[action.payload - 1].doctype}
        case 'SET_OPEN_AMOUNT':
            return {...state,
                custStats:modifyStats(state.custStats,action.payload)}
        case 'MODIFY_INVOICE_TABLE':
            return {...state,
                custDetails:modifyInvoice(state.custDetails,state.idx,action.payload),
                data:overAllInvoice(state.data,state.idx,action.payload)}
        case 'FILTER_BY_CODE':
            return {...state,codeName:action.payload,arStats:getArStats(action.payload,state.data),
                filterData: getfilterData(action.payload,state.data)
            }
        default:
            return state;
    }
}

export default InvoiceReducer;