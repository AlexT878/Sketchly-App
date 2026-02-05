import type { FigureType } from "../core/FigureFactory.js";

export type Bounds = {
    left: number,
    right: number,
    top: number, 
    bottom: number
};

export abstract class Figure {
    protected x: number;
    protected y: number;
    protected color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    } 

    abstract draw(ctx: CanvasRenderingContext2D): void;

    abstract isPointInside(mouseX: number, mouseY: number): boolean;

    abstract getType(): FigureType;

    abstract getBounds(): Bounds;

    static checkColission(f1: Figure, f2: Figure) {
        const b1 = f1.getBounds();
        const b2 = f2.getBounds();

        return !(
            b2.left > b1.right || 
            b2.right < b1.left || 
            b2.top > b1.bottom || 
            b2.bottom < b1.top
        );
    }

    moveTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}