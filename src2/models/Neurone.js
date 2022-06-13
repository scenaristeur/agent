import { Model, FieldType} from 'soukai';

export { Neurone }
class Neurone extends Model {

  static fields = {
    name: FieldType.String,

    other: {
      type: FieldType.Array,
      items: FieldType.String,
    },

  };
  // authorRelationship() {
  //     return this.belongsToOne(User, 'authorId');
  // }

}
