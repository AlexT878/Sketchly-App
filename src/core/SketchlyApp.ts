import { Square } from '../figures/Square.js';
import { Triangle } from '../figures/Triangle.js';
import { Circle } from '../figures/Circle.js';
import { FigureFactory } from './FigureFactory.js';

enum FigureType {
    SQUARE = 'square',
    TRIANGLE = 'triangle',
    CIRCLE = 'circle'
}

export class SketchlyApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private colorPicker: HTMLInputElement;
    private clearBtn: HTMLButtonElement;
    private squareBtn: HTMLButtonElement;
    private triangleBtn: HTMLButtonElement;
    private circleBtn: HTMLButtonElement;
    private figureSelector: FigureType; 

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.colorPicker = document.getElementById('color-picker') as HTMLInputElement;
        this.clearBtn = document.getElementById('btn-clear') as HTMLButtonElement;
        this.squareBtn = document.getElementById('btn-square') as HTMLButtonElement;
        this.triangleBtn = document.getElementById('btn-triangle') as HTMLButtonElement;
        this.circleBtn = document.getElementById('btn-circle') as HTMLButtonElement;
        this.figureSelector = FigureType.SQUARE; // Square is default

        this.init();
    }

    private init(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.clearBtn.addEventListener('click', () => this.clearCanvas());
        this.squareBtn.addEventListener('click', () => this.setTool(FigureType.SQUARE));
        this.triangleBtn.addEventListener('click', () => this.setTool(FigureType.TRIANGLE));
        this.circleBtn.addEventListener('click', () => this.setTool(FigureType.CIRCLE));

        this.updateButtonUI();
    }

    private setTool(type: FigureType) {
        this.figureSelector = type;
        this.updateButtonUI();
    }

    private updateButtonUI() {
        this.squareBtn.classList.remove("active");
        this.triangleBtn.classList.remove("active");
        this.circleBtn.classList.remove("active");

        switch(this.figureSelector) {
            case FigureType.SQUARE: this.squareBtn.classList.add('active'); break;
            case FigureType.TRIANGLE: this.triangleBtn.classList.add('active'); break;
            case FigureType.CIRCLE: this.circleBtn.classList.add('active'); break;
            default: throw new Error("Figure not found!");
        }
    }

    private onMouseDown(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const selectedColor = this.colorPicker.value;

        const figure = FigureFactory.create(this.figureSelector, x, y, selectedColor);
        figure.draw(this.ctx);
    }

    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}