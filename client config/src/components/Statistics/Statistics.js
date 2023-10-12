import React from 'react';
import {connect} from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root:{
        marginTop:'20px',
    },
    allGrid:{
        backgroundColor:'#252C48',
        margin:'0 5px',
        borderRadius:'5px',
        height:'8rem'
    },
    content1:{
        color:'#b3bfcc',
        fontSize:'1.3rem'
    },
    content2:{
        color:'white',
        fontSize:'1.5rem'
    }
})
const ARStatistics = props =>{
        const {classes,data} = props;
        console.log(data)
        return(
            <Grid container wrap='nowrap' spacing={8} className={classes.root}>
                 <Grid container item lg={3} direction='column' alignItems='center' justify='center' className={classes.allGrid}>
                        <Typography className={classes.content1} variant='body1'>Total Customer</Typography>    
                        <Typography className={classes.content2} variant='h6'>{data[0]}</Typography>    
                 </Grid>
                 <Grid container item lg={3} direction='column' alignItems='center'justify='center' className={classes.allGrid}>
                        <Typography className={classes.content1} variant='body1'>Total Open AR</Typography>
                        <Typography className={classes.content2} variant='h6'>{`$${data[1]}`}</Typography>        
                 </Grid>
                 <Grid container item lg={3} direction='column' alignItems='center' justify='center' className={classes.allGrid}>
                        <Typography className={classes.content1} variant='body1'>Average Days Delay</Typography>
                        <Typography className={classes.content2} variant='h6'>{`${data[2]} Days`}</Typography>    
                 </Grid>
                 <Grid container item lg={3} direction='column' alignItems='center' justify='center' className={classes.allGrid}>
                        <Typography className={classes.content1} variant='body1'>Total Open Invoices</Typography>
                        <Typography className={classes.content2} variant='h6'>{data[3]}</Typography>    
                 </Grid>
            </Grid>
        );
    }
export default withStyles(styles,{withTheme:true})(ARStatistics);