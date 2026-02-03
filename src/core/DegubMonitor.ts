export class DebugMonitor {
    private innerDimensions: HTMLSpanElement;
    private mouseCanvasPosition: HTMLSpanElement;
    private mouseWindowPosition: HTMLSpanElement;

    constructor() {
        this.innerDimensions = document.getElementById('inner-dimensions') as HTMLSpanElement;
        this.mouseCanvasPosition = document.getElementById('mouse-canvas-position') as HTMLSpanElement;
        this.mouseWindowPosition = document.getElementById('mouse-window-position') as HTMLSpanElement;

        this.init();
    }

    private init(): void {
        this.updateDimensions();

        window.addEventListener('resize', () => this.updateDimensions());
    }

    private updateDimensions(): void {
        this.innerDimensions.textContent = `Inner dimensions: ${window.innerWidth} x ${window.innerHeight}`;
    }

    public updateMouseCanvasPosition(x: number, y: number): void {
        this.mouseCanvasPosition.textContent = `Mouse canvas position: ${x}, ${y}`;
    }

    public updateMouseWindowPosition(x: number, y: number): void {
        this.mouseWindowPosition.textContent = `Mouse window position: ${x}, ${y}`;
    }
}