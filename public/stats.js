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
  let workouts = workoutNames(data);
  const colors = generatePalette();
  const dates = getDateLabels(data);
  let cardioData = cardioWorkoutDataByType(data);
  let resistanceData = resistanceWorkoutDataByType(data);





  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

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

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Type of xcercises Performed by type in (minutes)"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workouts => {
    durations.push(workouts.totalDuration);
  });
  console.log(durations);
  return durations;
}

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
        let exName = exercise.name;
        let exDurations = exercise.duration;
        workouts.push({ [exName]: exDurations });
      }
    });
  });
  console.log(workouts);
  return workouts;
}


function resistanceWorkoutDataByType(data) {
  let workouts = [];
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exercise.type === "resistance") {
        console.log(exercise);
        let exName = exercise.name;
        let exDurations = exercise.duration;
        workouts.push({ [exName]: exDurations });
      }
    });

    // workouts.reduce( function (Allworkouts, workout) {
    //   if (workout[key] in Allworkouts[key]){
    //     { workout[key] : 
    //   }
    // })

    })


  console.log(workouts);
  return workouts;
}
