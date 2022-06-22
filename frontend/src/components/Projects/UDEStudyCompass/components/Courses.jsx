import React, {useState} from "react";
import {Grid, Paper, IconButton, AddIcon, RemoveIcon, Icon, Collapse, Button} from "@material-ui/core"
import { muiStyles } from "../res/muiStyle";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import LinkIcon from '@material-ui/icons/Link';
import NavigationIcon from '@material-ui/icons/Navigation';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddBoxIcon from '@material-ui/icons/AddBox';






import classNames from 'classnames'
import wordcloud from '../res/Wordcloud.png'

import German from "../res/German.png"
import English from "../res/English.png";
import Turkish from "../res/Turkish.png";
import Dutch from "../res/Dutch.png";



//quick translation
const langFlag = (language) =>{
    switch(language.split(";")[0]){
        case 'Türkisch': return Turkish
        case 'Deutsch': return German
        case 'Englisch': return English
        case 'Niederländisch': return Dutch
        default: return ''
    }
}
const fType = (e) => {
    switch(e){
        case  "Vorlesung" : return "Lecture"
        case "Blockseminar": return "Block Seminar"
        case "VL/Übung" : return "Lecture/Exercise"
        default: return e
    }
}

const Courses = (props) => {
    const classes = muiStyles();
    //const {studyprogram} = props;
    //const {name, sws} = studyprogram


    return (
        <><Grid container spacing={1} direction="row" alignItems="stretch" justify="center">
            <Grid item xs={12} className={classes.mobileHidden}>
                <Paper elevation={6} style={{ padding: 24 }}>
                    <Grid container spacing={3} direction="row" alignItems="center"  style={{ paddingLeft: 80 }}>
                        <Grid item xs={1} md={2} className={classes.sorter}>Time</Grid>
                        <Grid item xs={1} md={1} className={classes.sorter}>Workload</Grid>
                        <Grid xs={6} md={6} item className={classes.sorter} container spacing={0} direction="row" alignItems="center">
                            <Grid item><ArrowDownwardIcon /></Grid>
                            <Grid item>Title</Grid>
                        </Grid>
                        <Grid item xs={1} md={2} className={classes.sorter}>Course Type</Grid>

                        <Grid item xs={1} md={1} className={classes.sorter}>Details</Grid>

                    </Grid>

                    <Grid></Grid>
                </Paper>
            </Grid>
        </Grid></>
    )

}

const Course = (props) => {

    //All necessary destructuring
    const {studyprogram} = props;
    const { name: Title,
            url: link,
            sws: timeCom,
            subject_type: CourseType, 
            language: Language,
            selected,
            persons,
          
            timetable,
            studyprograms  } = studyprogram

    
    let profs
    persons.map(result => {profs = result})
    const  {name: Professors} = profs


    let tTable 
    if (timetable.length !== 0 && timetable !== null && timetable !== undefined){
        
        timetable.map(result => {
            tTable = result
        })
    }

    const { day,
            time,
            rhythm,
            duration,
            room,
            status,
            elearn
     } = tTable
    const {from, to} = time
           
    const [isOpen, setToggle] = useState(false);
    const classes = muiStyles();

        return (

            <Paper elevation={3} style={{padding: "3px 24px", position: "relative"}} >
                {/* This line must later be uncommented and worked on after i have done with other things
                <div class="select-icon"><IconButton  onClick={() => handleSel(props)}>{selected ? <RemoveIcon/> : <AddIcon/>}</IconButton></div> */}
                
                    <Grid container spacing={3} direction="row" alignItems="center"  >
                        
                        <Grid item xs={0} md={0}  className={classes.checkbox}><AddBoxIcon/></Grid>
                        <Grid item xs={2} md={2} className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} onClick={() => setToggle(!isOpen)}>
                        <Autocomplete
                                id="combo-box-demo"
                                options={timetable}
                                getOptionLabel={(option) => option.day+option.time.from+"-"+option.time.to}                                
                                style={{ width: 150}}
                                renderInput={(params) => <TextField {...params}  variant="standard" />}
                                />
                        </Grid>
                
                        <Grid item xs={1} md={1} className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} onClick={() => setToggle(!isOpen)}>{timeCom.length !== 0 ? timeCom + " hrs." : "-"}</Grid>
                        <Grid item xs={6} md={6} lg={selected ? 7 : 6} className={classes.emphasis} onClick={() => setToggle(!isOpen)}>{Title}</Grid>         
                        <Grid item xs={1} md={1} className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} onClick={() => setToggle(!isOpen)}>{CourseType.split(";").map(e => fType(e)).join(", ")}</Grid>

                        <Grid item xs={1} md={1} className={classes.emphasis}><div class="expand-icon"><Icon aria-label="expand row" onClick={() => setToggle(!isOpen)}>{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</Icon></div></Grid>
                    </Grid>
                

                {/* Collapsible for all additional information */}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <hr class="hr-lighter"></hr>
                    <Grid item xs={12} style={{padding: 24}}>
                        <Grid container spacing={3} direction="row" alignItems="center" justify="space-evenly">
                            
                            <Grid item xs={12} md={4} xl={2} container spacing={4} direction="column" alignItems="center" justify="space-evenly">
                                <Grid item><table class="info-table">
                                    <tr><th>Professors: </th><td>{Professors}</td></tr>
                                    </table></Grid>
                                <Grid item>                     
                                    <table class="info-table">                                      
                                        <tr><th>Language:</th><td>{Language}</td></tr>
                                        <tr><th>Course Type:</th><td>{CourseType.split(";").map(e => fType(e)).join(", ")}</td></tr>
                                        <tr><th>Time:</th><td>{from+"-"+to}</td></tr>                                       
                                        <tr><th>Day:</th><td>{day}</td></tr>                                       
                                        <tr><th>Rhythm:</th><td>{rhythm}</td></tr>                                       
                                        <tr><th>E-Learn</th><td>{elearn}</td></tr>                                       
                                        <br></br>                      
                                    </table><br></br>
                                    
                               

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={8} xl={10}></Grid>
                        </Grid>
                        <Grid container spacing={3} direction="row" alignItems="center" justify="space-evenly">
                            <Grid item xs={5} spacing={0} container direction="row" alignItems="center" justify="space-evenly">
                                
                                <Grid xs={5} md={5} xl={5}><Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Icon><NavigationIcon/></Icon>}>
                                    go to LSF
                                    </Button>
                                </Grid>
                               
                            </Grid>
                            <Grid item xs={7} container spacing={1} direction="column" alignItems="center" justify="space-evenly">
                                <Grid item><h3>Assigned Study Course</h3> </Grid>
                                <Grid item>{studyprograms}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse> 
            </Paper>
    )
}





export default Courses
export {Course}