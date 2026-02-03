import { FigureFactory } from './FigureFactory.js';
import { FigureType } from './FigureFactory.js';
import { DebugMonitor } from './DegubMonitor.js';
import { Figure } from '../figures/Figure.js';

export class SketchlyApp {
    private debugMonitor: DebugMonitor;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private colorPicker: HTMLInputElement;
    private clearBtn: HTMLButtonElement;
    private figureSelector: FigureType; 
    private toolButtons: NodeListOf<HTMLButtonElement>;
    private figures: Figure[];

    constructor(canvasId: string) {
        this.debugMonitor = new DebugMonitor();

        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.colorPicker = document.getElementById('color-picker') as HTMLInputElement;
        this.clearBtn = document.getElementById('btn-clear') as HTMLButtonElement;
        this.figureSelector = FigureType.SQUARE;
        this.figures = [];

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

        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            this.debugMonitor.updateMouseCanvasPosition(e.offsetX, e.offsetY);
            this.checkFiguresUnderMouse(e.offsetX, e.offsetY);
        })

        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.debugMonitor.updateMouseWindowPosition(e.clientX, e.clientY);
        })

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
        this.figures.push(figure);
        figure.draw(this.ctx);
    }

    private checkFiguresUnderMouse(mouseX: number, mouseY: number) {
        let found = false;

        this.figures.forEach((figure, index) => {
            if (figure.isPointInside(mouseX, mouseY)) {
                this.debugMonitor.updateCurrentFigure(figure.getType(), index);
                found = true; 
            }
        });

        if (!found) {
            this.debugMonitor.updateCurrentFigure(FigureType.NONE, -1);
        }
    }

    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.figures = [];
    }

    private setTool(type: FigureType) {
        this.figureSelector = type;
        this.updateButtonUI();
    }
}