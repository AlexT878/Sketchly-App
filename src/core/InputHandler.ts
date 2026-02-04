import { FigureType } from './FigureFactory.js';

export class InputHandler {
    private isDragging: boolean = false;

    constructor(
        private canvas: HTMLCanvasElement,
        private callbacks: {
            onMouseDown: (x: number, y: number) => void,
            onMouseMove: (x: number, y: number, isDragging: boolean) => void,
            windowOnMouseMove: (x: number, y: number) => void,
            onMouseUp: () => void,
            onToolChange: (tool: FigureType) => void,
            onClear: () => void
        }
    ) {
        this.initEvents();
    }

    private initEvents(): void {
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.callbacks.onMouseDown(e.offsetX, e.offsetY);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.callbacks.onMouseMove(e.offsetX, e.offsetY, this.isDragging);
        });

        window.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.callbacks.onMouseUp();
            }
        });

        window.addEventListener('mousemove', (e) => {
            this.callbacks.windowOnMouseMove(e.clientX, e.clientY);
        })

        document.querySelectorAll('.toolbar-btn').forEach(button => {
            button.addEventListener('click', () => {
                const tool = button.getAttribute('data-tool') as FigureType;
                this.callbacks.onToolChange(tool);
            });
        });

        document.getElementById('btn-clear')?.addEventListener('click', () => {
            this.callbacks.onClear();
        });
    }
}