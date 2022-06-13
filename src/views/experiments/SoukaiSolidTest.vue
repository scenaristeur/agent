<template>
  <div>
    Solid Soukai

    person : {{ person}}
    <hr>
    persons : {{persons}}
    <hr>
  </div>
</template>

<script>
// exemples https://codesandbox.io/examples/package/soukai-solid
import SoukaiSolid, { SolidEngine, SolidModel } from 'soukai-solid';
import {Soukai , FieldType } from 'soukai';
import * as sc from '@inrupt/solid-client-authn-browser'
import { v4 as uuidv4 } from 'uuid';

import {UserSolid} from '@/models/UserSolid'

class Person extends SolidModel {

  static rdfsClasses = ['http://xmlns.com/foaf/0.1/Person'];

  static fields = {
    name: {
      type: FieldType.String,
      rdfProperty: 'http://xmlns.com/foaf/0.1/name',
    },
  };
}

SoukaiSolid.loadSolidModels();
Soukai.loadModels({ Person , UserSolid});

// If you want to make authenticated requests, you should use the fetch method from an authentication library.
Soukai.useEngine(new SolidEngine(sc.fetch.bind(window)));

export default {
  name: "SoukaiSolidTest",
  data(){
    return{
      person : null,
      persons: null
    }
  },
  mounted(){
    this.test1()
  },
  methods:{
    async test1(){
      if (this.pod != null){
        //  Soukai.useEngine(new SolidEngine(window.fetch.bind(window)));
        // You would normally get the url dynamically, we're hard-coding it here as an example.

let webId = "https://pod.inrupt.com/andriesvh/profile/card#me"
// issue with solid.community https://github.com/NoelDeMartin/soukai-solid/issues/14
// let webId = this.pod.webId
console.log(webId)
const userPod = await UserSolid.from(webId).all();
let up = await userPod.map((u) => u.getAttributes());
console.log(up)
//const us = userPod.getAttributes();
console.log("user pod", up)




        const containerUrl = "https://spoggy-test2.solidcommunity.net/public/soukai-test/"


        // Get persons from the container.
        let persons =  await Person.from(containerUrl).all();
        //this.persons = await JSON.parse(`${persons}`)
        // const print = await persons.map((u) => u.getAttributes());
        // console.log(print)
        this.persons = await persons.map((u) => u.getAttributes());
        // let persons_en_string = JSON.stringify(print);
        // console.log("persons", persons_en_string)



        let p = { name: 'John Doe' ,  url: containerUrl+uuidv4()+'#it',}
        let person = await Person.at('https://spoggy-test2.solidcommunity.net/public/soukai-test/').create(p);
        //this.person = await JSON.parse(`${person}`)
        console.log("person", await person)




// exemple https://codesandbox.io/s/u4zh2?file=/src/index.ts:437-899
        // const database = new InMemoryEngine();
        //
        // const wrappedFetch = fetchWrap(fetch, [
        //   function middleware1(url, options, innerFetch) {
        //     // this middleware does nothing
        //     return innerFetch(url, options);
        //   }
        // ]);
        //
        // const solid = new SolidEngine(wrappedFetch);
        // Soukai.useEngine(solid);
        //
        // const run = async () => {
        //   const users = await User.from(webid).all();
        //   const print = users.map((u) => u.getAttributes());
        //
        //   root.innerHTML = JSON.stringify(print);
        // };
        //
        // run();

      }
    }
  },
  watch:{
    pod(){
      this.test1()
    }
  },
  computed: {
    pod() {
      return this.$store.state.solid.pod
    },
  }
}
</script>

<style>

</style>
