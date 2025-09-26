// Laptop class
export default class Laptop {
	constructor(marca, model, ram, cpu, preu) {
		this.marca = marca;
		this.model = model;
		this.ram = ram;
		this.cpu = cpu;
		this.preu = preu;
	}

	changeRam(novaRam) {
		this.ram = novaRam;
		console.log(`La RAM ha estat canviada a ${novaRam}GB`);
	}

	calculateIVA(preu, percentatge = 21) {
		const iva = preu * (percentatge / 100);
		console.log(`IVA (${percentatge}%): ${iva}€. Total: ${preu + iva}€`);
	}
}

// Other functions
export function esParell(numero) {
	return numero % 2 === 0;
}

export function calculateDiscount(preu, percentatge) {
	const descompte = preu * (percentatge / 100);
	console.log(`Preu original: ${preu}€. Preu final: ${preu - descompte}€`);
	return preu - descompte;
}

export function actualDate() {
	const ara = new Date();
	return ara.toLocaleString();
}
