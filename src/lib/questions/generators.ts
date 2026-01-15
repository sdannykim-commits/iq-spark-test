import { Question, Difficulty, Shape, ShapeType, SHAPE_COLORS, SHAPE_TYPES, SVGInstruction } from './types';
import { createShape, createSVGInstruction, rotateShape, scaleShape, recolorShape, morphShape } from './svg-utils';
import { seededRandom } from '../utils';

const GRID_SIZE = 120;
const CELL_SIZE = 40;
const SHAPE_SIZE = 28;

// Pick a random item from array using seeded random
function pick<T>(arr: T[], random: () => number): T {
    return arr[Math.floor(random() * arr.length)];
}

// Pick multiple unique items
function pickMultiple<T>(arr: T[], count: number, random: () => number): T[] {
    const shuffled = [...arr].sort(() => random() - 0.5);
    return shuffled.slice(0, count);
}

// Get color palette based on difficulty
function getColorPalette(difficulty: Difficulty): string[] {
    if (difficulty === 1) {
        return [SHAPE_COLORS.primary, SHAPE_COLORS.secondary];
    } else if (difficulty === 2) {
        return [SHAPE_COLORS.primary, SHAPE_COLORS.secondary, SHAPE_COLORS.accent];
    }
    return [SHAPE_COLORS.primary, SHAPE_COLORS.secondary, SHAPE_COLORS.accent, SHAPE_COLORS.warm];
}

// =============================================================================
// MATRIX REASONING (3x3 grid with missing cell)
// =============================================================================
export function generateMatrixQuestion(seed: string, difficulty: Difficulty): Question {
    const random = seededRandom(seed);
    const id = `matrix-${seed}`;

    const colors = getColorPalette(difficulty);
    const shapes: ShapeType[] = pickMultiple(SHAPE_TYPES, difficulty + 1, random);

    // Grid positions
    const cells: SVGInstruction[] = [];
    const rotations = [0, 90, 180, 270];
    const sizes = [SHAPE_SIZE * 0.7, SHAPE_SIZE, SHAPE_SIZE * 1.3];

    // Pattern rules
    const rowRule = pick(['rotate', 'size', 'color', 'shape'], random);
    const colRule = pick(['rotate', 'size', 'color', 'morph'], random);

    // Generate 8 cells (leaving 9th as answer)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (row === 2 && col === 2) continue; // Skip answer cell

            const baseShape = shapes[row % shapes.length];
            const baseColor = colors[col % colors.length];
            const rotation = rotations[(row + col) % rotations.length];
            const size = sizes[(row + col + difficulty) % sizes.length];

            const shape = createShape({
                type: baseShape,
                x: CELL_SIZE / 2,
                y: CELL_SIZE / 2,
                size: size,
                fill: baseColor,
                rotation: rotation,
            });

            cells.push(createSVGInstruction(CELL_SIZE, CELL_SIZE, [shape]));
        }
    }

    // Generate correct answer (follows pattern)
    const correctShape = shapes[2 % shapes.length];
    const correctColor = colors[2 % colors.length];
    const correctRotation = rotations[(2 + 2) % rotations.length];
    const correctSize = sizes[(2 + 2 + difficulty) % sizes.length];

    const correctAnswer = createSVGInstruction(CELL_SIZE, CELL_SIZE, [
        createShape({
            type: correctShape,
            x: CELL_SIZE / 2,
            y: CELL_SIZE / 2,
            size: correctSize,
            fill: correctColor,
            rotation: correctRotation,
        })
    ]);

    // Generate wrong options (5 distractors)
    const options: SVGInstruction[] = [];
    const correctIndex = Math.floor(random() * 6);

    for (let i = 0; i < 6; i++) {
        if (i === correctIndex) {
            options.push(correctAnswer);
        } else {
            // Generate distractor
            const wrongShape = pick(shapes, random);
            const wrongColor = pick(colors, random);
            const wrongRotation = pick(rotations, random);
            const wrongSize = pick(sizes, random);

            options.push(createSVGInstruction(CELL_SIZE, CELL_SIZE, [
                createShape({
                    type: wrongShape,
                    x: CELL_SIZE / 2,
                    y: CELL_SIZE / 2,
                    size: wrongSize,
                    fill: wrongColor,
                    rotation: wrongRotation,
                })
            ]));
        }
    }

    // Create prompt with grid
    const promptShapes: Shape[] = [];
    let cellIndex = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (row === 2 && col === 2) {
                // Question mark cell
                promptShapes.push(createShape({
                    type: 'cross',
                    x: col * CELL_SIZE + CELL_SIZE / 2,
                    y: row * CELL_SIZE + CELL_SIZE / 2,
                    size: SHAPE_SIZE * 0.5,
                    fill: SHAPE_COLORS.neutral,
                    rotation: 45,
                }));
            } else {
                const cellShapes = cells[cellIndex].shapes;
                for (const s of cellShapes) {
                    promptShapes.push({
                        ...s,
                        x: col * CELL_SIZE + CELL_SIZE / 2,
                        y: row * CELL_SIZE + CELL_SIZE / 2,
                    });
                }
                cellIndex++;
            }
        }
    }

    return {
        id,
        type: 'matrix',
        prompt: createSVGInstruction(GRID_SIZE, GRID_SIZE, promptShapes),
        options,
        correctIndex,
        difficulty,
        ruleTags: [rowRule, colRule],
        points: difficulty,
    };
}

