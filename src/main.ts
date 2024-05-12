import { projectsRouting } from "./scripts/projects-routing";

projectsRouting();

//SURVEY SIMULATOR
import { fromEvent, map, merge, scan, tap } from "rxjs";

// OBTENCIÓN DE LOS ELEMENTOS
const brasilOption = document.querySelector("#option-brasil")!;
const argentinaOption = document.querySelector("#option-argentina")!;
const uruguayOption = document.querySelector("#option-uruguay")!;
const otrosOption = document.querySelector("#option-otros")!;

const brasilVotos = document.querySelector("#brasil-votos")!;
const argentinaVotos = document.querySelector("#argentina-votos")!;
const uruguayVotos = document.querySelector("#uruguay-votos")!;
const otrosVotos = document.querySelector("#otros-votos")!;

const totalVotos = document.querySelector("#total-votos")!;

const optionClicks = (element: Element) => {
  return fromEvent(element, "click").pipe(
    map(() => 1),
    scan((total, incremento) => total + incremento, 0)
  );
};

const brasilClicks$ = optionClicks(brasilOption);
const argentinaClicks$ = optionClicks(argentinaOption);
const uruguayClicks$ = optionClicks(uruguayOption);
const otrosClicks$ = optionClicks(otrosOption);

const updateData = () => {
  // Obtener los votos actuales de cada opción de la encuesta
};
// Actualizar los datos de la encuesta con los clics recientes
// interval
const getData = () => {
  const delay = Math.random() * 1000;
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve({});
    }, delay);
  });
};

//FIX- simular fetch para obtener la cantidad de votos y crear una función para setear los resultados

brasilClicks$.subscribe({
  next: (value) => (brasilVotos.textContent = value.toString()),
});

argentinaClicks$.subscribe({
  next: (value) => (argentinaVotos.textContent = value.toString()),
});

uruguayClicks$.subscribe({
  next: (value) => (uruguayVotos.textContent = value.toString()),
});

otrosClicks$.subscribe({
  next: (value) => (otrosVotos.textContent = value.toString()),
});

const merged$ = merge(
  brasilClicks$,
  argentinaClicks$,
  uruguayClicks$,
  otrosClicks$
).pipe(tap((ele) => console.log(ele)));

// Escanear para obtener el total de votos acumulados
merged$.subscribe({
  next: (value) => (totalVotos.textContent = value.toString()),
  error: (error) => console.log(error.message),
});
