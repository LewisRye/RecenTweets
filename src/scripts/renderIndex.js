const ipc = window.require('electron').ipcRenderer;

const btnLogOut = document.getElementById('btnLogOut');

btnLogOut.onclick = logOut;

function logOut()
{
    ipc.send('openLoginWindow');
}