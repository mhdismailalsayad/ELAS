import { Button, Grid, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import Schedule from "./components/Schedule";
import Courses from "./components/Courses";
import { Course } from "./components/Courses";
import CourseMenu from "./components/StudyProgramMenu";
import Backend from "../../../assets/functions/Backend";
import StudyCompassFilters from "./components/Filters";

import { useParams } from "react-router-dom";

import axios from "axios";
import { studyprogram } from "./data/studyprograms";
import StudyCompassDataHandler from "./data/DataHandler";

const UDEStudyCompass = () => {
  const [studyPrograms, setStudyprograms] = useState("");
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    Backend.get("/studycompass/get_studyprograms").then((response) => {
      setStudyprograms(response.data);
    });
  }, []);

  const getLectures = (data) => {
    setLectures(data);
  };
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Grid container style={{ paddingTop: 24 }}>
      <Grid item xs={0} md={1} />
      {/* <Grid item xs style={{ backgroundColor: "#fff", height: "100vh" }}> */}
      <Grid item xs>
        {/* TODO: Your new components here */}
        <Typography variant="h2" align="center" gutterBottom>
          New StudyCompass Homepage
        </Typography>
        <Grid container spacing={2}>
          {lectures.length === 0 ? (
            <Grid item xs={12}>
              <CourseMenu
                studyPrograms={studyPrograms}
                getlectures={getLectures}
              />
            </Grid>
          ) : (
            <>
              <Grid item xs={4}>
                <Grid item container direction="row" spacing={10}>
                  <Grid item>Here comes semester overview</Grid>
                  <Grid item>Here comes selected course</Grid>
                </Grid>
                {/* TODO: Your new left side components here */}
                {/*<Grid container justify="space-between">
                  <Typography variant="h6" color="textSecondary">
                    Your semester overview
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={!showSchedule ? <ArrowForwardIcon /> : <></>}
                    startIcon={showSchedule ? <ArrowBackIcon /> : <></>}
                    onClick={() => setShowSchedule(!showSchedule)}
                  >
                    {showSchedule ? `Hide schedule` : `Show schedule`}
                  </Button>
          </Grid> */}
              </Grid>
              <Grid item xs={8}>
                <Grid item container direction="row" spacing={10}>
                  {/* Here should all the components come */}
                  <Grid item>
                    <StudyCompassFilters studyprogram={lectures} />
                  </Grid>

                  <Grid item container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <Courses />
                    </Grid>

                    <Grid item container direction="row" spacing={2}>
                      {lectures.map((studyprogram) => (
                        <Grid item xs={12}>
                          <Course studyprogram={studyprogram} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item xs={0} md={1} />
    </Grid>
  );
};

export default UDEStudyCompass;
