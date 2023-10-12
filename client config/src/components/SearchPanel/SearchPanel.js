import React from 'react';
import {connect} from 'react-redux';
import search from '../../assets/mag-glass.svg';
import money from '../../assets/attach_money.svg';
import { Grid, Input, withStyles, Typography } from '@material-ui/core';
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import { color } from 'highcharts';

const styles = theme =>({
    root:{
        backgroundColor:'#252C48',
        borderRadius:'5px',
        height:'11rem',
        marginTop:'10px',
        padding:'5px',
    },
    grid1:{
        border:'1px solid #b3bfcc',
        borderRadius:'20px'
    },
    grid2:{
        overflowY:'auto',
        height:'8rem'
    },
    content:{
        paddingRight:'20px',
        color:'#b3bfcc'
    },
    content1:{
        color:'#b3bfcc'
    }
})
class SearchPanel extends React.Component{
    state = {
        searchField:''
    }

    handleChange = e =>{
        this.setState({searchField:e.target.value});
    }
    render(){
        const {classes,data} = this.props;
        const {searchField} = this.state;
        const filteredData = data.filter(d => {
            if(d.custName == searchField || d.custNum == searchField || d.amt == searchField)
            return true;
            else 
            return false;
        })
        return(
            <Grid container item direction='column' className={classes.root} wrap='nowrap'>
                <Grid container item wrap='nowrap' className={classes.grid1}>
                    <img src = {search} alt='' style={{width:'35px', height:'auto',marginRight:'4px'}}/>
                    <Input type='search' style={{color:'#b3bfcc',fontSize:'0.8rem'}} disableUnderline fullWidth placeholder='Serach Customers by customer Name or Number' onChange={this.handleChange}/>
                    <img src={money} alt=''/>
                </Grid>
                <Grid container item wrap='nowrap' justify='space-between'>
                    <Typography className={classes.content1}>Customer Name</Typography>
                    <Typography className={classes.content1}>Customer Number</Typography>
                    <Typography className={classes.content}>Open Amount</Typography>
                </Grid>
                <Grid container item direction='column' className={classes.grid2} wrap='nowrap'>
                {
                    filteredData.length ?
                    filteredData.map(d => <CustomerInfo key = {d.id} 
                        custName={d.custName} 
                        custNum = {d.custNum}
                        amt = {d.amt}/>)
                    :
                    null
                }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles,{withTheme:true})(SearchPanel);