import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import Header from '../components/Header/Header';
import InvoiceTable from '../components/InvoiceTable2/InvoiceTable';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import ModifyAndExport from '../components/ModifyAndExport/ModifyAndExport';
import Professor from '../components/Professor/Professor';
const styles = theme =>({
  root:{
    width:'98%',
    height:'100%',
    margin:'0 auto',
  },
  grid1:{
    marginTop:'10px',
    backgroundColor:'#252C48',
    padding:'10px',
    borderRadius:'5px'
  }
})
class CustomerDetails extends React.Component{
  render(){
    const {classes,location,data} = this.props
    if(data)
    return(
      <div className={classes.root}>
        <Header location = {location}/>
        <Grid container wrap='nowrap'>
          <Grid container direction='column' className={classes.grid1}>
            <ModifyAndExport data = {data}/>
            <InvoiceTable/>
          </Grid>
          <Professor/>
        </Grid>
        <Footer/>
      </div>
    );else
    return(
      <div className = {classes.root}>
        <CircularProgress/>
      </div>
    )
  }
}

const mapStateToProps = ({invoices:{custDetails}}) =>({
  data:custDetails,
})
export default connect(mapStateToProps)(withStyles(styles,{withTheme:true})(CustomerDetails));
