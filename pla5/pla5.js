/** ---------------------------------------------------------------------------
 * Desenvolupament Web Frontend
 * PLA 5: Fonaments de JavaScript
 * Mòdul: 2
 * Dedicació: 5 dies (25 hores)
 * Data d'entrega: 24 de juliol de 2025
 * ------------------------------------------------------------------------- */

/* Task 1 ------------------------------------------------------------------ */

const question = "What is the answer to life, universe and everything?";
let answer = 0;
answer = 42;

// Write all your variables below this line:
let cifo = "CIFO";
let pi = 3.1416;
let distance = 0;
distance = answer * 1000 + 195;
let yeap = true;
let nope = false;
let condition = cifo === question;
condition = distance >= 42000;
let pi_sign = "π";
let pi_text =
  "The number " +
  pi_sign +
  " is a mathematical constant, approximately equal to " +
  pi +
  ", defined in...";
let cifo_text = `El Bruc is approximately ${distance} meters away from the ${cifo} location.`;
/* Task 2 ------------------------------------------------------------------ */

const lang = "ca";
const age = 38;

// Write your first `if` block below this line:
if (age >= 30) {
  console.log("You are a boomer!");
}
// Write your second `if` block below this line:
if (age <= 20) {
  console.log("Too young to be a boomer");
} else if (age < 36) {
  console.log("Quite close to be a boomer");
} else {
  console.log("A boomer for sure");
}
// Write your `switch` block below this line:
switch (lang) {
  case "es":
    console.log("Spanish");
    break;
  case "ca":
    console.log("Catalan");
    break;
  case "fr":
    console.log("French");
    break;
  default:
    console.log("Unknown");
}

// Replace `null` in the line below with your your one-liner using a ternary operator:
console.log(lang === "ca" ? "Catalan" : "Some other language");

/* Task 3 ------------------------------------------------------------------ */

let num = 9;
let sum = 0;
let product = 1;

// Write your `for` loop below this line:
for (let i = 1; i <= num; i++) {
  sum += i;
}

console.log(sum);
// Write your `while` loop below this line:
let j = 1;
while (j <= num) {
  product *= j;
  j++;
}
console.log(product);
// Write your `do...while` loop below this line:
let k = num;
do {
  console.log(k);
  k--;
} while (k >= 3);

/* Task 4 ------------------------------------------------------------------ */

function func1(n) {
  // Cal passar el paràmetre 'n' a la funció perquè pugui operar amb ell
  return n + 10;
}

function func2(n) {
  // La funció feia el càlcul però no retornava res.
  return n * n;
}

function func3(name, city) {
  // La funció ha de rebre dos paràmetres i construir la frase esperada
  return "Hello " + name + " from " + city;
}

function func4(n) {
  // El resultat esperat és la cadena, no el número inicial. Ha de retornar 'm', no 'n'
  n = n * 42;
  let m = n / 10;
  m = m + " is a pretty big number";
  return m;
}

function func5(city1, city2) {
  //  La funció utilitza variables que no estaven definides. Cal afegir-les com a paràmetres
  return "First we take " + city1 + " then we take " + city2;
}

function func6(n) {
  // El nom de la funció estava mal escrit (fumc6).
  n = "Double of " + n + " is " + n * 2;
  return n;
}

// Do not modify anything in the console.log lines below!
// But uncomment them to check your results.

// expected 23, got error :(
// console.log(func1(13));

// expected 25, got undefined :(
// console.log(func2(5));

// expected 'Hello Mike from London', got undefined :(
// console.log(func3('Mike', 'London'));

// expected '63 is a pretty big number', got number 630 :(
// console.log(func4(15));

// expected 'First we take Manhattan then we take Berlin', got error :(
// console.log(func5('Manhattan', 'Berlin'));

// expected 'Double of 7 is 14', got error :(
// console.log(func6(7));

/* Task 5 ------------------------------------------------------------------ */

const numbers = [1, 2, 3, 4, 5];
const days = new Array(
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
);
const mixed = [
  Date.now(),
  "New York",
  6.62607004,
  [["Paris", "Rome"]],
  { a: 97, e: 101, i: 105 },
  numbers,
];
const years = [1978, 2021, 1657, 2301, 1867, 2008];

