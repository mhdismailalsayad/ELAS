import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Box,
  createMuiTheme,
  ThemeProvider,
  Paper,
  Grid,
} from "@material-ui/core";
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
import { studyprogram } from "../data/studyprograms";
//import Backend from "../../../../assets/functions/Backend";
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
    width: "80%",
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

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StudyCompassFilters = (props) => {
  const { studyprogram } = props;
  const { timetables } = studyprogram;

  const { subject_type } = studyprogram;

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
  const mm = Math.min.apply(Math, Swss); // 0
  const ll = Math.max.apply(Math, Swss); // 12

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

  // const [studyprogram, setstudyprogram ] = useState([])

  // useEffect(() => {
  //   Backend.get("/studycompass/get_studyprograms").then((response) => {
  //     setstudyprogram(response.data);
  //   });
  // }, []);

  const classes = useStyles();

  const [coursetype, setcourse] = React.useState([]);
  const [language, setlanguage] = React.useState([]);
  const [dayz, setdyaz] = React.useState([]);
  const [swz, setswz] = React.useState([0, 12]);
  const [ttime, settime] = React.useState([]);

  const [value, setValue] = React.useState([8, 20]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlecourseChange = (event) => {
    setcourse(event.target.value);
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
        {/* Course Type */}
        <Grid container direction="row" spacing={2}>
          <Grid item xs={2.5}>
            <Paper elevation={1} style={{ padding: 0 }}></Paper>
            <Grid></Grid>
            <Paper elevation={1} style={{ padding: 0 }}>
              <FormControl style={{ width: "110px" }}>
                <InputLabel id="demo-simple-select-label">
                  Course Type
                </InputLabel>
                <Select
                  disableUnderline
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
            </Paper>
          </Grid>
          <Grid item xs={2.5}>
            {/* Language */}
            <Paper elevation={1} style={{ padding: 0 }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  disableUnderline
                  multiple
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
            </Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper elevation={0} style={{ padding: 2 }}>
              {/* Time */}

              <FormControl>
                <InputLabel id="demo-simple-select-label">Time</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  multiple
                  id="demo-simple-select"
                  value={value}
                  label="Time"
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
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper elevation={1} style={{ padding: 0 }}>
              {/* Day */}
              <FormControl>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
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
            </Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper elevation={0} style={{ padding: 2 }}>
              {/* SWS */}
              <FormControl>
                <InputLabel id="demo-simple-select-label">SWS</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={swz}
                  label="SWS"
                  renderValue={(swz) => swz.join(" - ")}
                  MenuProps={MenuProps}
                >
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
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={0} style={{ padding: 2 }}>
              {/* search */}
              <TextField
                id="input-with-icon-textfield"
                aria-label="center"
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
            </Paper>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Paper elevation={1} style={{ padding: 0 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                className={classes.box}
                options={studyprogram}
                getOptionLabel={(option) => {
                  const listOfType = [];
                  for (let opt of option.subject_type) {
                    if (!listOfType.includes(opt)) {
                      listOfType.push(opt);
                      return listOfType;
                    }
                  }
                }}
                onChange={(event, value) => {
                  //setStudyProgramid(value.id);
                }}
                style={{ width: 150 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Course Type"
                    variant="outlined"
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={1} style={{ padding: 0 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                className={classes.box}
                options={studyprogram}
                getOptionLabel={(option) => option.language}
                onChange={(event, value) => {
                  //setStudyProgramid(value.id);
                }}
                style={{ width: 150 }}
                renderInput={(params) => (
                  <TextField {...params} label="Language" variant="outlined" />
                )}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={1} style={{ padding: 0 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                className={classes.box}
                options={studyprogram}
                getOptionLabel={(option) => option.timetables.day}
                onChange={(event, value) => {
                  //setStudyProgramid(value.id);
                }}
                style={{ width: 150 }}
                renderInput={(params) => (
                  <TextField {...params} label="Day" variant="outlined" />
                )}
              />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default StudyCompassFilters;
