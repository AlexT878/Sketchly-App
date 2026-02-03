import { FigureFactory } from './FigureFactory.js';
import { FigureType } from './FigureFactory.js';

export class SketchlyApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private colorPicker: HTMLInputElement;
    private clearBtn: HTMLButtonElement;
    private figureSelector: FigureType; 
    private toolButtons: NodeListOf<HTMLButtonElement>;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.colorPicker = document.getElementById('color-picker') as HTMLInputElement;
        this.clearBtn = document.getElementById('btn-clear') as HTMLButtonElement;
        this.figureSelector = FigureType.SQUARE;

        this.toolButtons = document.querySelectorAll('.toolbar-btn');

        this.init();
    }

    private init(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.clearBtn.addEventListener('click', () => this.clearCanvas());
        
        this.toolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tool = button.getAttribute('data-tool') as FigureType;
                this.setTool(tool);
            })
        })

        this.updateButtonUI();
    }

    private setTool(type: FigureType) {
        this.figureSelector = type;
        this.updateButtonUI();
    }

    private updateButtonUI(): void {
        this.toolButtons.forEach(btn => {
            const isSelected = btn.getAttribute('data-tool') === this.figureSelector;
            btn.classList.toggle('active', isSelected);
        });
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