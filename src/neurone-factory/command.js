
import { Base } from "./base.js"

export { Command }

class Command extends Base {
  constructor(options = {}) {
    super(options)
    options['type'] == undefined ? this['type'] = "command": ""
    // this.options = options

    // this._data = Object.assign({}, modele)
    // this["ve:created"] = Date.now()
    // this.id = uuidv4()
    //console.log(this)
    // ...
    this.init(options.inputValue)
  }
  init(iv){
    // si commence par http --> type = url
  if (this.isValidUrl(iv)){
    this.type = "url";
    this.value = iv;
    this.isFile = this.isFile(iv)
  }else{
    // selon le premier charactère, on detecte une commande
    let firstChar = iv.charAt(0);
    let last =""
    switch(firstChar){
      case '/':
      //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(message))
      //  this.catchCommande(message,this.network,this);

      this.type = "commande";
      this.value = iv;
      this.inputNew = "";
      //this.catchCommande(this)
      break;

      case '.':
      last = this.commandHistory[this.commandHistory.length-1];
      this.inputNew = last.s+" "+last.p+" "+last.o;
      break;

      case ';':
      last = this.commandHistory[this.commandHistory.length-1];
      this.inputNew = last.s+" "+last.p+" ";
      break;

      case ',':
      last = this.commandHistory[this.commandHistory.length-1];
      this.inputNew = last.s+" ";
      break;


      default:
      // si le premier charactère n'indique pas une commande, on traite comme un triplet
      this.traiteTriplet(iv);
    //  this.catchTriplet()
    }
  }

  //si termine par virgule, point, point-virgule, tiret --> triplet

  return this;
  }

  traiteTriplet(message){
  var result = {}
  var inputNew = "";
  let lastChar = message.slice(-1);
  let messageCut = message.slice(0,-1).split(" ");
  let isTriplet = true;
  //  console.log(messageCut);

  let detectLiteral = "";
  let messageCutTemp = [];
  messageCut.forEach(function(part){
    part = part.trim();
    //  console.log(part);
    if (part.startsWith('"')){
      detectLiteral ="debut";
      //  console.log(detectLiteral);
      messageCutTemp.push(part.substr(1));
    }else if (part.endsWith('"')){
      detectLiteral = "fin";
      //console.log(detectLiteral);
      messageCutTemp.push(messageCutTemp.pop()+" "+part.slice(0,-1));
    }else if (detectLiteral == "debut"){
      //  console.log("recupere le dernier et lui ajoute part" )
      messageCutTemp.push(messageCutTemp.pop()+" "+part)
    }else {
      messageCutTemp.push(part);
    }
  });
  if (messageCutTemp.length > 0){
    messageCut = messageCutTemp;
  }
  switch(lastChar){
    case '.':
    inputNew = "";
    break;
    case ';':
    if (messageCut[0].indexOf(" ") > -1){
      inputNew = '"'+messageCut[0]+'"'+' ';
    }else{
      inputNew = messageCut[0]+' ';
    }
    break;
    case ',':
    if (messageCut[0].indexOf(" ") > -1){
      inputNew = '"'+messageCut[0]+'" ';
    }else{
      inputNew = messageCut[0]+' ';
    }
    if (messageCut[1].indexOf(" ") > -1){
      inputNew += '"'+messageCut[1]+'" ';
    }else{
      inputNew += messageCut[1]+' ';
    }
    break;
    case '-':
    if (messageCut[2].indexOf(" ") > -1){
      inputNew = '"'+messageCut[2]+'"'+' ';
    }else{
      inputNew = messageCut[2]+' ';
    }
    break;
    default:
    console.log("message to chat "+message)
    //this.sendMessage(message);
    //  this.agentInput.send('agentSocket', {type: "sendMessage", message:message});
    //  this.catchTriplet(message.slice(0,-1), this.network); // A REMPLACER PAR CATCHTRIPLETS V2
    inputNew = "";
    isTriplet = false;
  }
  if (isTriplet){
    //  console.log("est Triplet",messageCut)
    result.type = "triplet";
    var tripletvalue = {};
    tripletvalue.subject = messageCut[0];
    tripletvalue.predicate = messageCut[1];
    tripletvalue.object = messageCut[2];
    result.value = tripletvalue;
    result.inputNew = inputNew;
  }else {
    //  console.log("n'est pas triplet")
    result.type = "message";
    result.value = message;
    result.inputNew = inputNew;
  }
Object.assign(this, result);
//  return result;
}
  isValidUrl(string){
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  isFile(pathname) {
    return pathname.split('/').pop().indexOf('.') > -1;
  }
}
