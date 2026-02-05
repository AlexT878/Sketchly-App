import { FigureFactory, FigureType } from './FigureFactory.js';
import { DebugMonitor } from './DebugMonitor.js';
import { Figure } from '../figures/Figure.js';
import { InputHandler } from './InputHandler.js';

export class SketchlyApp {
    private debugMonitor: DebugMonitor;
    private inputHandler: InputHandler;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private colorPicker: HTMLInputElement;
    private warningElement: HTMLDivElement;
    
    private figureSelector: FigureType = FigureType.SQUARE;
    private figures: Figure[] = [];
    private selectedFigure: Figure | null = null;

    constructor(canvasId: string) {
        this.debugMonitor = new DebugMonitor();
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.colorPicker = document.getElementById('color-picker') as HTMLInputElement;
        this.warningElement = document.getElementById('warning-msg') as HTMLDivElement;

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.inputHandler = new InputHandler(this.canvas, {
            onMouseDown: (x, y) => this.handleMouseDown(x, y),
            onMouseMove: (x, y, isDragging) => this.handleMouseMove(x, y, isDragging),
            windowOnMouseMove: (x, y) => this.handleWindowMouseMove(x, y),
            onMouseUp: () => this.handleMouseUp(),
            onToolChange: (tool) => this.setTool(tool),
            onClear: () => this.clearCanvas()
        });

        this.updateButtonUI();
        this.render();
    }

    private handleMouseDown(x: number, y: number): void {
        const figure = this.checkFiguresUnderMouse(x, y);
        let colission = false;
        
        if (figure) {
            this.selectedFigure = figure;
        } else {
            const newFig = FigureFactory.create(this.figureSelector, x, y, this.colorPicker.value);
            this.figures.forEach(figure => {
                if(Figure.checkColission(newFig, figure)) {
                    colission = true;
                    this.renderColissionMessage();
                }
            })
            if(!colission) this.figures.push(newFig);
        }
        this.render();
    }

    private handleMouseMove(x: number, y: number, isDragging: boolean): void {
        this.debugMonitor.updateMouseCanvasPosition(x, y);
        
        if (isDragging && this.selectedFigure) {
            this.selectedFigure.moveTo(x, y);
            this.render(); 
        } else {
            this.checkFiguresUnderMouse(x, y);
        }
    }

    private handleWindowMouseMove(x: number, y: number): void {
        this.debugMonitor.updateMouseWindowPosition(x, y);
    }

    private handleMouseUp(): void {
        this.selectedFigure = null;
    }

    private checkFiguresUnderMouse(mouseX: number, mouseY: number): Figure | null {
        let returnFigure: Figure | null = null;
        this.figures.forEach((figure, index) => {
            if (figure.isPointInside(mouseX, mouseY)) {
                this.debugMonitor.updateCurrentFigure(figure.getType(), index);
                returnFigure = figure;
            }
        });

        if (!returnFigure) this.debugMonitor.updateCurrentFigure(FigureType.NONE, -1);
        return returnFigure;
    }

    private setTool(type: FigureType) {
        this.figureSelector = type;
        this.updateButtonUI();
    }

    private clearCanvas(): void {
        this.figures = [];
        this.render();
    }

    private updateButtonUI(): void {
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            const isSelected = btn.getAttribute('data-tool') === this.figureSelector;
            btn.classList.toggle('active', isSelected);
        });
    }

    private render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.figures.forEach(f => f.draw(this.ctx));
    }

    private renderColissionMessage(): void {
        this.warningElement.classList.remove('fade-animation');
        void this.warningElement.offsetWidth;
        this.warningElement.classList.add('fade-animation');
    }
}