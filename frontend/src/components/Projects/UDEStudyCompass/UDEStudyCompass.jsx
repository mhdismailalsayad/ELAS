import { Button, Grid, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import Schedule from "./components/Schedule";
import Courses from "./components/Courses";
import { Course } from "./components/Courses";

import { useParams } from "react-router-dom";
import Backend from "../../../assets/functions/Backend";
import axios from "axios";

import { studyprogram } from "./data/studyprograms";
import StudyProgram from "./components/StudyProgramAutoComplete";
import StudyCompassDataHandler from "./data/DataHandler";

const UDEStudyCompass = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [studyprograms, setStudyPrograms] = useState(studyprogram);
  const [selectCourse, setSelecCourse] = useState(
    StudyCompassDataHandler.getStudyPrograms()
  );

  let { id } = useParams();
  const [studyProgramId, setStudyProgramId] = useState();
  const getSelecedCourseId = (studyProgramid) => {
    setStudyProgramId(studyProgramid);
  };
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/studycompass/get_lectures_with_rid?id=${id}`)
      .then((response) => {
        const responseData = response.data;
        setLectures(responseData);
      });
  }, []);

  console.log(studyProgramId);
  // fetch(`http://localhost:5000/studycompass/get_lectures_with_rid?id=${id}`)
  //   .then((res) => res.json())
  //   .then((data) => setLectures(data));

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
          <Grid item xs={4}>
            {/* TODO: Your new left side components here */}
            <Grid container justify="space-between">
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
            </Grid>
          </Grid>
          <Grid item xs={8}>
            {/* TODO: Your new right side components here */}
            {showSchedule ? (
              <Schedule />
            ) : (
              <Grid item container direction="row" spacing={10}>
                {/* Here should all the components come */}
                <Grid item xs={12}>
                  <StudyProgram
                    selectCourse={selectCourse}
                    getProgramId={getSelecedCourseId}
                  />
                </Grid>

                <Grid item>param : {id}</Grid>

                <Grid item container direction="row" spacing={2}>
                  <Grid item xs={12}>
                    <Courses />
                  </Grid>

                  <Grid item container direction="row" spacing={2}>
                    {studyprograms.map((studyprogram) => (
                      <Grid item xs={12}>
                        <Course studyprogram={studyprogram} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} md={1} />
    </Grid>
  );
};

export default UDEStudyCompass;
