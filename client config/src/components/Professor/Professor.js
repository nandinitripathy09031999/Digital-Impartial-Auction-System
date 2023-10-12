import React from 'react';
import { Grid, Typography, Input, withStyles } from '@material-ui/core';
import send from '../../assets/send-24px.svg';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
import { connect } from 'react-redux';
import { displayProfessor } from '../../actions/disableState';
const styles= theme =>({
    grid2:{
        height:'75vh',
        overflowY:'auto'
    },
    grid3:{
        borderRadius:'20px',
        border:'1px solid #4e4d54a6'
    },
    img:{
        backgroundColor:'#21aee8',
        borderRadius:'50%',
        padding:'5px',
        height:'20px'
    },
    message1:{
        alignSelf:'flex-start'
    },
    message2:{
        alignSelf:'flex-end'
    }
})
class Professor extends React.Component{
    state ={
        message:'',
        allChats:[]
    }

    handleChange = e =>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSend = async (e) =>{
        e.preventDefault();
        const {message} = this.state;
        if(message === '')
        return;
        await this.setState(prev =>(
            {allChats:prev.allChats.concat(message)}
        ));
        const resp = await axios.post('http://localhost:4000/chat',{
            message
        })

        await this.setState(prev =>(
            {allChats:prev.allChats.concat(resp.data.message),
            message:''}
        ))
    }
    render(){
        const {classes,display} = this.props;
        const {message,allChats} = this.state;
        return(
            <Grid container item direction='column' wrap='nowrap' lg={2}>
                <Grid container item justify='space-between'>
                    <Typography>PROFESSOR</Typography>
                    <CloseIcon onClick = {() => display(false)}/>
                </Grid>
                <Grid container className={classes.grid2} direction='column' wrap='nowrap'>
                    {
                        allChats.length > 0 ?
                        allChats.map((message,i) =>(
                        <Grid item className={i%2 === 0 ? classes.message2 :classes.message1}>
                            <Typography>{message}</Typography>
                        </Grid>
                        ))
                        :
                        null
                    }
                </Grid>
                <Grid container item className={classes.grid3}>
                    <Input placeholder='Type Here ...' disableUnderline style={{color:'rgba(215, 141, 141, 0.65)'}} name='message' onChange = {this.handleChange} value={message}/>
                    <img src={send} alt='' className={classes.img} onClick={this.handleSend}/>
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    display:(isDisplay) => dispatch(displayProfessor(isDisplay))
})

export default connect(null,mapDispatchToProps)(withStyles(styles,{withTheme:true})(Professor))  ;