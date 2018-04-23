class Stopwatch {
	constructor(display) {
		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
		this.display.innerText = this.format(this.times);
	}

	print() {
		this.display.innerText = this.format(this.times);
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}

	start() {
		if(!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	stop() {
    	this.running = false;
    	clearInterval(this.watch);
	}

	save() {
		let tableTime = document.getElementById('stopwatch').innerHTML;
		console.log(tableTime);
		const row = document.createElement('li');
		const timeResult = document.createTextNode(tableTime);
		row.appendChild(timeResult);
		document.getElementById('results').appendChild(row);
	}

	deleteList() {
		const list = document.getElementById('results');
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
	}

}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

const stopwatch = new Stopwatch(
	document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());

let deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', () => stopwatch.deleteList());