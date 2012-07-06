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

function mypipe(data) {
    var ul = document.getElementById('pipe');
    for(var i = 0; i < data.value.items.length; i++) {
        var item = data.value.items[i];
        var a = document.createElement('A');
        var li = document.createElement('LI');

        a.href = item.link;
        a.innerHTML = item.title;

        li.appendChild(a);
        ul.appendChild(li);
    }
}

if(document.getElementById('disqus_thread') && window.location.hostname != 'localhost') {
    var disqus_shortname = 'mbou';

    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}

function toggleImgNoScale(e) {
    this.className = this.className == 'noscale' ? '' : 'noscale';
}
var imgs = document.getElementsByTagName('IMG');
for(var i = 0; i < imgs.length; i++) {
    imgs[i].onclick = toggleImgNoScale;
}
