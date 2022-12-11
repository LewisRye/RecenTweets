const ipc = window.require('electron').ipcRenderer;

var mysql = require('mysql');
var count = 0;

const btnLogin = document.getElementById('btnLogin');
const txtUsr = document.getElementById('txtUsr');
const txtPwd = document.getElementById('txtPwd');
const lblIncorrect = document.getElementById('lblIncorrect');

btnLogin.onclick = login;

// Execute a function when the user presses enter on the keyboard
txtUsr.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    login();
  }
});

// Execute a function when the user presses enter on the keyboard
txtPwd.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    login();
  }
});
// logs the user in
function login()
{
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "project"
    });
    
    con.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT COUNT(account_id) AS count FROM account WHERE username='" + txtUsr.value + "' AND passhash='" + txtPwd.value + "';";

      con.query(sql, function(err, results){
        if (err){ 
          throw err;
        }
        count = parseInt(results[0].count);

        if (count == 1)
        {
        ipc.send('openMainWindow');
        count = 0;
        }
        else
        {
          console.log('Incorrect password.');
          lblIncorrect.style.color = "var(--error)";
          lblIncorrect.style.opacity = "100";

          setTimeout(function(){
            lblIncorrect.style.opacity = "0";
          }, 5000); // Run this after 5 seconds.
        }
      })
    });
}