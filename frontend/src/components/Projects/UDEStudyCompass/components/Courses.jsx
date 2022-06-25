import React, {useState} from "react";
import {Grid, Paper, IconButton, AddIcon, RemoveIcon, Icon, Collapse, Button, Typography} from "@material-ui/core"
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
import SchoolIcon from '@material-ui/icons/School';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'







import classNames from 'classnames'
import KeyWordCloud from "./KeyWordCloud";

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
        case "VL/Übung": return "Lecture/Exercise"
        case "Vorlesung/Übung" : return "Lecture/Exercise"
        case "Übung": return "Exercise"
        case "Praxisprojekt": return "Practice Project"
        default: return e
    }
}
const fryhthm = (e) => {
    switch(e){
        case "wöch.": return "Weekly"
        default: return e
    }
}
const fday = (e) => {
    switch(e) {
        case "Mo.": return "Monday"
        case "Di." || "Tu.": return "Tuesday"
        case "Wed..": return "Wednesday"
        case "Do.": return "Thursday"
        case "Fr.": return "Friday"
       default: return e
    }
}

const fInitials = (e) => {
    const fullName = e.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

const Courses = (props) => {
    const classes = muiStyles();
    //const {studyprogram} = props;
    //const {name, sws} = studyprogram


    return (
        <>
            
                <Paper elevation={6} style={{ padding: 24 }}>
                    <Grid container spacing={3} xs={12} direction="row" alignItems="center"  style={{ paddingLeft: 80 }}>
                        <Grid xs={1} className={classes.sorter}><Typography>Time</Typography></Grid>
                        <Grid xs={2} className={classes.sorter}><Typography>Workload</Typography></Grid>
                        <Grid xs={6}  item className={classes.sorter} container spacing={0} direction="row" alignItems="center">
                            <Grid item xs={false} md={false}><ArrowDownwardIcon /></Grid>
                            <Grid item><Typography>Title</Typography></Grid>
                        </Grid>
                        <Grid xs={2} item className={classes.sorter}><Typography>Course Type</Typography></Grid>

                        <Grid xs={1}  item  className={classes.sorter}><Typography>Detail</Typography></Grid>

                    </Grid>

                    <Grid></Grid>
                </Paper>
            
        </>
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
            description: Description,
            keywords,
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
    const {from: duFrom, to: duTo} = duration;
           
    const [isOpen, setToggle] = useState(false);
    const classes = muiStyles();

        return (

            <Paper elevation={3} style={{padding: "3px 24px", position: "relative"}} >
                {/* This line must later be uncommented and worked on after i have done with other things
                <div class="select-icon"><IconButton  onClick={() => handleSel(props)}>{selected ? <RemoveIcon/> : <AddIcon/>}</IconButton></div> */}
                
                    <Grid xs={12} container spacing={3} direction="row" alignItems="center">
                        
                        <Grid item xs={false}   className={classes.checkbox}><IconButton><AddBoxIcon style={{color:"orange"}}/></IconButton></Grid>
                        <Grid item xs={1}  className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])}>
                            {timetable.length == 1 ? <div>{`${day} ${from}-${to}`}</div> :  
                            <Autocomplete
                                id="combo-box-demo"
                                options={timetable}
                                defaultValue={() => timetable[0]}
                                getOptionLabel={(option) => option.day+option.time.from+"-"+option.time.to}                                
                                style={{ width: 180}}
                                renderInput={(params) => <TextField {...params}  variant="standard" />}
                            />}
                        </Grid>
                
                        <Grid item xs={2}  className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])}>{timeCom.length !== 0 ? timeCom + " hrs." : "-"}</Grid>
                        <Grid item xs={5}  className={classes.emphasis} >{Title}</Grid>         
                        <Grid item xs={1}   className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} >{CourseType.split(";").map(e => fType(e)).join(", ")}</Grid>

                        <Grid item xs={1} style={{paddingLeft: 97}}  className={classes.emphasis}><div class="expand-icon"><IconButton aria-label="expand row" onClick={() => setToggle(!isOpen)} style={{transform: isOpen ? "rotate(180deg)" : ""}}> <KeyboardArrowDownIcon style={{padding: 0, margin:0}} /></IconButton></div></Grid>
                    </Grid>
                

                {/* Collapsible for all additional information */}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    
                    <Grid item xs={12} style={{padding: 24}}>
                        <Grid container spacing={3} direction="row" alignItems="center">
                            <Grid item><Typography variant="h5">{Title}</Typography></Grid>
                        </Grid>
                        <Grid container spacing={5} direction="row" >
                            <Grid item xs={7} container direction="column"   spacing={10} >
                                <Grid item container direction="column" spacing={1}>
                                    <Grid item><Typography variant="h6" >Professor(s)</Typography></Grid>
                                    {persons.map((result)=> <Grid item container direction="row" spacing={1} alignItems="center">
                                                                <Grid item> 
                                                                    <Avatar >{fInitials(result.name)}</Avatar> 
                                                                </Grid>
                                                                <Grid item><Typography>{result.name}</Typography></Grid>
                                                            </Grid>)}
                                </Grid>
                                <Grid item container direction="column" spacing={1}>
                                    <Grid item><Typography variant="h6" >Topics</Typography></Grid>
                                    <Grid item>{keywords.length > 0 ? <KeyWordCloud keywords={keywords}/> : "---" }</Grid>
                                </Grid>

                                <Grid></Grid>

                            </Grid>

                            <Grid item xs={5} container direction="column"  justify="center" spacing={6} >
                                
                                <Grid item container direction="row" spacing={2}>
                                    <Grid xs={6}  md={6} xl={6}item container direction="column" spacing={1}>
                                        <Grid item container direction="row" spacing={2}>
                                            <Grid xs={6}  md={6} xl={6}item container direction="column" spacing={1}>
                                                <Grid item><Typography variant="h6" >Time</Typography></Grid>
                                                <Grid item><Typography>{`${from}-${to}`}</Typography></Grid>
                                            </Grid>
                                            <Grid xs={6}  md={6} xl={6}item container direction="column" spacing={1}>
                                                <Grid item><Typography variant="h6" >Rhythm</Typography></Grid>
                                                <Grid item><Typography>{fryhthm(rhythm)}</Typography></Grid>
                                            </Grid>
                                            <Grid xs={6}  md={6} xl={6}item container direction="column" spacing={1}>
                                                <Grid item><Typography variant="h6" >Day</Typography></Grid>
                                                <Grid item><Typography>{fday(day)}</Typography></Grid>
                                            </Grid>
                                            <Grid xs={6}  md={6} xl={6}item container direction="column" spacing={1}>
                                                <Grid item><Typography variant="h6" >E-Learn</Typography></Grid>
                                                <Grid item><Typography>{elearn !== "" ? elearn : "  ---"}</Typography></Grid>
                                            </Grid>



                                       
                                        </Grid>
                                    </Grid>
                                    <Grid xs={4}  md={4} xl={4} item container direction="column" spacing={1}>
                                        <Grid item><Typography variant="h6" >Duration</Typography></Grid>
                                        <Grid item container direction="column" spacing={2}>
                                            {duration !== "" ? <><Grid item container direction="column" spacing={1}>

                                                <Grid item><Typography>From</Typography></Grid>
                                                <Grid item>{duFrom}</Grid>
                                                </Grid>
                                                <Grid item container direction="column" spacing={1}>
                                                <Grid item><Typography>To</Typography></Grid>
                                                <Grid item>{duTo}</Grid>
                                                </Grid></> : <Grid item><Typography>{"---"}</Typography></Grid>}
                                            

                                        </Grid>

                                       
                                       
                                    </Grid>

                                </Grid>
                                <Grid item container direction="column" spacing={1}>
                                    <Grid item><Typography variant="h6" >Description</Typography></Grid>
                                    <Grid item>{Description !== "" ? Description : "---"}<Typography></Typography></Grid>
                                </Grid>
                                <Grid item container direction="column" spacing={1}>
                                    <Grid item><Typography variant="h6" >Assigned Study Program</Typography></Grid>
                                    <Grid item>#####ToDo####</Grid>
                                </Grid>
                                
                                <Grid item>
                                   
                                    <Button variant="outlined"                                  
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<Icon><SchoolIcon/></Icon>}>
                                         <a href={link} style={{textDecoration: "none", color:"text.primary"}}>
                                            TO LSF
                                        </a>
                                   
                                    </Button></Grid>
                                    
                                
                            </Grid>
                        
                        </Grid>
                        
                            
                       
                       
                    </Grid>
                </Collapse> 
            </Paper>
    )
}





export default Courses
export {Course}