import React from 'react';
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Header from '../components/Header/Header';
import ARStatistics from '../components/Statistics/Statistics';
import { Grid, CircularProgress } from '@material-ui/core';
import Analytics from '../components/Analytics/Analytics';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import InvoicePanel from '../components/InvoicePanel/InvoicePanel';
import Footer from '../components/Footer'
import axios from 'axios';

import { setInvoice } from '../actions/SettingInvoices';
import Professor from '../components/Professor/Professor';
const styles = theme =>({
  root:{
    width:'98%',
    height:'100%',
    margin:'0 auto',
  },
  grid1:{
    marginTop:'15px'
  }
})
class CollectorDashboard extends React.Component{
  state = {
    data:null,
  }
  unsubscribe = null
  async componentDidMount(){
    try{
      this.unsubscribe = await axios.get('http://localhost:8080/DemoJSP/info')
      this.setState({data:this.unsubscribe.data},() =>{this.props.setData(this.state.data)})
    }catch(e){
      console.log(e.message);
    }
  }

  componentWillUnmount(){
    this.unsubscribe = null
  }
  render(){
    const {classes,data,arStats,custInfo,location,display} = this.props
    if(data)
    return(
      <div className={classes.root}>
        <Header location = {location}/>
        <Grid container wrap='nowrap'>
          <Grid container item direction='column'  lg={10}>
            {arStats &&<ARStatistics data = {arStats}/>}
            <Grid container wrap='nowrap' className={classes.grid1}>
              <Grid container item lg={4} xs={4} direction='column' style={{margin:'0 5px'}}>
                <Analytics/>
                {custInfo && <SearchPanel data = {custInfo}/>}
              </Grid>
              <InvoicePanel location = {location}/>
            </Grid>
          </Grid>
          {display && <Professor/>}
        </Grid>
        <Footer/>
      </div>
    );
    else
    return(
      <div className={classes.root}>
        <CircularProgress/>
      </div>
    );
  }
}
const mapStateToProps = ({invoices,disabled}) =>({
  data:invoices.data,
  arStats:invoices.arStats,
  custInfo:invoices.custInfo,
  display:disabled.display
})
const mapDispatchToProps = dispatch =>({
  setData: (data) => dispatch(setInvoice(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles,{withTheme:true})(CollectorDashboard));