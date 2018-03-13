const { app, Menu, Tray, nativeImage } = require('electron')
let path = require('path')
var fs = require('fs');
var text2png = require('text2png');

let appIcon = null
const options = {
    color: 'white',
    paddingTop: 2,
    paddingBottom: 2,
    font: '8px sans-serif',
    borderWidth: 0,
    //bgColor: 'black',

};


// For example, the code argument below might be the string `123456`
function updateTrayIconWithCode(code, tray) {
    //fs.writeFileSync(path.join(__dirname, 'out.png'), text2png(code, options));

    const img = nativeImage.createFromBuffer(text2png(code, options))
    tray.setImage(img)
}
getTrend = (trend) => {


    switch (trend) {
        case "DoubleUp":
            return "↑↑";
        case "SingleUp":
            return "↑";
        case "FortyFiveUp":
            return "↗";
        case "Flat":
            return "→";
        case "FortyFiveDown":
            return "↘";
        case "SingleDown":
            return "↓";
        case "DoubleDown":
            return "↓↓";
    }
    return ''
}

app.on('ready', () => {
    const img = nativeImage.createFromBuffer(text2png('???', options))

    appIcon = new Tray(img)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' }
    ])

    // Make a change to the context menu
    contextMenu.items[1].checked = false

    // Call this again for Linux because we modified the context menu
    appIcon.setContextMenu(contextMenu)
    let total = 100
    setInterval(() => {
        let trendChar = getTrend('SingleDown');
        return updateTrayIconWithCode((total++ % 400).toString(), appIcon)
    }, 1000);

})