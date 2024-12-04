# Instalar dependencias
```sh
nvm use 18.20
pnpm install
```

# Levantar servidor
Ejecutar
```sh
pnpm run dev
```

Abrir el navegador en el puerto 5173
[http://localhost:5173/index.html](http://localhost:5173/index.html)

# Como probar código de javascript
1. Programación Funcional en JavaScript
En la vista de `Agenda` se puede ver la implementación de una tabla que resume métricas sobre costo por paciente y horas totals de atención. Ver el código en `src/js/components/appointments/utils` y su uso en `src/js/components/appointments/html-builder` para construir la tabla.

2. Programación orientada a eventos y asincronía.
    - El uso de api se puede encontrar en `src/js/api/doctors.js`. Todos los doctores en el código son cargados usando esa función para crear una promesa simulando una API.
    - Los eventos se pueden encontrar en varias partes del código y las promesas son envueltas en un try/catch para manejar errores de consulta.

3. Programación orientada a objetos
Los modelos de doctores se encuentran en `src/js/doctors/models.js`, los cuales son usados en `src/js/components/doctors/html-builder` para mostrar la información del doctor en la vista de Equipo Médico.

## Preguntas
En este proyecto, se aplicaron conceptos clave de programación funcional para mejorar la legibilidad y modularidad del código. A continuación, se explican los principales conceptos utilizados:

1. Currying:
Se implementó una función curried calculateTotalCost, que permite calcular el costo total de las consultas en función del precio por consulta y la cantidad de consultas realizadas. Este enfoque facilita la reutilización y personalización de la lógica, permitiendo crear funciones más específicas, como totalCostForGeneralPractitioner = calculateTotalCost(50).

2. Funciones Puras:
La mayoría de las funciones creadas no tienen efectos secundarios. Por ejemplo, getSortedStack devuelve una copia ordenada de las citas sin modificar el arreglo original, promoviendo un código más predecible y fácil de probar.

3. Composición de Funciones:
Se combinó la lógica para calcular el costo total y aplicar descuentos en función de la cantidad de consultas mediante composición. Esto asegura que las transformaciones de datos sean modulares y fáciles de mantener.

### Descripción de los eventos y el uso de asincronía
El sistema utiliza una estructura basada en eventos para notificar automáticamente los cambios en la pila de citas y actualizar la interfaz del usuario. Por ejemplo:

1. Callback en la Clase AppointmentStack:
El constructor de la clase recibe un callback que se ejecuta automáticamente cada vez que se agrega o elimina una cita. Esto permite actualizar la interfaz en tiempo real sin requerir recargas manuales.

2. Almacenamiento Local y Recuperación Asíncrona:
Aunque en este proyecto se utiliza almacenamiento local sin asincronía explícita, la estructura puede adaptarse fácilmente para integrarse con APIs externas o bases de datos utilizando promesas (Promise) o async/await.

### Explicación de la implementación de clases y el uso de herencia, encapsulación, y polimorfismo
1. Encapsulación:
La clase AppointmentStack utiliza propiedades privadas como this.stack y this.storageKey, que solo pueden ser manipuladas mediante métodos públicos como push, removeAt y getSortedStack. Esto asegura que los datos internos estén protegidos y se mantenga la consistencia del sistema.

2. Herencia:
Aunque este proyecto no incluye clases derivadas directamente, la estructura modular permite que AppointmentStack sea extendida fácilmente para casos específicos. Por ejemplo, podríamos crear una clase RecurringAppointmentStack que añada lógica para citas recurrentes.

```javascript
class RecurringAppointmentStack extends AppointmentStack {
    addRecurringAppointment(appointment, interval) {
        // Lógica para añadir citas recurrentes
    }
}
```
3. Polimorfismo:
Los métodos pueden sobrescribirse en las clases hijas para implementar comportamientos específicos. Por ejemplo, una clase que herede de AppointmentStack podría redefinir el método saveToStorage para integrarlo con una base de datos remota.

4. Aplicación Práctica:
La clase central permite organizar las citas y gestionar eventos de forma eficiente. Su diseño modular facilita que el sistema evolucione para incluir nuevas características sin afectar el comportamiento actual.
