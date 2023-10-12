import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { filterCustomer } from '../../actions/filterCustomer';
import { withRouter } from 'react-router';

const styles = theme =>({
    root:{
        padding:'2px 0',
        borderBottom:'1px solid lightgray'
    },
    content:{
        width:'33.3%',
        color:'#ffffffa6'
    }
})
class CustomerInfo extends React.Component{
    handleClick = () =>{
        const {custName,setCustName,history,custNum} = this.props;
        setCustName(custName);
        history.push("/customer-dashboard",{custName,custNum});
    }
    render(){
        const {classes,custName,custNum,amt} = this.props;
        return(
            <Grid container item wrap='nowrap' justify='space-between' className={classes.root}>
                <Typography className={classes.content} onClick ={this.handleClick}>{custName}</Typography>
                <Typography className={classes.content} style={{textAlign:'right'}}>{custNum}</Typography>
                <Typography className={classes.content} style={{paddingRight:'5px',textAlign:'right'}}>{amt}</Typography>
            </Grid>
        )
    }
    
}
const mapDispatchToProps = dispatch =>({
    setCustName:name => dispatch(filterCustomer(name))
})
export default connect(null,mapDispatchToProps)(withStyles(styles,{withTheme:true})(withRouter(CustomerInfo)));