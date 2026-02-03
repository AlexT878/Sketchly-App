import { Square } from '../figures/Square.js';
import { Triangle } from '../figures/Triangle.js';

export class SketchlyApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private colorPicker: HTMLInputElement;
    private clearBtn: HTMLButtonElement;
    private squareBtn: HTMLButtonElement;
    private triangleBtn: HTMLButtonElement;
    private figureSelector: number; // 0 for square 1 for triangle

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.colorPicker = document.getElementById('color-picker') as HTMLInputElement;
        this.clearBtn = document.getElementById('btn-clear') as HTMLButtonElement;
        this.squareBtn = document.getElementById('btn-square') as HTMLButtonElement;
        this.triangleBtn = document.getElementById('btn-triangle') as HTMLButtonElement;
        this.figureSelector = 0; // Square is default

        this.init();
    }

    private init(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.clearBtn.addEventListener('click', () => this.clearCanvas());
        this.squareBtn.addEventListener('click', () => this.setTool(0));
        this.triangleBtn.addEventListener('click', () => this.setTool(1));

        this.updateButtonUI();
    }

    private setTool(type: number) {
        this.figureSelector = type;
        this.updateButtonUI();
    }

    private updateButtonUI() {
        this.squareBtn.classList.remove("active");
        this.triangleBtn.classList.remove("active");

        if (this.figureSelector === 0) {
            this.squareBtn.classList.add('active');
        } else if (this.figureSelector === 1) {
            this.triangleBtn.classList.add('active');
        }
    }

    private onMouseDown(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const selectedColor = this.colorPicker.value;

        if(this.figureSelector == 0) {
            const square = new Square(x, y, selectedColor, 50);
            square.draw(this.ctx);
        } else if (this.figureSelector == 1) {
            const triangle = new Triangle(x, y, selectedColor, 50);
            triangle.draw(this.ctx);
        }
    }

    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}