// Currying
const calculateTotalCost = (pricePerAppointment) => (numberOfAppointments) => pricePerAppointment * numberOfAppointments;

// Function to calculate the average waiting time of patients using arrow function
const calculateAverageWaitingTime = (appointments) => {
  if (appointments.length === 0) return 0;

  const totalWaitTime = appointments.reduce((total, appointment, index) => {
    if (index === 0) return total; // Skip the first appointment
    const prevAppointment = new Date(appointments[index - 1].fechaHora);
    const currentAppointment = new Date(appointment.fechaHora);
    return total + (currentAppointment - prevAppointment) / (1000 * 60); // Convert to minutes
  }, 0);

  return totalWaitTime / (appointments.length - 1);
};

// Recursive function to calculate total hours of consultation in a week for a doctor
export const calculateTotalHours = (appointments, index = 0, totalHours = 0) => {
  if (index >= appointments.length) return totalHours;

  const appointmentDurationHours = 1; // Assuming each appointment is 1 hour long
  return calculateTotalHours(appointments, index + 1, totalHours + appointmentDurationHours);
};

// Function to calculate discounts
const applyDiscount = (totalCost, discountPercentage) => totalCost - (totalCost * (discountPercentage / 100));

// Function to determine discount based on the number of appointments
const getDiscountPercentage = (numberOfAppointments) => {
  if (numberOfAppointments > 10) return 20;
  if (numberOfAppointments > 5) return 10;
  return 0;
};

// Composition: Calculate total cost with discount
export const calculateDiscountedCost = (numberOfAppointments, pricePerAppointment) => {
  const totalCost = calculateTotalCost(pricePerAppointment)(numberOfAppointments);
  const discount = getDiscountPercentage(numberOfAppointments);
  return applyDiscount(totalCost, discount);
};
