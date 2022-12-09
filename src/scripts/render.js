var mysql = require('mysql');
var count = 0;

const loginBtn = document.getElementById('btnLogin');
const txtUsr = document.getElementById('txtUsr');
const txtPwd = document.getElementById('txtPwd');

loginBtn.onclick = login;

// logs the user in
async function login()
{
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "project"
    });
    
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT COUNT(account_id) AS count FROM account WHERE username='" + txtUsr.value + "' AND passhash='" + txtPwd.value + "';", function (err, result) {
        if (err) throw err;
        if (result[0].count == 1)
        {
            count = 1;
        }
      });
    });

    if (count == 1)
    {
        console.log('Logged in.');
    }
    else
    {
        // incorrect password handler
    }
}