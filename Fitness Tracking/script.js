// Calories Counter
const calculateCaloriesButton = document.getElementById('calculate-calories');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const ageInput = document.getElementById('age');
const activityLevelSelect = document.getElementById('activity-level');
const caloriesResultElement = document.getElementById('calories-result');

calculateCaloriesButton.addEventListener('click', calculateCalories);

function calculateCalories() {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const age = parseInt(ageInput.value);
  const activityLevel = activityLevelSelect.value;

  const basalMetabolicRate = calculateBasalMetabolicRate(weight, height, age);
  const dailyCaloricNeeds = calculateDailyCaloricNeeds(basalMetabolicRate, activityLevel);

  caloriesResultElement.textContent = `Your daily caloric needs are: ${dailyCaloricNeeds} calories`;
}

function calculateBasalMetabolicRate(weight, height, age) {
  const basalMetabolicRate = 66 + (6.2 * weight) + (12.7 * height) - (6.8 * age);
  return basalMetabolicRate;
}

function calculateDailyCaloricNeeds(basalMetabolicRate, activityLevel) {
  let dailyCaloricNeeds;
  switch (activityLevel) {
    case 'sedentary':
      dailyCaloricNeeds = basalMetabolicRate * 1.2;
      break;
    case 'lightly-active':
      dailyCaloricNeeds = basalMetabolicRate * 1.375;
      break;
    case 'moderately-active':
      dailyCaloricNeeds = basalMetabolicRate * 1.55;
      break;
    case 'very-active':
      dailyCaloricNeeds = basalMetabolicRate * 1.725;
      break;
    case 'extra-active':
      dailyCaloricNeeds = basalMetabolicRate * 1.9;
      break;
    default:
      dailyCaloricNeeds = basalMetabolicRate * 1.2;
  }
  return dailyCaloricNeeds;
}

// Workout Saver
const saveWorkoutButton = document.getElementById('save-workout');
const workoutNameInput = document.getElementById('workout-name');
const workoutDateInput = document.getElementById('workout-date');
const workoutTypeSelect = document.getElementById('workout-type');
const workoutDurationInput = document.getElementById('workout-duration');
const workoutListElement = document.getElementById('workout-list');

saveWorkoutButton.addEventListener('click', saveWorkout);

function saveWorkout() {
  const workoutName = workoutNameInput.value;
  const workoutDate = workoutDateInput.value;
  const workoutType = workoutTypeSelect.value;
  const workoutDuration = parseInt(workoutDurationInput.value);

  const workout = {
    name: workoutName,
    date: workoutDate,
    type: workoutType,
    duration: workoutDuration
  };

  const workoutList = JSON.parse(localStorage.getItem('workoutList')) || [];
  workoutList.push(workout);
  localStorage.setItem('workoutList', JSON.stringify(workoutList));

  displayWorkoutList();
}

function displayWorkoutList() {
  const workoutList = JSON.parse(localStorage.getItem('workoutList')) || [];
  workoutListElement.innerHTML = '';
  workoutList.forEach((workout) => {
    const workoutListItem = document.createElement('li');
    workoutListItem.textContent = `${workout.name} - ${workout.date} - ${workout.type} - ${workout.duration} minutes`;
    workoutListElement.appendChild(workoutListItem);
  });
}

displayWorkoutList();

// Additional functionality
const clearWorkoutListButton = document.getElementById('clear-workout-list');

clearWorkoutListButton.addEventListener('click', clearWorkoutList);

function clearWorkoutList() {
  localStorage.removeItem('workoutList');
  displayWorkoutList();
}

const exportWorkoutListButton = document.getElementById('export-workout-list');

exportWorkoutListButton.addEventListener('click', exportWorkoutList);

function exportWorkoutList() {
  const workoutList = JSON.parse(localStorage.getItem('workoutList')) || [];
  const csvContent = workoutList.map((workout) => {
    return `${workout.name},${workout.date},${workout.type},${workout.duration}`;
  }).join('\n');
  const csvBlob = new Blob([csvContent], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(csvBlob);
  const csvLink = document.createElement('a');
  csvLink.href = csvUrl;
  csvLink.download = 'workout_list.csv';
  csvLink.click();
}