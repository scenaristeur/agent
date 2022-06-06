import { Model, FieldType} from 'soukai';
import { User } from './User.js'


export { Basic }
class Basic extends Model {

  static fields = {
    name: FieldType.String,

    other: {
      type: FieldType.Array,
      items: FieldType.String,
    },

  };
  authorRelationship() {
      return this.belongsToOne(User, 'authorId');
  }

}
