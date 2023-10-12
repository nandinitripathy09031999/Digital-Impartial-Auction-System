import React from 'react';
import {ReactComponent as Logo} from '../../assets/companyLogo.svg';
import voice from '../../assets/voiceIcon.svg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, Button, withStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { displayProfessor } from '../../actions/disableState';
const styles = theme =>({
    root:{
        height:'60px',
    },
    gridSec:{
        background:'#fc7500',
        padding:' 0 10px',
        borderRadius:'0 0 4px 4px',
        color:'white',
        width:'max-content',
        margin:'0 auto'
    },
    button:{
        background: '#fc7500',
        borderRadius: '40px',
        padding: '0',
        paddingLeft: '6px'
    },
})
class Header extends React.Component{
    render(){
    const {classes,location,history,handleDisplay,display} = this.props;
        return(
            <Grid component='nav' container justify='space-between' className={classes.root} alignItems='center' wrap='nowrap'>
            {   location.pathname ==='/' ?
                <Grid container alignItems='center' item lg={4}>
                    <Logo  style={{height:'40px',width:'auto'}}/>
                    <Typography variant='h4' style={{color:'white'}}>ABC Products</Typography>
                </Grid>
                :
                <Grid container item lg={4} alignItems='center'>
                    <Grid item style={{marginRight:'5px'}}>
                        <ArrowBackIcon style={{color:'white'}} onClick={() => history.push('/')}/>
                    </Grid>
                    <Grid>
                        <Typography variant={"h6"} style={{color:'white'}}>{location.state.custName}</Typography>
                        <Typography style={{color:'#ffffffA6'}}>{location.state.custNum}</Typography>
                    </Grid>
                </Grid>
            }
            <Grid item lg = {4} style={{alignSelf:'flex-start'}}>
                <Typography className={classes.gridSec} align='center'>Receivables Dashboard</Typography>
            </Grid>
            <Grid item lg={4} style={{textAlign:'right'}}>
               <Button className={classes.button} onClick = {() =>handleDisplay(true)} ><Typography style={{color:'white'}}>PROFESSOR</Typography> <img src={voice} height='40px' width='auto' alt=''/></Button>
            </Grid>
        </Grid>
        )
    }
}

const mapStateToProps = ({disabled:display}) =>({
    display
})
const mapDispatchToProps = dispatch =>({
    handleDisplay:(isDisplay) => dispatch(displayProfessor(isDisplay))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles,{withTheme:true})(withRouter(Header)));