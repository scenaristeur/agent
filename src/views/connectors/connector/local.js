import { Base } from "./base.js"
import store from '@/store'

export { LocalConnector }

class LocalConnector extends Base {

  constructor(options = {}) {
    super(options)
    options['type'] == undefined ? this['type'] = "LocalConnector": ""
  }
  async upload (file, cb){
    const fileReader = new FileReader()

    await fileReader.addEventListener('load', () => {
      cb(fileReader.result)
    })
    fileReader.readAsText(file, "UTF-8")
    // console.log(result)
    // return result
  }
  async upload1(files){
    for (var i = 0; i < files.length; i++) {
      let f = files[i]
      let filename = f.name
      var extension = f.name.split('.').pop();
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        var result = fileReader.result;
        console.log(typeof result, result);
        switch (extension) {
          case 'json':
          var data = JSON.parse(result)
          console.log(data)
          if(data.nodes != undefined){
            console.log(data)
            store.commit('soukai/setNeurones', data.nodes)
            // store.commit ('graph3D/addNodes', data.nodes)
            // store.commit('graph3D/setNeurones', data.nodes)
            // store.commit('graph3D/addNodes', data.nodes)
            // store.commit('graph3D/addLinks', data.links)
          }
          break;
          default:
          alert("your file must be a .json file", filename)

        }
        // let result = {name: filename, result: fileReader.result}
        // console.log(result)
      })
      fileReader.readAsText(f)
    }
  }

  downloadFile(data){
    var contenu = JSON.stringify(data.content, null, 2) //`{"test": "json" }` //this.content
    console.log("todo: poser la question compresser",contenu)
    var format = data.format || "json" //this.format;
    //  console.log(contenu, format)
    var contentType = "";
    var fileNameToSaveAs = ""
    let suggested = "Brain_"+Date.now()
    var filename = prompt("Choose a name for the exported file :", suggested);
    if (filename == null || filename == "") {
      return;
    }

    switch (format) {
      case 'json':
      contentType = 'application/json';
      fileNameToSaveAs = filename + ".json"; //Date.now() +
      break;
      case 'ttl':
      contentType = 'text/turtle';
      fileNameToSaveAs = filename + ".ttl"; //Date.now() +
      break;
      case 'jsonld':
      contentType = 'application/ld+json';
      fileNameToSaveAs = filename + ".jsonld"; //Date.now() +
      break;
      default:
      alert('Format de fichier non reconnu', format);
    }
    var textFileAsBlob = new Blob([contenu], { type: contentType }
    );
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if(navigator.userAgent.indexOf("Chrome") != -1) {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.target="_blank";
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click", true, false, window, 0, 0, 0, 0, 0
      , false, false, false, false, 0, null
    );
    downloadLink.dispatchEvent(event);
    setTimeout(function(){
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadLink);
    }, 1000);
  }
}
