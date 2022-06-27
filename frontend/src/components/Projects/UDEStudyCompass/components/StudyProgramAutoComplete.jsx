import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { studyprogram } from "../data/studyprograms";

const StudyProgram = (props) => {
  const { selectCourse } = props;
  const [studyProgramid, setStudyProgramid] = useState();

  const getProgramid = () => {
    props.getProgramId(studyProgramid);
  };

  return (
    <Paper elevation={3} style={{ width: 750 }}>
      <Grid container direction="row">
        <Autocomplete
          id="combo-box-demo"
          options={selectCourse}
          getOptionLabel={(option) => option.name}
          defaultValue={() => selectCourse.name}
          onChange={(event, value) => {
            setStudyProgramid(value.id);
            getProgramid();
          }}
          style={{ width: 750 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select your Study Program"
              variant="outlined"
              color="secondary"
            />
          )}
        />
      </Grid>
    </Paper>
  );
};

export default StudyProgram;
