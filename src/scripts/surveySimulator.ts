import { map } from "rxjs/operators";
import { interval, merge, fromEvent } from "rxjs";
import { Subscription } from "rxjs";

const brasilOption = document.querySelector("#option-brasil")!;
const argentinaOption = document.querySelector("#option-argentina")!;
const uruguayOption = document.querySelector("#option-uruguay")!;
const otrosOption = document.querySelector("#option-otros")!;

const brasilVotos = document.querySelector("#brasil-votos")!;
const argentinaVotos = document.querySelector("#argentina-votos")!;
const uruguayVotos = document.querySelector("#uruguay-votos")!;
const otrosVotos = document.querySelector("#otros-votos")!;

const buttonFetchStart = document.querySelector("#button-fetch-start")!;
const buttonFetchStop = document.querySelector("#button-fetch-stop")!;
const buttonReset = document.querySelector("#button-fetch-reset")!;

interface Country {
  name: string;
  votos: number;
}

let brasil: Country = { name: "brasil", votos: 0 };
let argentina: Country = { name: "argentina", votos: 0 };
let uruguay: Country = { name: "uruguay", votos: 0 };
let otros: Country = { name: "otros", votos: 0 };

let active = false;

fromEvent(brasilOption, "click").subscribe(() => {
  brasil.votos += 1;
  brasilVotos.textContent = brasil.votos + "";
});

fromEvent(argentinaOption, "click").subscribe(() => {
  argentina.votos += 1;
  argentinaVotos.textContent = argentina.votos + "";
});

fromEvent(uruguayOption, "click").subscribe(() => {
  uruguay.votos += 1;
  uruguayVotos.textContent = uruguay.votos + "";
});

fromEvent(otrosOption, "click").subscribe(() => {
  otros.votos += 1;
  otrosVotos.textContent = otros.votos + "";
});
let subscribe: Subscription | null = null;

fromEvent(buttonFetchStart, "click").subscribe(() => {
  active = true;
  const brasil$ = interval(2500);
  const argentina$ = interval(2000);
  const uruguay$ = interval(1500);
  const otros$ = interval(1000);

  const example$ = merge(
    brasil$.pipe(map(() => "brasil")),
    argentina$.pipe(map(() => "argentina")),
    uruguay$.pipe(map(() => "uruguay")),
    otros$.pipe(map(() => "otros"))
  );
  subscribe = example$.subscribe((val) => {
    if (val === "brasil") {
      brasil.votos += 1;
      brasilVotos.textContent = brasil.votos + "";
    } else if (val === "argentina") {
      argentina.votos += 1;
      argentinaVotos.textContent = argentina.votos + "";
    } else if (val === "uruguay") {
      uruguay.votos += 1;
      uruguayVotos.textContent = uruguay.votos + "";
    } else {
      otros.votos += 1;
      otrosVotos.textContent = otros.votos + "";
    }
  });
});

fromEvent(buttonFetchStop, "click").subscribe(() => {
  active = false;
  subscribe?.unsubscribe();
});

fromEvent(buttonReset, "click").subscribe(() => {
  brasil.votos = 0;
  argentina.votos = 0;
  uruguay.votos = 0;
  otros.votos = 0;
  brasilVotos.textContent = "0";
  argentinaVotos.textContent = "0";
  uruguayVotos.textContent = "0";
  otrosVotos.textContent = "0";
});
