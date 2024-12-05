import '../scss/styles.scss'
import { AppointmentStack, createDoctorListItemHTML, capitalizeAllAttributes, createUpcommingAppointmentItemHTML } from './components/appointments';
import { fetchDoctorData } from './api/doctors';

const message = () => {
  // Create a toast container if it doesn't already exist
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }

  // Create the toast element
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-success border-0';
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        Tu cita fue agendada correctamente.
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  // Append the toast to the container
  toastContainer.appendChild(toast);

  // Initialize and show the toast using Bootstrap's JavaScript
  const bootstrapToast = new bootstrap.Toast(toast);
  bootstrapToast.show();

  // Remove the toast after it's hidden
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
}

const appointmentStack = new AppointmentStack(message);

async function renderDoctorList() {
  try {
    const especialistasPromise = fetchDoctorData('../../public/static/json/especialistas.json');
    const generalesPromise = fetchDoctorData('../../public/static/json/generales.json');

    const [especialistas, generales] = await Promise.all([especialistasPromise, generalesPromise]);


    // Merge jsons
    const doctors = [...especialistas, ...generales]

    // Doctor list
    const container = document.getElementById("doctorDropdownMenu");

    doctors.forEach((doctor) => {
      let customDoctor = { ...doctor };
      customDoctor = capitalizeAllAttributes(customDoctor);

      const { name, specialty } = customDoctor;

      const doctorListItem = createDoctorListItemHTML(name, specialty);
      container.appendChild(doctorListItem);
    })
  } catch (error) {
    console.log("Error while obtaining the list of doctors:", error.message)
  }
}

async function contactFormSend(event) {

  event.preventDefault();
  // Get appointment details
  const inputNombre = document.getElementById("nombre");
  const paciente = inputNombre.value;

  const inputFechaHora = document.getElementById("fechaHora");
  const fechaHora = inputFechaHora.value;

  const doctorDropdown = document.getElementById("doctorDropdownMenu");
  const selectedDoctor = doctorDropdown.options[doctorDropdown.selectedIndex].value;

  // Extract name and specialty from the selected value
  const [name, specialty] = selectedDoctor.split(" - ");

  // Confirmation message
  const isConfirmed = window.confirm(`Tu cita con el doctor ${name} (${specialty}) fue agendada para ${fechaHora}. ¿Es correcto?`);

  if (isConfirmed) {
    console.log("Cita confirmada:", { name, specialty, paciente, fechaHora });
    appointmentStack.push({ name, specialty, paciente, fechaHora });
    renderUpcommingAppointmentList();
  } else {
    console.log("Cita no confirmada. Usuario canceló.");
    return
  }
}

async function renderUpcommingAppointmentList() {
  const container = document.getElementById("upcomming-appointment-list")
  container.innerHTML = '';

  const appointmentList = appointmentStack.getSortedStack();

  appointmentList.forEach((appointment) => {
    const appointmentItem = createUpcommingAppointmentItemHTML(appointment);
    container.appendChild(appointmentItem);
  });
}

document.addEventListener('DOMContentLoaded', renderDoctorList);
document.addEventListener('DOMContentLoaded', renderUpcommingAppointmentList);
const sendButton = document.getElementById('contactFormSendButton');
sendButton.addEventListener('click', contactFormSend);
