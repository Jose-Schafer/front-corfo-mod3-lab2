import '../scss/styles.scss'
import { AppointmentStack, createDoctorListItemHTML, capitalizeAllAttributes, createUpcommingAppointmentItemHTML } from './components/appointments';
import { fetchDoctorData } from './api/doctors';

const message = () => {
  alert("Tu cita fue agendada correctamente")
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

  // Get appointment details
  const inputNombre = document.getElementById("nombre");
  const paciente = inputNombre.value;

  const inputFechaHora = document.getElementById("fechaHora");
  const fechaHora = inputFechaHora.value;

  const doctorDropdown = document.getElementById("doctorDropdownMenu");
  const selectedDoctor = doctorDropdown.options[doctorDropdown.selectedIndex].value;

  // Extract name and specialty from the selected value
  const [name, specialty] = selectedDoctor.split(" - ");
  appointmentStack.push({ name, specialty, paciente, fechaHora })
}

async function renderUpcommingAppointmentList() {
  const container = document.getElementById("upcomming-appointment-list")

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
