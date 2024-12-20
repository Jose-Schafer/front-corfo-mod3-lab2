import '../scss/styles.scss'
import { AppointmentStack, createAppointmentListItemHTML, renderAppointmentTable } from './components/appointments';

const appointmentStack = new AppointmentStack(renderComponents);

function getSelectedAppointmentList() {
  // Get the list of appointments to be rendered according to the option selected
  const allAppointmentsOption = document.getElementById('option1');
  if (allAppointmentsOption.checked) {
    return appointmentStack.stack
  }

  const lastCreatedAppointmentOption = document.getElementById('option2');
  if (lastCreatedAppointmentOption.checked) {
    return [appointmentStack.getLastCreatedAppointment()];
  }

  const upcommingCreatedAppointmentOption = document.getElementById('option3');
  if (upcommingCreatedAppointmentOption.checked) {
    return [appointmentStack.getUpcommingAppointment()];
  }
}

function renderAppointmentList() {
  const container = document.getElementById('appointment-list');

  const stack = getSelectedAppointmentList();
  console.log(stack);

  if (container) {
    container.innerHTML = '';

    stack.forEach((appointment, index) => {
      const appointmentItem = createAppointmentListItemHTML(appointment, index, appointmentStack.removeAt);
      container.appendChild(appointmentItem);
    });
  };
}

function renderComponents() {
  renderAppointmentList();
  renderAppointmentTable(appointmentStack.getSortedStack());
}

document.addEventListener('DOMContentLoaded', renderComponents());
document.querySelectorAll('input[name="options"]').forEach((radio) => {
  radio.addEventListener('change', renderAppointmentList);
});
