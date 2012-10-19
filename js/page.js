var p = document.getElementsByTagName('P');
for(var i = 0; i < p.length; i++) {
    p[i].innerHTML = p[i].innerHTML.autoLink();
}

if(typeof prettyPrint != 'undefined') {
    var c = document.getElementsByTagName('PRE');
    //var c = document.getElementsByTagName('CODE');
    for(var i = 0; i < c.length; i++) {
        c[i].className = 'prettyprint';
    }
    prettyPrint();
}

function toggleImgNoScale(e) {
    this.className = this.className == 'noscale' ? '' : 'noscale';
}
var imgs = document.getElementsByTagName('IMG');
for(var i = 0; i < imgs.length; i++) {
    imgs[i].onclick = toggleImgNoScale;
}
