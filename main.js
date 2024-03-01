const { app, BrowserWindow } = require('electron')
const path = require ('path')
const isDev = require ('electron-is-dev')


function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
      }
    })
  
    win.loadURL(isDev ? "http://127.0.0.1:3000" : `file://${path.join(__dirname,'../build/index.html')}`);
}
  
  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })