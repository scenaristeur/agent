//console.log("Neurone Factory")
import { Base } from "./base.js"
//import { Neurone } from "./neurone.js"



export { Brain }
class Brain extends Base {
  constructor(options = {}) {
    super(options)
   options.type == undefined ? this.type = "brain": ""
   options.nodes = []
   options.links = []
    // console.log('factice brain hihihi')
  }

  // createNeurone(options = {}){
  //   console.log("create", options)
  //   let neurone = new Neurone(options)
  //   return neurone
  // }
}
