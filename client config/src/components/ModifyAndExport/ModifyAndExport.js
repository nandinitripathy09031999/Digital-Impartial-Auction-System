import React from 'react';
import { Typography, Grid, Button, CircularProgress, withStyles, Modal, Backdrop, Fade, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { formatter } from '../../utils/formatter';
import { setCustStats } from '../../actions/filterCustomer';
import { setOpenAmount ,modifyTable} from '../../actions/Modify';
import axios from 'axios';

const styles = theme =>({
    root:{
        marginBottom:'5px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper:{
        backgroundColor:'#252C48',
        border:'1px solid #ffffffA6',
    },
    grid1:{
        padding:'0 10px',
        borderRight:'1px solid rgba(0, 0, 0, 0.23)'
    },
    button:{
        height:'30px',
        margin:'0 10px'
    }
})
class ModifyAndExport extends React.Component{
    state = {
        open:false,
        openAmount: 0,
        docType:'',
    }
    componentDidMount(){
        const {data,setCustStats} = this.props
            let custStats = [];
            custStats.push(data.reduce((acc,curr) => acc + curr.total_open_amount,0));
            custStats.push(data.reduce((acc,curr) =>acc + curr.isOpen,0));
            setCustStats(custStats);
    }

    handleOpen = () => {
        const {openAmount,docType} = this.props
        this.setState({openAmount,docType,open:true})
    }

    handleClose = () => this.setState({open:false})

    handleChange = (e) =>{
        const {name,value} = e.target;
        this.setState({[name]:value})
    }

    handleUpdate = async (e) =>{
        e.preventDefault();
        const {openAmount,docType} = this.state;
        const {setOpenAmount,modifyTable,idx} = this.props
        if(openAmount === this.props.openAmount && docType === this.props.docType)
        return this.handleClose();
        const resp = await axios.get('http://localhost:8080/DemoJSP/update',{
            params:{
                idx,
                openAmount,
                docType
            }
        })
        if(resp.status === 200){
        setOpenAmount(openAmount - this.props.openAmount);
        modifyTable({openAmount :Number(openAmount),docType});
        this.handleClose()
        }else{
            alert("Updation can't be done right now")
        }
    }
    render(){
        const {custStats,classes,disable} = this.props;
        const {open,openAmount,docType} = this.state
        if(custStats)
        return(
            <Grid container item justify='space-between' wrap='nowrap' className={classes.root}>
            <Grid container item lg={6} alignItems='flex-end'>
              <Button variant='outlined' disabled={disable} className={classes.button} onClick={this.handleOpen}>MODIFY</Button>
              <Button variant='outlined' className={classes.button}> EXPORT</Button>
            </Grid>
            <Grid container item lg={6} justify='flex-end' wrap='nowrap'>
              <Grid  item  className={classes.grid1}>
                <Typography variant='h6'>{formatter(custStats[0])}</Typography>
                <Typography>Total Open Invoices</Typography>
              </Grid>
              <Grid item className={classes.grid1}>
                <Typography variant='h6'>{custStats[1]}</Typography>
                <Typography>Total Open Amount</Typography>
              </Grid>
            </Grid>
            <Modal 
            open = {open} 
            onClose={this.handleClose} 
            closeAfterTransition 
            BackdropComponent ={Backdrop}
            BackdropProps={{
                timeout: 500,
              }}
            className={classes.modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description" >
                <Fade in={open}>
                    <Grid container direction = 'column' wrap = 'nowrap' className={classes.paper}>
                        <Typography variant='h6'>Modify</Typography>
                        <Grid container item>
                            <Typography>Open Amount ($)</Typography>
                            <Input type='number' disableUnderline required name='openAmount' value={openAmount} onChange = {this.handleChange}/>
                        </Grid>
                        <Grid container item>
                            <Typography>Document Type</Typography>
                            <Input type='text' disableUnderline name='docType' required value={docType} onChange = {this.handleChange}/>
                        </Grid>
                        <Grid container item>
                            <Button variant='outlined' onClick={this.handleClose}>CANCEL</Button>
                            <Button variant='outlined' onClick = {this.handleUpdate}>SAVE</Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
          </Grid>
        );else
        return(
            <div>
                <CircularProgress/>
            </div>
        )
    }
}

const mapStateToProps = ({invoices:{custStats,openAmount,docType,idx},disabled:{disable}}) =>({
    custStats,
    disable,
    openAmount,
    docType,
    idx
})

const mapDispatchToProps = dispatch =>({
    setCustStats :payload => dispatch(setCustStats(payload)),
    setOpenAmount :payload =>dispatch(setOpenAmount(payload)),
    modifyTable :payload => dispatch(modifyTable(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles,{withTheme:true})(ModifyAndExport));