// Replace the `null`s in the code below with your one-liners:
console.log(days.length);
console.log(mixed[2]);
console.log(numbers[numbers.length - 1]);
console.log(mixed[4]["e"]);
console.log(mixed[3][0][1]);

// Replace the `null`s in the code below (do not add any new line):
const tuesdayToFriday = days.slice(1, 5);
console.log(tuesdayToFriday);
const sortedDays = [...days].sort();
console.log(sortedDays);
const number = parseInt(numbers.join(""));
console.log(number);
const maxYear = Math.max(...years);
console.log(maxYear);

// Today is Friday
// Today is Monday
// Today is Saturday
// Today is Sunday
// Today is Thursday
// Today is Tuesday
// Today is Wednesday
// Write your `for` loop below this line:
for (const day of sortedDays) {
  console.log(`Today is ${day}`);
}

/* Task 6 ------------------------------------------------------------------ */

const laptop = {
  brand: "Apple",
  model: "MacBook Pro",
  os: "macOS Sonoma",
  year: 2022,
  memory: "16 GB",
  processor: "3 GHz Dual-Core Intel Core i7",
  apps: ["Visual Studio Code", "Xcode", "Dropbox", "Magnet"],
  owner: {
    name: "Albert",
    phone: "678901234",
  },
};

// Replace the `null`s in the code below with your one-liners:
console.log(laptop.os);
console.log(laptop.year + 10);
console.log(laptop.apps[laptop.apps.length - 1]);
console.log(laptop.owner.phone);

// Write your code to change some properties below this line:
laptop.memory = "32 GB";
laptop.apps.push("Spotify");
laptop.apps.push("Docker");
laptop.apps.shift();
laptop.owner.name = "Teix";

// brand property has value Apple
// model property has value MacBook Pro
// os property has value macOS Sonoma
// year property has value 2022
// memory property has value 32 GB
// processor property has value 3 GHz Dual-Core Intel Core i7
// apps property is an array with 5 elements
// owner property is an object with 2 fields
// Write your `for` loop below this line:
for (let data in laptop) {
  if (Array.isArray(laptop[data])) {
    console.log(
      `${data} property is an array with ${laptop[data].length} elements`
    );
  } else if (typeof laptop[data] === "object" && laptop[data] !== null) {
    console.log(
      `${data} property is an object with ${
        Object.keys(laptop[data]).length
      } fields`
    );
  } else {
    console.log(`${data} property has value ${laptop[data]}`);
  }
}

/* Task 7 ------------------------------------------------------------------ */

/* 
1. Quina funció o operador podem fer servir per veure si una variable conté un número?
   - La funció `typeof` ens permet saber si una variable és un número.
*/
console.log(typeof 42 === "number");

/*
2. Quina funció –i amb quina sintaxi concreta– podem fer servir per canviar totes les vegades que una
   seqüència de caràcters apareix en una cadena de text? Per exemple per passar d'abracadabra a ibricidibri.
   - Podem usar `replace`.
*/
console.log("abracadabra".replace(/a/g, "i"));

/*
3. Quina funció fem servir per obtenir el component mes (month, un número) d'una data?
   Hi ha alguna cosa rellevant a tenir en compte amb el valor que obtenim?
   - Fem servir `getMonth()`, però cal tenir en compte que els mesos comencen per 0 (gener és 0).
*/
console.log(new Date().getMonth());

/*
4. Quina funció podem fer servir per convertir una cadena de text a minúscules?
   - `toLowerCase()`
*/
console.log("TEXT EN MAJÚSCULES".toLowerCase());

/*
5. Quina funció podem fer servir per obtenir la representació ISO d'una data?
   - `toISOString()`
*/
console.log(new Date().toISOString());

/*
6. Quina funció podem fer servir per convertir un array de números en un altre array també de números però
   on cada número sigui el quadrat del número original?
   - `map()`
*/
console.log([1, 2, 3, 4].map((x) => x * x));

/*
7. Quina funció podem fer servir per filtrar tots els elements d'un array, de tal manera que obtinguem un altre
   array només amb els elements que compleixin una determinada condició?
   - `filter()`
*/
console.log(
  [null, "Lucas", undefined, 42, {}, 13, new Date(), [], 0].filter(
    (e) => typeof e === "number"
  )
);
