const defaultPalette = {
    options: ['#ff0000','#00ff00'],
    current: 0
};


export default function palette(palette = defaultPalette, action) {
    switch (action.type) {


        default:
            return palette;
    }
}