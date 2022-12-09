window.onload = setStyle();

function setStyle()
{
    let background = checkCookie();

    switch(background)
    {
        case "true":
          backgroundEnabled();
          break;
        case "false":
          backgroundDisabled();
          break;
        default:
          addCookie();
      }
}

function checkCookie()
{
    var cookies = document.cookie.split(";")
    .map(cookie => cookie.split("="))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    return cookies.background;
}

function addCookie()
{
    document.cookie = "background=true";
    backgroundEnabled();
}

function backgroundEnabled()
{
    let theme = document.getElementsByTagName("link")[0];
    theme.setAttribute("href", "./styleDark.css");
}

function backgroundDisabled()
{
    let theme = document.getElementsByTagName("link")[0];
    theme.setAttribute("href", "./styleLight.css");
}

function switchStyle()
{
    let theme = document.getElementsByTagName("link")[0];

    if (theme.getAttribute("href") == "./styleDark.css")
    {
        theme.setAttribute("href", "./styleLight.css");
        document.cookie = "background=false";
    }
    else
    {
        theme.setAttribute("href", "./styleDark.css");
        document.cookie = "background=true";
    }
}