class StudyCompassDataHandler {
  studyPrograms = [];
  lectures = [];
  constructor() {
    fetch("http://localhost:5000/studycompass/get_studyprograms")
      .then((res) => res.json())
      .then((data) => (this.studyPrograms = data));
  }

  getStudyPrograms() {
    return this.studyPrograms;
  }
}

export default new StudyCompassDataHandler();
