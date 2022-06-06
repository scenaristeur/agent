import { Model, FieldType} from 'soukai';
export { Basic }
class Basic extends Model {
  // constructor(options = {}) {
  //   super(options)
  //   // options.type == undefined ? this.type = "brain": ""
  //   // options.nodes = []
  //   // options.links = []
  //   // console.log('factice brain hihihi')
  // }

  static fields = {
    name: FieldType.String,

    other: {
      type: FieldType.Array,
      items: FieldType.String,
    },

  };

  // createNeurone(options = {}){
  //   console.log("create", options)
  //   let neurone = new Neurone(options)
  //   return neurone
  // }
}
