export class CarGame {
    constructor() {
        this.colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        this.carQueue = [];
        this.carCount = 0;
        this.timerInterval = null;
        this.carSpeed = 3000;
        this.paintedCars = 0;

        this.carText = document.querySelector('.car-color-text');
        this.carContainer = document.querySelector('.car-container');
        this.colorPalette = document.querySelector('.color-palette');
        this.colorButtons = document.querySelectorAll('.color-button');
        this.startButton = document.getElementById('startButton');

        this.carrosAtendidos = document.querySelector('.carros-atendidos');
        this.resultados = document.querySelector('.resultados');
        this.resultadosText = document.getElementById('resultadosText');
        
        this.record = {
            paintedCars: 0,
            startTime: null,
            endTime: null,
            totalTime: 0 
        };

        this.juegoTerminado = false;
        this.blankCarsContainer = 0;
        this.startGame();
    }

    startGame() {
        clearInterval(this.timerInterval);
        this.record.startTime = new Date().getTime();
        this.createColorPalette();
        this.createCar();

        this.blankCarsInQueue = 0;
        this.createdCarCount = 0;

        this.timerInterval = setInterval(() => {
            this.increaseCarSpeed();
            this.createCar();
        }, this.carSpeed);
    }

    resetGame(){
        clearInterval(this.timerInterval);
        this.carQueue = [];
        this.carCount = 0;
        this.carSpeed = 3000;
        this.paintedCars = 0;
        this.carrosAtendidos.innerHTML = '';
        this.carContainer.innerHTML = '';
        this.resultados.textContent = '';
        this.colorPalette.innerHTML = '';
        this.record.paintedCars = 0;
        this.record.startTime = null;
        this.record.endTime = null;
        this.record.totalTime = 0; 
        
        this.blankCarsContainer = 0;

        this.createColorPalette();
    }

    resetButtons(){
        this.juegoTerminado = false;

        this.colorButtons.forEach((button) => {
            button.classList.remove('disabled');
        });
    }

    createColorPalette() {
        this.colorPalette.innerHTML = '';

        this.colors.forEach((color) => {
            const colorButton = document.createElement('div');
            colorButton.className = 'color-button';
            colorButton.style.backgroundColor = color;
            if(!this.juegoTerminado){
                colorButton.addEventListener('click', () => this.paintCar(color));
            }else{
                colorButton.classList.add('disabled');
            }
            this.colorPalette.appendChild(colorButton);
        });
    }

    createCar() {
        const carContainer = document.createElement('div');
        carContainer.className = 'unitCar-container';

        const car = document.createElement('img');
        car.className = 'car';
        car.classList.add('unpainted');
        const carColor = this.getRandomColor();
        car.src="carros/carro-white.png";
        car.dataset.color = carColor; 

        const carColorText = document.createElement('p');
        carColorText.className = 'car-color-text';
        carColorText.textContent = carColor;

        carContainer.appendChild(car);
        carContainer.appendChild(carColorText);

        this.carQueue.push(carContainer);
        this.carContainer.appendChild(carContainer);
        this.carCount++;

        if(this.carCount === 3){
            this.increaseCarSpeed();
        }

        if(car.classList.contains('unpainted')){
            this.blankCarsContainer++;
            console.log(`Carros en blanco en el contenedor: ${this.blankCarsContainer}`);
        }

        if(this.blankCarsContainer === 5){
            this.endGame();
        }
    }

    paintCar(color) {
        
        if(!this.juegoTerminado){
            const unpaintedCar = this.carContainer.querySelector('.unpainted');

            if (unpaintedCar) {
                const carColor = unpaintedCar.dataset.color; 

                if (carColor === color) {
                    unpaintedCar.classList.remove('unpainted');
                    unpaintedCar.src=`carros/carro-${color}.png`;

                    const carrosAtendidos = document.querySelector('.carros-atendidos');
                    carrosAtendidos.appendChild(unpaintedCar); 
                    
                    const carText = document.querySelector('.car-color-text');
                    carText.remove();

                    this.carQueue.shift();

                    this.record.paintedCars++;

                    this.blankCarsContainer--;
                }
            }
        }
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    increaseCarSpeed() {
        this.carSpeed -= 2000; 
    }

    mostrarRecord(){
        if (this.record.startTime && this.record.endTime) {
            this.record.totalTime = (this.record.endTime - this.record.startTime) / 1000;
            this.resultados.textContent = `Record: Carros pintados - ${this.record.paintedCars}, 
            Tiempo total - ${(this.record.totalTime).toFixed(2)} segundos`;
        }
    }

    endGame() {
        if (!this.juegoTerminado) {
            this.juegoTerminado = true;
            clearInterval(this.timerInterval);
            this.record.endTime = new Date().getTime();
            this.mostrarRecord();

            this.colorButtons.forEach((button) => {
                button.classList.add('disabled');
            });
        }
    }
}