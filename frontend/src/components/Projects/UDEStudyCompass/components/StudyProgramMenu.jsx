import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  Divider,
  Box,
  Card,
  CardContent,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import StudyProgram from "./StudyProgramAutoComplete";
import StudyCompassDataHandler from "../data/DataHandler";

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
  },
  study: {
    color: "#3C56BA",
  },
  campass: {
    color: "#FB9B0E",
  },
  search: {
    width: "182px",
    height: "36px",
    borderRadius: "4px",
    backgroundColor: "FB9B0E",
    color: "FB9B0E",
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

const DemoMain = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [selectedStudyProgram, setSelectedStudyProgram] = useState(
    StudyCompassDataHandler.getStudyPrograms()
  );

  const [studyProgramId, setStudyProgramId] = useState();
  const getSelecedCourseId = (studyProgramid) => {
    setStudyProgramId(studyProgramid);
  };
  console.log(studyProgramId);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box className={classes.box}>
          <Typography variant="h6" className={classes.wel}>
            Welcome
          </Typography>
        </Box>
        <Box className={classes.box}>
          <Typography variant="h1" className={classes.heading}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="body"
              className={classes.study}
            >
              Study
            </Typography>
            <Typography variant="body" className={classes.campass}>
              Compass
            </Typography>
          </Typography>
        </Box>

        <Box className={classes.box}>
          <StudyProgram
            selectCourse={selectedStudyProgram}
            getProgramId={getSelecedCourseId}
          />
        </Box>
        <Box className={classes.box}>
          <Button
            onClick={() => {
              studyProgramId === undefined || studyProgramId === ""
                ? history.push("/ude-studycompass")
                : history.push(`/ude-studycompass/${studyProgramId}`);
            }}
            variant="contained"
            className={classes.search}
          >
            {" "}
            <SearchIcon />
            Search
          </Button>
        </Box>
        <Box className={classes.box}>
          {" "}
          <Divider variant="middle" />{" "}
        </Box>
        <Box className={classes.box}>
          <Link href="test" underline="none" onClick={handleClickOpen}>
            {"What is StudyCompass?"}
          </Link>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default DemoMain;
