// main.js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// Error Handling
process.on('uncaughtException', (error) => {
  console.error("Unexpected error: ", error)
})
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  })
  win.loadFile(path.join(__dirname, 'dist/tango-counter/browser/index.html'))
}
// App Lifecycle
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// main.js (continued)
ipcMain.on('message', (_, message) => {
  console.log("Message from Renderer:", message)
})