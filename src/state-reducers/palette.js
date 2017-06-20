const defaultPalette = {
    options: ['#ff0000', '#00ff00','#dd5577'],
    current: 0
};

const PALETTE_OPTION_ADD = 'PALETTE_OPTION_ADD';
const PALETTE_OPTION_DELETE = 'PALETTE_OPTION_DELETE';
const PALETTE_OPTION_SELECT = 'PALETTE_OPTION_SELECT';


export function createActionPaletteOptionAdd(newOption: string) {
    return {
        type: PALETTE_OPTION_ADD, newOption
    }
}
export function createActionPaletteOptionDelete(index: number) {
    return {
        type: PALETTE_OPTION_DELETE, index
    }
}
export function createActionPaletteOptionSelect(index: number) {
    return {
        type: PALETTE_OPTION_SELECT, index
    }
}

export default function palette(palette = defaultPalette, action) {
    switch (action.type) {

        case PALETTE_OPTION_ADD:
            return {
                options: palette.options.concat([action.newOption]),
                current: palette.current
            };


        case PALETTE_OPTION_DELETE:
            return {
                options: palette.options.filter((block, index)=>index !== action.index),
                current: palette.current
            };

        case PALETTE_OPTION_SELECT:
            return {
                options: palette.options,
                current: action.index
            };

        default:
            return palette;
    }
}