// =============================================================================
// SEQUENCE COMPLETION
// =============================================================================
export function generateSequenceQuestion(seed: string, difficulty: Difficulty): Question {
    const random = seededRandom(seed);
    const id = `sequence-${seed}`;

    const sequenceLength = 4;
    const cellWidth = 50;
    const totalWidth = cellWidth * (sequenceLength + 1);

    const colors = getColorPalette(difficulty);
    const baseShape: ShapeType = pick(SHAPE_TYPES.slice(0, 5), random);
    const baseColor = pick(colors, random);

    // Pattern type
    const patternType = pick(['rotation', 'scale', 'position', 'count'], random);

    const sequenceShapes: Shape[] = [];

    // Generate sequence based on pattern
    for (let i = 0; i < sequenceLength; i++) {
        let rotation = 0;
        let size = SHAPE_SIZE;
        let y = cellWidth / 2;

        switch (patternType) {
            case 'rotation':
                rotation = i * (45 * difficulty);
                break;
            case 'scale':
                size = SHAPE_SIZE * (0.6 + i * 0.15);
                break;
            case 'position':
                y = cellWidth / 2 + (i - 1.5) * 6;
                break;
            case 'count':
                // Add multiple shapes for count pattern
                for (let j = 0; j <= i; j++) {
                    sequenceShapes.push(createShape({
                        type: baseShape,
                        x: i * cellWidth + cellWidth / 2,
                        y: cellWidth / 2 + (j - i / 2) * 10,
                        size: SHAPE_SIZE * 0.6,
                        fill: baseColor,
                    }));
                }
                continue;
        }

        sequenceShapes.push(createShape({
            type: baseShape,
            x: i * cellWidth + cellWidth / 2,
            y,
            size,
            fill: baseColor,
            rotation,
        }));
    }

    // Add question mark
    sequenceShapes.push(createShape({
        type: 'cross',
        x: sequenceLength * cellWidth + cellWidth / 2,
        y: cellWidth / 2,
        size: SHAPE_SIZE * 0.5,
        fill: SHAPE_COLORS.neutral,
        rotation: 45,
    }));

    // Generate correct answer
    let correctRotation = 0;
    let correctSize = SHAPE_SIZE;
    let correctY = cellWidth / 2;

    switch (patternType) {
        case 'rotation':
            correctRotation = sequenceLength * (45 * difficulty);
            break;
        case 'scale':
            correctSize = SHAPE_SIZE * (0.6 + sequenceLength * 0.15);
            break;
        case 'position':
            correctY = cellWidth / 2 + (sequenceLength - 1.5) * 6;
            break;
    }

    const correctAnswerShapes: Shape[] = [];

    if (patternType === 'count') {
        for (let j = 0; j <= sequenceLength; j++) {
            correctAnswerShapes.push(createShape({
                type: baseShape,
                x: cellWidth / 2,
                y: cellWidth / 2 + (j - sequenceLength / 2) * 10,
                size: SHAPE_SIZE * 0.6,
                fill: baseColor,
            }));
        }
    } else {
        correctAnswerShapes.push(createShape({
            type: baseShape,
            x: cellWidth / 2,
            y: correctY,
            size: correctSize,
            fill: baseColor,
            rotation: correctRotation,
        }));
    }

    const correctAnswer = createSVGInstruction(cellWidth, cellWidth, correctAnswerShapes);

    // Generate options
    const options: SVGInstruction[] = [];
    const correctIndex = Math.floor(random() * 6);

    for (let i = 0; i < 6; i++) {
        if (i === correctIndex) {
            options.push(correctAnswer);
        } else {
            const wrongRotation = pick([0, 45, 90, 135, 180, 225, 270, 315], random);
            const wrongSize = pick([SHAPE_SIZE * 0.5, SHAPE_SIZE * 0.8, SHAPE_SIZE, SHAPE_SIZE * 1.2], random);

            options.push(createSVGInstruction(cellWidth, cellWidth, [
                createShape({
                    type: baseShape,
                    x: cellWidth / 2,
                    y: cellWidth / 2,
                    size: wrongSize,
                    fill: baseColor,
                    rotation: wrongRotation,
                })
            ]));
        }
    }

    return {
        id,
        type: 'sequence',
        prompt: createSVGInstruction(totalWidth, cellWidth, sequenceShapes),
        options,
        correctIndex,
        difficulty,
        ruleTags: [patternType],
        points: difficulty,
    };
}

