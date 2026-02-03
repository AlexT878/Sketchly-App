import { Figure } from '../figures/Figure.js';
import { Square } from '../figures/Square.js';
import { Triangle } from '../figures/Triangle.js';
import { Circle } from '../figures/Circle.js';

enum FigureType {
    SQUARE = 'square',
    TRIANGLE = 'triangle',
    CIRCLE = 'circle'
}

export class FigureFactory {
    static create(type: FigureType, x: number, y: number, color: string): Figure {
        const defaultSize = 50;

        switch(type) {
            case FigureType.SQUARE: return new Square(x, y, color, defaultSize);
            case FigureType.TRIANGLE: return new Triangle(x, y, color, defaultSize);
            case FigureType.CIRCLE: return new Circle(x, y, color, defaultSize / 2);
            default: throw new Error("Figure not found!");
        }
    }
}