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
    const container = document.getElementById("doctor-list");

    doctors.forEach((doctor) => {
      let customDoctor = { ...doctor };
      customDoctor = capitalizeAllAttributes(customDoctor);

      const { name, specialty } = customDoctor;

      const doctorCard = createDoctorListItemHTML(name, specialty, appointmentStack);
      container.appendChild(doctorCard);
    })
  } catch (error) {
    console.log("Error while obtaining the list of doctors:", error.message)
  }
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
