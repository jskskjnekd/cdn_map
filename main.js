const { app, BrowserWindow, Menu } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let seqWin

function win_for_testing_music_play() {
    let browser_play_music = new BrowserWindow({
        width: 1920,
        height: 1000,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    browser_play_music.loadFile('cdn_map.html');

    browser_play_music.webContents.openDevTools();

    browser_play_music.on('closed', function () {
        browser_play_music = null;
    });
}

function win_for_deck_gl() {
    let browser_play_music = new BrowserWindow({
        width: 1920,
        height: 1000,
        titleBarStyle: 'hidden',
        vibrancy: 'ultra-dark',
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    browser_play_music.loadFile('kepler.html');

    browser_play_music.webContents.openDevTools();

    browser_play_music.on('closed', function () {
        browser_play_music = null;
    });
}

function win_for_mapBox() {
    let browser_play_music = new BrowserWindow({
        width: 1920,
        height: 1000,
        titleBarStyle: 'hidden',
        vibrancy: 'ultra-dark',
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    browser_play_music.loadFile('animate_mapbox.html');

    browser_play_music.webContents.openDevTools();

    browser_play_music.on('closed', function () {
        browser_play_music = null;
    });
}

function createWindow () {
    // this is a window just for testing playing music
    win_for_testing_music_play();
    // win_for_deck_gl();
    win_for_mapBox();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});





