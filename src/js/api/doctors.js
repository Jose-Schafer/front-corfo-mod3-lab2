export function fetchDoctorData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(new Error(`Error al obtener datos de ${url}: ${response.statusText}`));
          }
        })
        .catch((error) => reject(error));
    }, 1000); // Simulación de latencia de red
  });
}
