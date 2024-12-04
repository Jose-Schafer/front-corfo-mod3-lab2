import { GeneralDoctor, Surgeon } from './models';

export function createDoctorHTML(image, name, specialty, titulo, magister, experience) {

  let doctor;
  if (specialty === "Cirujano") {
    doctor = new Surgeon(name, specialty, experience);
  } else {
    doctor = new GeneralDoctor(name, specialty, experience);
  }

  const card = document.createElement('div');
  card.className = 'card col-8 col-lg-3 m-lg-2 mx-auto';

  const img = document.createElement('img');
  img.className = "card-img-top";
  img.src = `../../${image}`;

  const textDiv = document.createElement('div');
  textDiv.className = 'card-body';

  const h5 = document.createElement("h5");
  h5.className = 'card-title';
  h5.textContent = doctor.name;
  textDiv.appendChild(h5);

  const p = document.createElement('p');
  p.className = 'card-description';
  p.textContent = `${doctor.showInformation()}`;
  textDiv.appendChild(p);

  const p2 = document.createElement('p');
  p2.className = 'card-description';
  p2.textContent = `Título: ${titulo}`;
  textDiv.appendChild(p2);

  const p3 = document.createElement('p');
  p3.className = 'card-description';
  p3.textContent = `Magister: ${magister}`;
  textDiv.appendChild(p3);

  const p4 = document.createElement('p');
  p4.className = 'card-description';
  p4.textContent = doctor.getDoctorMetrics();
  textDiv.appendChild(p4);

  card.appendChild(img);
  card.appendChild(textDiv);

  return card
}
