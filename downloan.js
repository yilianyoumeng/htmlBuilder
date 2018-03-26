const {dialog} = require('electron').remote
const {ipcRenderer} = require('electron')

var button_choose = document.getElementById("choose-folder");//选择文件夹
var button_download = document.getElementById("download-btn");
var downloadFolder = document.getElementById("download-to");
var areaHtml = document.getElementById('area');
var jsHtml = document.getElementById('jsHtml');
var bgImgUrl = document.getElementById('bgImgUrl');
//var downloadAddress = document.getElementById("download-address");

ipcRenderer.on('tips', (event, person) => {
  console.log(person, 'born')
});

window.onload = function() {
    button_choose.addEventListener("click", function(){
        dialog.showOpenDialog({
            defaultPath :'',
            properties: [
                'openDirectory',
            ],
            filters: [
                { name: 'All', extensions: ['*'] },
            ]
        },function(res){
            downloadFolder.value = res[0];
        })
    });
    button_download.addEventListener("click", function(){
        //var tips = document.getElementsByClassName("tips")[0];
        console.log(areaHtml.innerHTML);
        if(downloadFolder.value!="") {
            ipcRenderer.send('download',[downloadFolder.value,areaHtml.innerHTML,jsHtml.innerHTML,bgImgUrl.value]);//
             alert("下载成功");
             $('#tanDownLoad').removeClass('db').addClass('dn');
        }else {
            alert("未选择文件夹");
        }
    })
}
