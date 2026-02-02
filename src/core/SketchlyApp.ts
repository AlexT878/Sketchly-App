import { Square } from '../figures/Square.js';

export class SketchlyApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private colorPicker: HTMLInputElement;
    private clearBtn: HTMLButtonElement;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.colorPicker = document.getElementById('color-picker') as HTMLInputElement;
        this.clearBtn = document.getElementById('btn-clear') as HTMLButtonElement;

        this.init();
    }

    private init(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.clearBtn.addEventListener('click', () => this.clearCanvas());
    }

    private onMouseDown(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const selectedColor = this.colorPicker.value;

        const square = new Square(x, y, selectedColor, 50);
        square.draw(this.ctx);
    }

    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}