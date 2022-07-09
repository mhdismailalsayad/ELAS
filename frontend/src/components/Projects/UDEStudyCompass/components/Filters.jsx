import React, { useEffect, useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, createMuiTheme, Grid, ThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Slider from "@material-ui/core/Slider";
import Backend from "../../../../assets/functions/Backend";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FB9B0E",
    },
    secondary: {
      main: "#FB9B0E",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  root: {
    width: "100%",
    fontVariant: "small-caps",
    alignContent: "center",
  },
  card: {
    borderRadius: 15,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    fontSize: 18,
  },
  box: {
    alignContent: "center",
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "20px",
    justify: "center",
    textAlign: "center",
  },
  wel: {
    fontSize: 20,
    justify: "center",
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.15px",
  },
  heading: {
    fontSize: 96,
    textAlign: "center",
    justify: "center",
    fontFamily: "Roboto",
    fontStyle: "bold",
    lineHeight: "112px",
    verticalAlign: "top",
    letterSpacing: "-1.5px",
    width: "100%",
  },
  search: {
    width: "182px",
    height: "36px",
    borderRadius: "4px",
    backgroundColor: "FB9B0E",
    color: "FB9B0E",
  },
  listed: {
    height: "100%",
  },
  resetContainer: {
    padding: theme.spacing(3),
    alignItems: "center",
  },
  buttons: {
    marginTop: 10,
    width: 50,
    fontVariant: "small-caps",
  },
}));

const marksTime = [
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
  {
    value: 11,
  },
  {
    value: 12,
  },
  {
    value: 13,
  },
  {
    value: 14,
  },
  {
    value: 15,
  },
  {
    value: 16,
  },
  {
    value: 17,
  },
  {
    value: 18,
  },
  {
    value: 19,
  },
  {
    value: 20,
  },
];

