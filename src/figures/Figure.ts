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
}