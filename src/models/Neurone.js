// import { FieldType} from 'soukai';
import { Basic } from './Basic.js'
export { Neurone }
class Neurone extends Basic {
  constructor(options = {}) {
    super(options)
   // options.type == undefined ? this.type = "brain": ""
   // options.nodes = []
   // options.links = []
    // console.log('factice brain hihihi')
  }

  // createNeurone(options = {}){
  //   console.log("create", options)
  //   let neurone = new Neurone(options)
  //   return neurone
  // }
}