// =============================================================================
// VISUAL ANALOGY (A:B :: C:?)
// =============================================================================
export function generateAnalogyQuestion(seed: string, difficulty: Difficulty): Question {
    const random = seededRandom(seed);
    const id = `analogy-${seed}`;

    const cellSize = 50;
    const totalWidth = cellSize * 5; // A : B :: C : ?

    const colors = getColorPalette(difficulty);
    const shapes: ShapeType[] = pickMultiple(SHAPE_TYPES, 4, random);

    // Define transformation
    const transformation = pick(['rotate', 'color', 'size', 'morph'], random);

    const shapeA = shapes[0];
    const shapeC = shapes[1];
    const colorA = colors[0];
    const colorC = colors[1];

    let shapeB: ShapeType = shapeA;
    let colorB = colorA;
    let rotationB = 0;
    let sizeA = SHAPE_SIZE;
    let sizeB = SHAPE_SIZE;
    let shapeD: ShapeType = shapeC;
    let colorD = colorC;
    let rotationD = 0;
    let sizeC = SHAPE_SIZE;
    let sizeD = SHAPE_SIZE;

    switch (transformation) {
        case 'rotate':
            rotationB = 90 * difficulty;
            rotationD = 90 * difficulty;
            break;
        case 'color':
            colorB = colors[(colors.indexOf(colorA) + 1) % colors.length];
            colorD = colors[(colors.indexOf(colorC) + 1) % colors.length];
            break;
        case 'size':
            sizeB = SHAPE_SIZE * 1.5;
            sizeD = SHAPE_SIZE * 1.5;
            break;
        case 'morph':
            shapeB = shapes[2];
            shapeD = shapes[3];
            break;
    }

    // Create prompt shapes
    const promptShapes: Shape[] = [
        // A
        createShape({ type: shapeA, x: cellSize * 0.5, y: cellSize / 2, size: sizeA, fill: colorA }),
        // Colon
        createShape({ type: 'circle', x: cellSize * 1.2, y: cellSize / 2 - 8, size: 6, fill: SHAPE_COLORS.neutral }),
        createShape({ type: 'circle', x: cellSize * 1.2, y: cellSize / 2 + 8, size: 6, fill: SHAPE_COLORS.neutral }),
        // B
        createShape({ type: shapeB, x: cellSize * 1.9, y: cellSize / 2, size: sizeB, fill: colorB, rotation: rotationB }),
        // Double colon
        createShape({ type: 'circle', x: cellSize * 2.3, y: cellSize / 2 - 8, size: 6, fill: SHAPE_COLORS.neutral }),
        createShape({ type: 'circle', x: cellSize * 2.3, y: cellSize / 2 + 8, size: 6, fill: SHAPE_COLORS.neutral }),
        createShape({ type: 'circle', x: cellSize * 2.6, y: cellSize / 2 - 8, size: 6, fill: SHAPE_COLORS.neutral }),
        createShape({ type: 'circle', x: cellSize * 2.6, y: cellSize / 2 + 8, size: 6, fill: SHAPE_COLORS.neutral }),
        // C
        createShape({ type: shapeC, x: cellSize * 3.3, y: cellSize / 2, size: sizeC, fill: colorC }),
        // Colon
        createShape({ type: 'circle', x: cellSize * 4.0, y: cellSize / 2 - 8, size: 6, fill: SHAPE_COLORS.neutral }),
        createShape({ type: 'circle', x: cellSize * 4.0, y: cellSize / 2 + 8, size: 6, fill: SHAPE_COLORS.neutral }),
        // Question mark (?)
        createShape({ type: 'cross', x: cellSize * 4.5, y: cellSize / 2, size: SHAPE_SIZE * 0.5, fill: SHAPE_COLORS.neutral, rotation: 45 }),
    ];

    // Correct answer
    const correctAnswer = createSVGInstruction(cellSize, cellSize, [
        createShape({ type: shapeD, x: cellSize / 2, y: cellSize / 2, size: sizeD, fill: colorD, rotation: rotationD })
    ]);

    // Generate options
    const options: SVGInstruction[] = [];
    const correctIndex = Math.floor(random() * 6);

    for (let i = 0; i < 6; i++) {
        if (i === correctIndex) {
            options.push(correctAnswer);
        } else {
            const wrongShape = pick(shapes, random);
            const wrongColor = pick(colors, random);
            const wrongRotation = pick([0, 45, 90, 180, 270], random);

            options.push(createSVGInstruction(cellSize, cellSize, [
                createShape({ type: wrongShape, x: cellSize / 2, y: cellSize / 2, size: SHAPE_SIZE, fill: wrongColor, rotation: wrongRotation })
            ]));
        }
    }

    return {
        id,
        type: 'analogy',
        prompt: createSVGInstruction(totalWidth, cellSize, promptShapes),
        options,
        correctIndex,
        difficulty,
        ruleTags: [transformation],
        points: difficulty,
    };
}

