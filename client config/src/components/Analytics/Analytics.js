import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Grid, Typography, withStyles } from '@material-ui/core';
import './analytics.css';
import { connect } from 'react-redux';
import { filterByCode } from '../../actions/filterCustomer';
import { setInvoice } from '../../actions/SettingInvoices';
const styles = theme =>({
    root:{
        backgroundColor:'#252C48',
        borderRadius:'5px',
        height:'11rem',
        padding:'5px',
    },
})

class Analytics extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chart:{
                type:'bar',
                styledMode: true,
                zoomType: 'xy'
            },
            title:{
                text:null
            },
            credits: { enabled: false },
            xAxis: {
            },
            
        plotOptions: {
            series: {
                point: {
                    events: {
                      click: this.setHoverData.bind(this)
                    }
                  }
            },
        },
            yAxis:{
                visible:false
            },
            series: [{
                showInLegend: false,
            }],
            setHoverData:null
          };
    }

    componentDidMount(){
        const {data} = this.props;
        let bussCode =[],count = []
        data.forEach(d =>{
            bussCode.push(d.key)
            count.push(d.value)
        })

        this.setState({xAxis:{categories:bussCode},series:[{showInLegend: false,
            data: count}]})
    }
    
      setHoverData = (e) =>{
          const {filterByCode,allData,setToAll,codeName} = this.props
          if(codeName === e.point.category)
            setToAll(allData)
          else
          filterByCode(e.point.category)
      }
    render(){
        const {classes} = this.props;
        return(
            <Grid container item className={classes.root} direction='column' wrap='nowrap'>
                <Typography style={{color:'#C89E9EA6',fontSize:'1.1rem'}}>Total Amount by Company Code</Typography>
                <HighchartsReact
                highcharts={Highcharts}
                options={this.state}
                />
            </Grid>
        )
    }
}

const mapStateToProps = ({invoices:{bussCode,codeName,data}}) =>({
    data:bussCode,
    codeName,
    allData:data
})

const mapDispatchToProps = dispatch =>({
    filterByCode:code =>dispatch(filterByCode(code)),
    setToAll : data =>dispatch(setInvoice(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles,{withTheme:true})(Analytics));