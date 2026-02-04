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

    private isDragging: boolean = false;
    private selectedFigure: Figure | null = null;

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
        this.render();
    }

    private init(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mouseup', () => this.onMouseUp());
        this.clearBtn.addEventListener('click', () => this.clearCanvas());
        
        this.toolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tool = button.getAttribute('data-tool') as FigureType;
                this.setTool(tool);
            })
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
        const figure = this.checkFiguresUnderMouse(event.offsetX, event.offsetY);
        
        if (figure) {
            this.isDragging = true;
            this.selectedFigure = figure;
        } else {
            const selectedColor = this.colorPicker.value;
            const newFig = FigureFactory.create(this.figureSelector, event.offsetX, event.offsetY, selectedColor);
            this.figures.push(newFig);
        }

        this.render();
    }

    private checkFiguresUnderMouse(mouseX: number, mouseY: number): Figure | null {
        let found = false;
        let returnFigure: Figure | null = null;

        this.figures.forEach((figure, index) => {
            if (figure.isPointInside(mouseX, mouseY)) {
                this.debugMonitor.updateCurrentFigure(figure.getType(), index);
                found = true; 
                returnFigure = figure;
            }
        });

        if (!found) {
            this.debugMonitor.updateCurrentFigure(FigureType.NONE, -1);
        }

        return returnFigure;
    }

    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.figures = [];
    }

    private setTool(type: FigureType) {
        this.figureSelector = type;
        this.updateButtonUI();
    }

    private render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.figures.forEach(f => f.draw(this.ctx));
    }

    private onMouseMove(event: MouseEvent): void {
        this.debugMonitor.updateMouseCanvasPosition(event.offsetX, event.offsetY);
        
        if (this.isDragging && this.selectedFigure) {
            this.selectedFigure.moveTo(event.offsetX, event.offsetY);
            this.render(); 
        } else {
            this.checkFiguresUnderMouse(event.offsetX, event.offsetY);
        }
    }

    private onMouseUp(): void {
        this.isDragging = false;
        this.selectedFigure = null;
    }
}