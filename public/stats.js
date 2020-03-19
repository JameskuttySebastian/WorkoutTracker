// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    newData = data.reverse();
    console.log(newData);
    populateChart(newData);
  });


API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  // let workouts = workoutNames(data); //not in use
  const colors = generatePalette();
  const dates = getDateLabels(data);
// section to get resistance workouts by type and total for each
  let resistanceData = resistanceWorkoutDataByType(data);
  let resistanceDataName = resistanceData.map(({ name }) => name);
  let resistanceDataDuration = resistanceData.map(({ duration }) => duration);
// section to get rcardio workouts by type and total for each
  let cardioData = cardioWorkoutDataByType(data);
  let cardioDataName = cardioData.map(({ name }) => name);
  let cardioDataDuration = cardioData.map(({ duration }) => duration);




  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

//Only labels changed from days to date
  let lineChart = new Chart(line, {
    type: "line",
    data: {
      // labels: [
      //   "Sunday",
      //   "Monday",
      //   "Tuesday",
      //   "Wednesday",
      //   "Thursday",
      //   "Friday",
      //   "Saturday"
      // ],
      labels: dates,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
//Only labels changed from days to date
  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      // labels: [
      //   "Sunday",
      //   "Monday",
      //   "Tuesday",
      //   "Wednesday",
      //   "Thursday",
      //   "Friday",
      //   "Saturday",
      // ],
      labels: dates,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
// changed to show resistance exercises only
  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: resistanceDataName,
      datasets: [
        {
          label: "Resistance Excercises Performed",
          backgroundColor: colors,
          data: resistanceDataDuration
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Resistance Excercises Performed in (minutes)"
      }
    }
  });
// changed to show cardio exercises only
  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: cardioDataName,
      datasets: [
        {
          label: "Cardio Excercises Performed",
          backgroundColor: colors,
          data: cardioDataDuration
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Cardio Excercises Performed in (minutes)"
      }
    }
  });
}
// No change from original function
function duration(data) {
  let durations = [];
  data.forEach(workouts => {
    durations.push(workouts.totalDuration);
  });
  console.log(durations);
  return durations;
}
// New function to get all the dates and correct format
function getDateLabels(data) {
  let dateList = [];
  data.forEach(workouts => {
    let dateFormat = workouts.day;
    dateFormat = moment(dateFormat).format("DD-MM-YYYY");
    console.log(dateFormat);
    dateList.push(dateFormat);
  });
  console.log("dateList");
  console.log(dateList);
  return dateList;
}

// No change in this function
function calculateTotalWeight(data) {
  let total = [];
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      total.push(exercise.weight);
    });
  });
  console.log(total);
  return total;
}
// This function is not in use any more
function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  console.log(workouts);
  return workouts;
}

function cardioWorkoutDataByType(data) {
  let workouts = [];
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exercise.type === "cardio") {
        console.log(exercise);
        // let exName = exercise.name;
        // let exDurations = exercise.duration;
        workouts.push({ name : exercise.name, duration : exercise.duration});
      }
    });
  });

  const reducedWorkouts = Object.values(workouts.reduce((c, {name,duration}) => {
    c[name] = c[name] || {name,duration: 0};
    c[name].duration += duration;
    return c;
  }, {}));  

  console.log(reducedWorkouts);
  return reducedWorkouts;
}


function resistanceWorkoutDataByType(data) {
  let workouts = [];
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exercise.type === "resistance") {
        console.log(exercise);
        // let exName = exercise.name;
        // let exDurations = exercise.duration;
        // workouts.push({ [exName]: exDurations });
        workouts.push({ name : exercise.name, duration : exercise.duration});
      }
    });
  });
  const reducedWorkouts = Object.values(workouts.reduce((c, {name,duration}) => {
    c[name] = c[name] || {name,duration: 0};
    c[name].duration += duration;
    return c;
  }, {}));  
  console.log(reducedWorkouts);
  return reducedWorkouts;
}
