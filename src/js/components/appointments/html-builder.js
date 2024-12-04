export function createDoctorListItemHTML(name, specialty) {
  const doctorOption = document.createElement('option');
  doctorOption.innerHTML = `
    ${name} - ${specialty}
  `;
  doctorOption.value = `${name} - ${specialty}`;
  return doctorOption
}

export function createAppointmentListItemHTML(appointment, index, removeItem) {

  const { name, specialty, paciente, fechaHora } = { ...appointment };

  // Create a new list item for the appointment
  const appointmentItem = document.createElement('div');

  appointmentItem.innerHTML = `
    <div class="card mt-4" style="position: relative;">
      <button 
        class="btn-close" 
        aria-label="Close" 
        style="position: absolute; top: 5px; right: 10px; z-index: 1;">
      </button>
      <div class="card-body row">
        <h5 class="card-title">Cita Confirmada</h5>
        <div class="col">
          <p><strong>Nombre del Doctor:</strong> ${name}</p>
          <p><strong>Especialidad:</strong> ${specialty}</p>
        </div>
        <div class="col">
          <p><strong>Paciente:</strong> ${paciente}</p>
          <p><strong>Fecha y Hora:</strong> ${fechaHora}</p>
        </div>
      </div>
    </div>
  `;

  // Add an event listener to the button
  const button = appointmentItem.querySelector('button');
  button.addEventListener('click', (event) => {
    event.preventDefault();

    removeItem(index)
  });

  return appointmentItem;
}

export function createUpcommingAppointmentItemHTML(appointment) {
  const { paciente, fechaHora } = { ...appointment };

  // Create a new list item for the appointment
  const appointmentItem = document.createElement('div');
  appointmentItem.className = 'card mt-4';


  appointmentItem.innerHTML = `
    <div class="card-body row">
      <p class="col"><strong>Paciente:</strong> ${paciente}</p>
      <p class="col"><strong>Fecha y Hora:</strong> ${fechaHora}</p>
    </div>
  `;

  return appointmentItem;
}
