// import { FieldType, /*Relation, SingleModelRelation*/ } from 'soukai';

import { SolidModel } from 'soukai-solid';

//import Group from '@/models/Group';

export default class Person extends SolidModel {

  //   static timestamps = ['createdAt'];
  //
  // static rdfContexts = {
  //       'foaf': 'http://xmlns.com/foaf/0.1/',
  //   };
  //
  //   static rdfsClasses = ['foaf:Person'];
  //
  //    static fields = {
  //       name: FieldType.String,
  //       lastName: FieldType.String,
  //       friendUrls: {
  //           type: FieldType.Array,
  //           rdfProperty: 'foaf:knows',
  //           items: { type: FieldType.Key },
  //       },
  //   };
  //
  //    friendsRelationship() {
  //       return this.belongsToMany(Person, 'friendUrls');
  //   }
  //
  //   //  groupRelationship() {
  //   //     return this.isContainedBy(Group);
  //   // }

}
