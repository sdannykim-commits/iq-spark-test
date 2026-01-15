import { Shape, ShapeType, SVGInstruction, SHAPE_COLORS } from './types';

// Generate SVG path for different shape types
export function getShapePath(shape: Shape): string {
    const { type, x, y, size } = shape;
    const s = size / 2;

    switch (type) {
        case 'circle':
            return `M ${x} ${y} m -${s}, 0 a ${s},${s} 0 1,0 ${size},0 a ${s},${s} 0 1,0 -${size},0`;

        case 'square':
            return `M ${x - s} ${y - s} h ${size} v ${size} h -${size} Z`;

        case 'triangle':
            return `M ${x} ${y - s} L ${x + s} ${y + s} L ${x - s} ${y + s} Z`;

        case 'diamond':
            return `M ${x} ${y - s} L ${x + s} ${y} L ${x} ${y + s} L ${x - s} ${y} Z`;

        case 'hexagon':
            const h = s * 0.866;
            return `M ${x - s} ${y} L ${x - s / 2} ${y - h} L ${x + s / 2} ${y - h} L ${x + s} ${y} L ${x + s / 2} ${y + h} L ${x - s / 2} ${y + h} Z`;

        case 'star':
            const outer = s;
            const inner = s * 0.4;
            let points = '';
            for (let i = 0; i < 10; i++) {
                const r = i % 2 === 0 ? outer : inner;
                const angle = (i * 36 - 90) * Math.PI / 180;
                const px = x + r * Math.cos(angle);
                const py = y + r * Math.sin(angle);
                points += (i === 0 ? 'M' : 'L') + ` ${px} ${py} `;
            }
            return points + 'Z';

        case 'cross':
            const w = s * 0.35;
            return `M ${x - w} ${y - s} h ${w * 2} v ${s - w} h ${s - w} v ${w * 2} h -${s - w} v ${s - w} h -${w * 2} v -${s - w} h -${s - w} v -${w * 2} h ${s - w} Z`;

        case 'arrow':
            return `M ${x} ${y - s} L ${x + s} ${y} L ${x + s * 0.4} ${y} L ${x + s * 0.4} ${y + s} L ${x - s * 0.4} ${y + s} L ${x - s * 0.4} ${y} L ${x - s} ${y} Z`;

        default:
            return '';
    }
}

// Render SVG instruction to SVG element string
export function renderSVG(instruction: SVGInstruction, className?: string): string {
    const { width, height, shapes } = instruction;

    let shapesContent = '';
    for (const shape of shapes) {
        const path = getShapePath(shape);
        const transform = shape.rotation !== 0
            ? `transform="rotate(${shape.rotation} ${shape.x} ${shape.y})"`
            : '';

        shapesContent += `<path 
      d="${path}" 
      fill="${shape.fill}" 
      stroke="${shape.stroke}" 
      stroke-width="${shape.strokeWidth}"
      opacity="${shape.opacity}"
      ${transform}
    />`;
    }

    return `<svg 
    viewBox="0 0 ${width} ${height}" 
    width="100%" 
    height="100%"
    class="${className || ''}"
    xmlns="http://www.w3.org/2000/svg"
  >${shapesContent}</svg>`;
}

// Create a shape with default values
export function createShape(overrides: Partial<Shape> & { type: ShapeType; x: number; y: number; size: number }): Shape {
    return {
        rotation: 0,
        fill: SHAPE_COLORS.primary,
        stroke: 'none',
        strokeWidth: 0,
        opacity: 1,
        ...overrides,
    };
}

// Create an SVG instruction with shapes
export function createSVGInstruction(width: number, height: number, shapes: Shape[]): SVGInstruction {
    return { width, height, shapes };
}

// Rotate a shape by degrees
export function rotateShape(shape: Shape, degrees: number): Shape {
    return { ...shape, rotation: (shape.rotation + degrees) % 360 };
}

// Change shape size
export function scaleShape(shape: Shape, factor: number): Shape {
    return { ...shape, size: shape.size * factor };
}

// Move shape position
export function moveShape(shape: Shape, dx: number, dy: number): Shape {
    return { ...shape, x: shape.x + dx, y: shape.y + dy };
}

// Change shape color
export function recolorShape(shape: Shape, fill: string): Shape {
    return { ...shape, fill };
}

// Transform shape type
export function morphShape(shape: Shape, newType: ShapeType): Shape {
    return { ...shape, type: newType };
}
