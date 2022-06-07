import { FieldType, /*Model*/ } from "soukai";
import { SolidModel } from "soukai-solid";

export class UserSolid extends SolidModel {
  static rdfContexts = {
    foaf: "http://xmlns.com/foaf/0.1/",
    vcard: "http://www.w3.org/2006/vcard/ns#"
  };
  static rdfsClasses = ["foaf:Person"];
  static fields = {
    name: {
      type: FieldType.String,
      //rdfProperty: "vcard:fn"
      rdfProperty: "foaf:name"
    }
  };

  // postsRelationship() {
  //   return this.hasMany(Post, "authorId").onDelete("cascade");
  // }
}
