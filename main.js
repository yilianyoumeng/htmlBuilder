const electron = require('electron')
const {dialog, ipcMain} = require('electron')
const {download} = require('electron-dl');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
require('electron-dl')();


const path = require('path')
const url = require('url')
const fs = require('fs')
const utf8 = require('utf8');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let folderpath
let htmlStr
let jsHtml
let bgImgUrl
// let downloadpath
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600,resizable:true})
  ipcMain.on('download', (evt, args) => {
      // var arr = args.split("+");
      // downloadpath = arr[0];
      folderpath = args[0];
      htmlStr = args[1];
      jsHtml = args[2];
      bgImgUrl = args[3];
      evt.sender.send('tips','html.html');  
      console.log('can do this 1?')    
      //mainWindow.webContents.downloadURL(downloadpath);
      console.log(folderpath);
      //创建目录
      fs.mkdir(folderpath+'/html',function(err){
        if (err) {
            return console.error(err);
        }else{
          fs.mkdir(folderpath+'/html/css',function(err){
            if (err) {
                return console.error(err);
            }else{
              //创建css
              let mineCss='';
              //生成main.css
              fs.open(folderpath+'/html/css/main.css','w+',function(err, fd) {
                if (err) {
                    return console.error(err);
                }
                console.log("buildFile success !");
              });
              //获取Christmas.css内容
              fs.readFile('./assets/css/Christmas.css', function (err, data) {
                if (err) {
                    return console.error(err);
                }else{
                  mineCss=data.toString();
                  //main.css 内容改写
                  fs.writeFile(folderpath+'/html/css/main.css',mineCss,function(err, fd) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('writeFile success!')
                  })
                }
              });
              //生成
              fs.open(folderpath+'/html/css/idangerous.swiper2.7.6.css','w+',function(err, fd) {
                if (err) {
                    return console.error(err);
                }
                console.log("buildFile success !");
              });
              //获取Christmas.css内容
              fs.readFile('./assets/css/idangerous.swiper2.7.6.css', function (err, data) {
                if (err) {
                    return console.error(err);
                }else{
                  mineCss=data.toString();
                  //main.css 内容改写
                  fs.writeFile(folderpath+'/html/css/idangerous.swiper2.7.6.css',mineCss,function(err, fd) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('writeFile success!')
                  })
                }
              });
            }
          });
          fs.mkdir(folderpath+'/html/js/',function(err){
            if (err) {
                return console.error(err);
            }else{
              fs.open(folderpath+'/html/js/main.js','w+',function(err, fd) {
                if (err) {
                    return console.error(err);
                }else{
                  fs.writeFile(folderpath+'/html/js/main.js',jsHtml,function(err, fd) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('writeFile success!')
                  })
                }
              })
              //复制jq和swiper
              let jsStr='';
              fs.readdir("./assets/js/",function(err, files){
                  if (err) {
                      return console.error(err);
                  }
                  files.forEach( function (file){
                    fs.readFile('./assets/js/'+file, function (err, data) {
                      if (err) {
                          return console.error(err);
                      }else{
                        fs.open(folderpath+'/html/js/'+file,'w+',function(err, fd) {
                          if (err) {
                              return console.error(err);
                          }
                          console.log("buildFile success !");
                        });
                        jsStr=data.toString();
                        //main.css 内容改写
                        fs.writeFile(folderpath+'/html/js/'+file,jsStr,function(err, fd) {
                          if (err) {
                              return console.error(err);
                          }
                          console.log('writeFile success!')
                        })
                      }
                    });
                  });
              });
            }
          });
          fs.mkdir(folderpath+'/html/imgs/',function(err){
            if (err) {
                return console.error(err);
            }else{
              let imgStr='';
              
              fs.readdir("./assets/imgs/",function(err, files){
                  if (err) {
                      return console.error(err);
                  }
                  files.forEach( function (file){
                    fs.readFile('./assets/imgs/'+file, function (err, data) {
                      if (err) {
                          return console.error(err);
                      }else{
                        console.log(Buffer.isBuffer(data));
                        fs.createWriteStream(folderpath+'/html/imgs/'+file);
                        imgStr=data.toString("base64");
                        // 内容改写
                        let decodeImg = new Buffer(imgStr,"base64")
                        fs.writeFile(folderpath+'/html/imgs/'+file,decodeImg,function(err, fd) {
                          if (err) {
                              return console.error(err);
                          }
                          console.log('writeFile success!')
                        })
                      }
                    });
                  });
              });
              fs.readdir("./assets/imgs/",function(err, files){
                if (err) {
                    return console.error(err);
                }else{
                  fs.readFile(bgImgUrl, function (err, data) {
                    if (err) {
                        return console.error(err);
                    }else{
                      var gs=bgImgUrl.split('.');
                      console.log(Buffer.isBuffer(data));
                      fs.createWriteStream(folderpath+'/html/imgs/bgImg.'+gs[1]);
                      imgStr=data.toString("base64");
                      // 内容改写
                      let decodeImg = new Buffer(imgStr,"base64")
                      fs.writeFile(folderpath+'/html/imgs/bgImg.'+gs[1],decodeImg,function(err, fd) {
                        if (err) {
                            return console.error(err);
                        }
                        //创建html
                        fs.open(folderpath+'/html/html.html','w+',function(err, fd) {
                          if (err) {
                              return console.error(err);
                          }
                          console.log("buildFile success !");
                          fs.readFile('./html.html', function (err, data) {
                              if (err) {
                                  return console.error(err);
                              }else{
                                var htmlArr=data.toString().split('<div>');
                                var html=htmlArr[0]+'<div>'+htmlStr+htmlArr[1];
                                html.replace('imgs/bgImg.jpg','imgs/bgImg.'+gs[1]);
                                fs.writeFile(folderpath+'/html/html.html',html,function(err, fd) {
                                  if (err) {
                                      return console.error(err);
                                  }
                                  console.log('writeFile success!')
                                })
                              }
                          }); 
                        });

                      })
                    }
                  });
                }
              })
            }
          });
          
        }
      });
  });
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    // Set the save path, making Electron not to prompt a save dialog.
    console.log('can do this2?')
    console.log(`${item.getFilename()}`);
    item.setSavePath(folderpath+`\\${item.getFilename()}`);
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  //控制台
  mainWindow.webContents.openDevTools()
  
  mainWindow.on('closed', function () {
    mainWindow = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

