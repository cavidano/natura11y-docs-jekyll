window.addEventListener("DOMContentLoaded",(function(){document.getElementById("related-custom-properties");var e="Copied!";!function(){console.log("whoa");var t=document.querySelectorAll('[data-clipboard="all"]'),n=document.querySelectorAll('[data-clipboard="single"]');t.forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault();var n=t.target.closest("table"),r=n.querySelectorAll("tbody > tr");n.querySelectorAll('[data-clipboard="single"]').forEach((function(t){t.innerHTML=e.toString()}));var o=[];r.forEach((function(e){var t=e.querySelector("[data-prop]").innerHTML.trim().replace(/&nbsp;/g,""),n=e.querySelector("[data-val]").innerHTML.trim().replace(/&nbsp;/g,""),r="".concat(t,": ").concat(n,";");o.push(r)}));var c=o.map((function(e){return"    ".concat(e)})).join("\n"),a="\n                    :root {\n                        ".concat(c,"\n                    }"),l=document.createElement("textarea");l.innerHTML=a.trim(),document.body.appendChild(l),l.select(),document.execCommand("copy"),document.body.removeChild(l)}))})),n.forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault(),n.forEach((function(e){e.innerHTML="Copy"}));var r=t.target.closest("tr"),o=r.querySelector("[data-prop]").innerHTML.trim().replace(/&nbsp;/g,""),c=r.querySelector("[data-val]").innerHTML.trim().replace(/&nbsp;/g,""),a="".concat(o,": ").concat(c,";");a&&(t.target.innerHTML=e);var l=document.createElement("input");l.setAttribute("value",a),document.body.appendChild(l),l.select(),document.execCommand("copy"),document.body.removeChild(l)}))}))}()}));