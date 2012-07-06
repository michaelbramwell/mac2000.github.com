var p = document.getElementsByTagName('P');
for(var i = 0; i < p.length; i++) {
    p[i].innerHTML = p[i].innerHTML.autoLink();
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
