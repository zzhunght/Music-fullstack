import ColorThief from 'colorthief'


export const getPalette = (url) => {
    return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            let colorThief = new ColorThief();
            resolve(colorThief.getPalette(img));
        }
        img.src = url;
    })
}


export const getPaletteByIMG = (img) => {
    return new Promise(resolve => {
        let colorThief = new ColorThief();
        resolve(colorThief.getPalette(img));
    })
}

export const getLinearColor = (colors) => {
    colors.push([18,18,18])
    // colors.push([255, 255, 255])
    
    const colorStops = colors.map((color, index) => {
        const percentage = (index / (colors.length - 1)) * 100;
        return `rgba(${color}) ${percentage}%`;
    });
    return `linear-gradient(180deg, ${colorStops.join(', ')})`
}