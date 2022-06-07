
//import SolidContainerModel from '@/models/SolidContainerModel';
import { /*SolidModel,*/ SolidContainerModel, SolidContainsRelation } from 'soukai-solid';
// import SolidContainsRelation from 'soukai-solid/relations/SolidContainsRelation.ts';

import { FieldType/*, MultiModelRelation*/} from 'soukai';



import Person from '@/models/Person';

export default class Group extends SolidContainerModel {

     static timestamps = false;

     static rdfContexts = {
        'foaf': 'http://xmlns.com/foaf/0.1/',
    };

     static rdfsClasses = ['foaf:Group'];

     static fields = {
        name: FieldType.String,
    };

    members =[];
    relatedMembers = SolidContainsRelation();

     membersRelationship() {
        return this.contains(Person);
    }

}
