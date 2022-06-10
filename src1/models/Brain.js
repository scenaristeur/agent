import { FieldType} from 'soukai';
import { Basic } from './Basic.js'
//import { User } from './User.js'
export { Brain }
class Brain extends Basic {
  static fields = {
      authorId: FieldType.Key,
  };

  async initialize(attributes, exists) {
      super.initialize(attributes, exists);

      //console.log('this is fine', await this.getAttribute('name'));

    //  await this.loadRelation('author');

      //console.log('this is also fine', await this.getRelationModels('author'));
  }


}
