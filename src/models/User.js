import { FieldType} from 'soukai';
import { Basic } from './Basic.js'
import { Brain } from './Brain.js'
import { Neurone } from './Neurone.js'
import { Synapse } from './Synapse.js'

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

  brainsRelationship() {
    return this.hasMany(Brain, 'authorId');
  }

  neuroneRelationship() {
    return this.hasMany(Neurone, 'authorId');
  }

  synapseRelationship() {
    return this.hasMany(Synapse, 'authorId');
  }

}
