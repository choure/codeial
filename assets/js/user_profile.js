var signOut = document.getElementById('sign-out');

signOut.addEventListener('click', function(){
    var now = new Date();
    var time = now.getTime();
    //var expireTime = time + 1000*36000;
    now.setTime(time);

    var allCookies = document.cookie.split(';'); 
    console.log(allCookies);
    console.log('Mohit');

    // The "expire" attribute of every cookie is  
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT" 
    for (var i = 0; i < allCookies.length; i++) {
        document.cookie = allCookies[i] + "=;expires=" + now.toUTCString() + ';path=/'; 
        // document.cookie = 'cookie=ok;expires='+now.toUTCString()+';path=/';
        console.log(allCookies[i]);
    }
    // document.cookie = 'cookie=ok;expires='+now.toUTCString()+';path=/';
    
});