// =============================================================================
// ODD ONE OUT
// =============================================================================
export function generateOddOneOutQuestion(seed: string, difficulty: Difficulty): Question {
    const random = seededRandom(seed);
    const id = `odd-${seed}`;

    const cellSize = 60;
    const totalWidth = cellSize * 3;
    const totalHeight = cellSize * 2;

    const colors = getColorPalette(difficulty);
    const shapes: ShapeType[] = pickMultiple(SHAPE_TYPES, 2, random);

    const commonShape = shapes[0];
    const oddShape = shapes[1];
    const commonColor = colors[0];
    const oddColor = difficulty >= 2 ? colors[1] : commonColor;
    const commonRotation = 0;
    const oddRotation = difficulty >= 3 ? 45 : 0;

    // Positions for 6 items in 3x2 grid
    const positions = [
        { x: cellSize * 0.5, y: cellSize * 0.5 },
        { x: cellSize * 1.5, y: cellSize * 0.5 },
        { x: cellSize * 2.5, y: cellSize * 0.5 },
        { x: cellSize * 0.5, y: cellSize * 1.5 },
        { x: cellSize * 1.5, y: cellSize * 1.5 },
        { x: cellSize * 2.5, y: cellSize * 1.5 },
    ];

    const oddIndex = Math.floor(random() * 6);

    const promptShapes: Shape[] = positions.map((pos, i) => {
        if (i === oddIndex) {
            return createShape({
                type: oddShape,
                x: pos.x,
                y: pos.y,
                size: SHAPE_SIZE,
                fill: oddColor,
                rotation: oddRotation,
            });
        }
        return createShape({
            type: commonShape,
            x: pos.x,
            y: pos.y,
            size: SHAPE_SIZE,
            fill: commonColor,
            rotation: commonRotation,
        });
    });

    // Generate options (the 6 shapes as clickable options)
    const options: SVGInstruction[] = positions.map((_, i) => {
        if (i === oddIndex) {
            return createSVGInstruction(cellSize, cellSize, [
                createShape({ type: oddShape, x: cellSize / 2, y: cellSize / 2, size: SHAPE_SIZE, fill: oddColor, rotation: oddRotation })
            ]);
        }
        return createSVGInstruction(cellSize, cellSize, [
            createShape({ type: commonShape, x: cellSize / 2, y: cellSize / 2, size: SHAPE_SIZE, fill: commonColor })
        ]);
    });

    return {
        id,
        type: 'odd_one_out',
        prompt: createSVGInstruction(totalWidth, totalHeight, promptShapes),
        options,
        correctIndex: oddIndex,
        difficulty,
        ruleTags: ['category'],
        points: difficulty,
    };
}
