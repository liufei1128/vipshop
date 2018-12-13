function sendJsonp(url,data){
    const $script = document.createElement('script');
    const flag = url.indexOf('?') == -1 ? '?' : '&';
    url += flag;
    for(let i in data){
        url += `${i}=${data[i]}&`;
    }
    url += '_=' + Date.now();
    $script.src = url;
    document.body.appendChild($script);
}