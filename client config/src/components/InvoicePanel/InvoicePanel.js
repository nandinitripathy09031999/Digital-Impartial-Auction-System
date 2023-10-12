import React from 'react';
import { Grid, Typography, Button, withStyles } from '@material-ui/core';
import InvoiceTable from '../InvoiceTable/InvoiceTable';
import { connect } from 'react-redux';
const styles = theme => ({
    root:{
        backgroundColor:'#252C48',
        margin:'0 5px',
        borderRadius:'5px',
        padding:'5px',
    },
})
class InvoicePanel extends React.Component{
    render(){
        const {classes,location} = this.props
            return(
                <Grid container item lg={8} direction='column' wrap='nowrap' className={classes.root}>
                    <Grid container item justify='space-between'>
                        <Typography>Invoices</Typography>
                        <Button variant='text'>PREDICT</Button>
                    </Grid>
                    <InvoiceTable location = {location}/>
                </Grid>
            )
    }
}

export default withStyles(styles,{withTheme:true})(InvoicePanel);