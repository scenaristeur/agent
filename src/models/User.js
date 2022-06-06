import { FieldType} from 'soukai';
import { Basic } from './Basic.js'

export { User }

class User extends Basic {
  static fields = Object.assign({}, Basic.fields,
    {
      name: FieldType.String,
      surname: FieldType.String,
      birthDate: FieldType.Date,
      interests: {
        type: FieldType.Array,
        items: FieldType.String,
      },
      contact: {
        phone: FieldType.String,
        email: FieldType.String,
      },
    }
  );
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