const StudyCompassFilters = (props) => {
  const classes = useStyles();

  const [studyprogram, setStudyProgram] = useState(props.studyprogram);

  const ITEM_HEIGHT = 60;
  const ITEM_PADDING_TOP = 50;
  const MenuProps = {
    props: {
      style: {
        Height: 1000,
        width: 250,
      },
    },
  };
  const {
    id,
    name: Title,
    url: link,
    isSelected,
    sws: timeCom,
    subject_type: CourseType,
    language: Language,
    description: Description,
    keywords,
    selected,
    persons,

    timetable,
    study_programs,
  } = studyprogram || {};

  const courses = [];
  const languages = [];
  const Times = [];
  const Days = [];
  const Swss = [];

  for (let study of studyprogram) {
    if (!courses.includes(study.subject_type)) courses.push(study.subject_type);
    if (!Swss.includes(study.sws)) Swss.push(study.sws);
    if (!languages.includes(study.language)) languages.push(study.language);
    for (let tita of study.timetable) {
      if (!Days.includes(tita.day)) Days.push(tita.day);
      for (let frm in tita.time) {
        if (!Times.includes(frm["from"])) Times.push(frm["from"]);
      }
    }
  }

  const mm = Math.min.apply(Math, Swss);
  const ll = Math.max.apply(Math, Swss); // 12

  const [coursetype, setcourse] = React.useState(courses);
  const [language, setlanguage] = React.useState(languages);
  const [dayz, setdyaz] = React.useState(Days);
  const [swz, setswz] = React.useState([mm, ll]);
  const [ttime, settime] = React.useState([]);
  const [searchtext, setname] = React.useState();
  const [value, setValue] = React.useState([8, 20]);
  const filters = [coursetype, language, dayz, swz, value, searchtext];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlecourseChange = (event) => {
    setcourse(event.target.value);
  };

  const handlesearchChange = (event) => {
    setname(event.target.value);
  };

  const handletimeChange = (event, newValue) => {
    settime(newValue);
  };
  const handlelangeChange = (event) => {
    setlanguage(event.target.value);
  };
  const handledayzChange = (event) => {
    setdyaz(event.target.value);
  };
  const handleswzChange = (event, newValue) => {
    setswz(newValue);
  };

  function valuetext(swz) {
    return `${swz}h`;
  }

  function valuete(value) {
    return `${value}:00`;
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Grid container direction="row" className={classes.box}>
          <Grid xs={2}>
            {/* Course Type */}
            <FormControl style={{ width: "100px" }} variant={"filled"}>
              <InputLabel id="demo-simple-select-label" margin="dense">
                Course Type
              </InputLabel>
              <Select
                style={{ backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={coursetype}
                label="Course Type"
                onChange={handlecourseChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {courses.map((name) => (
                  <MenuItem key={name} value={name}>
                    <ListItemText primary={name} />
                    <Checkbox checked={coursetype.indexOf(name) > -1} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {"   "}

          <Grid xs={2}>
            {/* Language */}
            <FormControl style={{ width: "100px" }} variant="filled">
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                style={{ backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Language"
                onChange={handlelangeChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {languages.map((name) => (
                  <MenuItem key={name} value={name}>
                    <ListItemText primary={name} />
                    <Checkbox checked={language.indexOf(name) > -1} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2}>
            {/* Day */}
            <FormControl style={{ width: "100px" }} variant="filled">
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                style={{ backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                multiple
                id="demo-simple-select"
                value={dayz}
                label="Day"
                onChange={handledayzChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {Days.map((name) => (
                  <MenuItem key={name} value={name}>
                    <ListItemText primary={name} />
                    <Checkbox checked={dayz.indexOf(name) > -1} />
                    {/* change the value ZB Di. -> tuersday */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={2}>
            {/* Time */}
            <FormControl style={{ width: "100px" }}>
              <InputLabel id="demo-simple-select-label" variant="filled">
                Time
              </InputLabel>
              <Select
                style={{ backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                multiple
                id="demo-simple-select"
                value={value}
                label="Time"
                valueLabelFormat={valuete}
                onChange={handletimeChange}
                renderValue={(value) => value.join(" - ")}
                MenuProps={MenuProps}
              >
                <MenuItem style={{ height: "100px" }}>
                  {/* <TextField disabled label="from"  value={value} > </TextField> */}

                  <Typography>
                    {value[0]}:00 - {value[1]}:00
                  </Typography>

                  {/* <TextField disabled label="to" defaultValue="20:00" > </TextField> */}
                </MenuItem>
                <MenuItem style={{ height: "100px" }}>
                  <Slider
                    style={{ backgroundColor: "white" }}
                    variant="filled"
                    getAriaValueText={valuete}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="discrete-slider-custom"
                    marks={marksTime}
                    valueLabelFormat={valuete}
                    min={8}
                    max={20}
                  />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={2}>
            {/* SWS */}
            <FormControl style={{ width: "100px" }}>
              <InputLabel id="demo-simple-select-label" variant="filled">
                SWS
              </InputLabel>
              <Select
                style={{ backgroundColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={swz}
                label="SWS"
                renderValue={(swz) => swz.join(" - ")}
                MenuProps={MenuProps}
              >
                <MenuItem style={{ height: "100px" }}>
                  <Typography>
                    {swz[0]}h - {swz[1]}h
                  </Typography>
                </MenuItem>
                <MenuItem style={{ height: "100px" }}>
                  <Slider
                    getAriaValueText={valuetext}
                    value={swz}
                    onChange={handleswzChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    min={mm}
                    max={ll}
                  />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={2} className={classes.search}>
            {/* search */}
            <TextField
              style={{ width: "200px", backgroundColor: "white" }}
              id="input-with-icon-textfield"
              aria-label="center"
              value={searchtext}
              onChange={handlesearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="center">
                    <SearchIcon style={{ color: "#000" }}> </SearchIcon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              label="Search for courses"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default StudyCompassFilters;
