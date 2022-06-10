import { FieldType} from 'soukai';
import { Basic } from './Basic.js'
// import { User } from './User.js'

export { Synapse }
class Synapse extends Basic {
  static fields = {
      authorId: FieldType.Key,
  };

  async initialize(attributes, exists) {
      super.initialize(attributes, exists);

      console.log('this is fine', this.getAttribute('title'));

      await this.loadRelation('author');

      console.log('this is also fine', this.getRelationModels('author'));
  }

}
