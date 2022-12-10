const ipc = window.require('electron').ipcRenderer;

var mysql = require('mysql');
var count = 0;

const btnLogin = document.getElementById('btnLogin');
const txtUsr = document.getElementById('txtUsr');
const txtPwd = document.getElementById('txtPwd');
const lblIncorrect = document.getElementById('lblIncorrect');

btnLogin.onclick = login;

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
        console.log(results[0].count);
        count = parseInt(results[0].count);
        console.log(count);

        if (count == 1)
        {
        console.log('Logged in.');
        ipc.send('openMainWindow');
        txtUsr.value = "";
        txtPwd.value = "";
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