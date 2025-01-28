divContent = document.getElementsByClassName('content')[0];
username = localStorage.getItem('userName');
divContent.childern[1].innerHTML = `Sorry ${username}, your time is over. Please try again.`;