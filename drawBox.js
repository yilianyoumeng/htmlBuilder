var drawBtn = document.getElementById('drawBtn');
drawBtn.onclick = function () {
    var wId = "w";
    var index = 0;
    var startX = 0, startY = 0;
    var flag = false;
    var retcLeft = "0px", retcTop = "0px", retcHeight = "0px", retcWidth = "0px";
    document.onmousedown = function (e) {
        flag = true;
        
        try {
            var evt = window.event || e;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            startX = evt.clientX + scrollLeft;
            startY = evt.clientY + scrollTop;
            index++;
            var a = document.createElement("a");
            a.id = wId + index;
            a.className = "a";
            a.style.marginLeft = startX + "px";
            a.style.marginTop = startY + "px";
            a.className = "link";
            a.href = "#";
            console.log(111);
            document.getElementById('area').appendChild(a);
        } catch (e) {
            //alert(e);
        }
    }
    document.onmouseup = function () {
        try {
            index2=parseInt(index)-1;
            console.log(wId + index);
            document.getElementById('area').removeChild(document.getElementById(wId + index));
            document.getElementById('area').removeChild(document.getElementById(wId + index2));
            var a = document.createElement("a");
            a.className = "retc";
            a.href = "#";
            a.style.marginLeft = retcLeft;
            a.style.marginTop = retcTop;
            a.style.width = retcWidth;
            a.style.height = retcHeight;
            console.log(222);
            document.getElementById('area').appendChild(a);
        } catch (e) {
            //alert(e);
        }
        flag = false;
    }
    document.onmousemove = function (e) {
        if (flag) {
            try {
                var evt = window.event || e;
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + "px";
                retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + "px";
                retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
                retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
                $(wId + index).style.marginLeft = retcLeft;
                $(wId + index).style.marginTop = retcTop;
                $(wId + index).style.width = retcWidth;
                $(wId + index).style.height = retcHeight;
            } catch (e) {
                //alert(e);
            }
        }
    }
    var $ = function (id) {
        return document.getElementById(id);
    }
}
