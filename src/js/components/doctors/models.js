class Doctor {
  constructor(name, specialty, yearsOfExperience) {
    this.name = name;
    this.specialty = specialty;
    let _yearsOfExperience = yearsOfExperience; // Encapsulation of years of experience

    // Getter to retrieve years of experience
    this.getYearsOfExperience = () => _yearsOfExperience;

    // Setter to set years of experience
    this.setYearsOfExperience = (years) => {
      if (years < 0) {
        console.error("Years of experience cannot be negative.");
        return;
      }
      _yearsOfExperience = years;
    };
  }

  // Method to display the doctor's information
  showInformation() {
    return `Especialidad: ${this.specialty}, Experiencia: ${this.getYearsOfExperience()}`;
  }

  // Method to calculate the total number of patients attended (assume 100 patients per year)
  getDoctorMetrics() {
    return `Pacientes atendidos: ${this.getYearsOfExperience() * 100}`;
  }
}

// Subclass Surgeon
export class Surgeon extends Doctor {
  constructor(name, specialty, yearsOfExperience) {
    super(name, specialty, yearsOfExperience);
  }

  // Overriding the calculatePatients method to calculate the number of surgeries performed
  getDoctorMetrics() {
    return `Cirugias realizadas: ${this.getYearsOfExperience() * 50}`;
  }
}

// Subclass GeneralDoctor
export class GeneralDoctor extends Doctor {
  constructor(name, specialty, yearsOfExperience) {
    super(name, specialty, yearsOfExperience); // General doctors have a fixed specialty
  }
}
