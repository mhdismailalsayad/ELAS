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
import SemesterOverviewCard from "./components/SemesterOverviewCard";
import SelectedCoursesCard from "./components/SelectedCourseCard";
import SelectedCourse2 from "./components/SelectedCourseCard2";
import ExploreIcon from "@material-ui/icons/Explore";

import { useParams } from "react-router-dom";

import axios from "axios";
import { studyprogram } from "./data/studyprograms";
import StudyCompassDataHandler from "./data/DataHandler";

const UDEStudyCompass = () => {
  const [studyPrograms, setStudyprograms] = useState("");
  const [lectures, setLectures] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);

  useEffect(() => {
    Backend.get("/studycompass/get_studyprograms").then((response) => {
      setStudyprograms(response.data);
    });
  }, []);

  ///////////the method helps to get lecture data from the child component of homepage
  ///it also modifies the recieved data by adding field 'isSelected'. needed for removing element on click

  const getLectures = (data) => {
    data.map((el) => (el["isSelected"] = false));

    setLectures(data);
  };

  ///////the method removes course from the list of courses and add it to another list
  //which is then used for data representation in the selected courses
  const handleAddCoursesById = (courseId) => {
    for (let lecture of lectures) {
      if (lecture.id === courseId) {
        lecture.isSelected = true;
        const lecturesAfterRemove = lectures.filter((el) => el.id !== courseId);
        //setLectures(lecturesAfterRemove);
        setAddedCourses([...addedCourses, lecture]);
      }
    }
  };

  ////////////////////////////////////////////
  ///removes courses from selected Courses and add it back the main course component
  const handRemoveCourseById = (courseId) => {
    for (let lecture of lectures) {
      if (lecture.id === courseId) {
      }
    }
  };
  /////////////////

  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Grid container style={{ padding: 5 }}>
      <Grid item xs={0} md={1} />
      {/* <Grid item xs style={{ backgroundColor: "#fff", height: "100vh" }}> */}
      <Grid item xs>
        {/* TODO: Your new components here */}

        <Grid container spacing={5}>
          {lectures.length === 0 ? (
            <Grid item xs={12}>
              <CourseMenu
                studyPrograms={studyPrograms}
                getlectures={getLectures}
              />
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              spacing={5}
              style={{ paddingTop: 42 }}
            >
              <Grid
                item
                xs={4}
                container
                direction="column"
                justifyContent="flex-start"
                //alignItems="center"
                spacing={4}
              >
                <Grid item>
                  <Typography
                    style={{
                      fontSize: "32px",

                      fontFamily: "Roboto",
                      fontStyle: "bold",
                      lineHeight: "112px",
                      verticalAlign: "top",
                      letterSpacing: "-1.5px",
                      width: "100%",
                    }}
                  >
                    <Typography variant="body" style={{ color: "#FB9B0E" }}>
                      <ExploreIcon
                        variant="body"
                        style={{
                          fontSize: "32px",
                        }}
                      >
                        {" "}
                      </ExploreIcon>
                    </Typography>
                    <Typography variant="body" style={{ color: "#3C56BA" }}>
                      Study
                    </Typography>
                    <Typography variant="body" style={{ color: "#FB9B0E" }}>
                      Compass
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item container direction="row" spacing={1}>
                  <Grid item>
                    <Typography>Your Semester Overview</Typography>
                  </Grid>
                  <Grid item>
                    {" "}
                    <SemesterOverviewCard />
                  </Grid>
                </Grid>
                <Grid ite container direction="row" spacing={1}>
                  <Grid item>
                    <Typography>Selected Courses</Typography>
                  </Grid>
                  {addedCourses.length !== 0 ? (
                    <>
                      {" "}
                      {addedCourses.map((selectedCourse) => (
                        <Grid item>
                          <SelectedCourse2
                            selectedCourse={selectedCourse}
                            handleRemoveById={handRemoveCourseById}
                          />
                        </Grid>
                      ))}{" "}
                    </>
                  ) : (
                    <Grid item>
                      <Typography
                        variant="h4"
                        style={{ color: "#9e9e9e", padding: "30px" }}
                      >
                        Please Select a Course
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={8} container direction="row" spacing={0}>
                <Grid item xs={12}>
                  <StudyCompassFilters studyprogram={lectures} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  spacing={2}
                  style={{ marginTop: 42 }}
                >
                  <Grid item xs={12}>
                    {" "}
                    <Courses />
                  </Grid>
                  <Grid item container direction="row" spacing={2}>
                    {lectures.map((studyprogram) => (
                      <Grid item xs={12}>
                        <Course
                          studyprogram={studyprogram}
                          handleAddById={handleAddCoursesById}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={0} md={1} />
    </Grid>
  );
};

export default UDEStudyCompass;
