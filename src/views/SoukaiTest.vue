<template>
  <div>
    Soukai<br>
    users: {{ users }}
    <hr>
    brains : {{ brains }}
  </div>
</template>

<script>

import Soukai, { IndexedDBEngine } from 'soukai';
// class User extends Model {}
import {User} from '@/models/User'
import {Neurone} from '@/models/Neurone'
import {Brain} from '@/models/Brain'
import {Synapse} from '@/models/Synapse'

Soukai.loadModels({ User, Neurone, Synapse, Brain });
Soukai.useEngine(new IndexedDBEngine("smag0"));

// With Logs
// import Soukai, { Model, LogEngine, InMemoryEngine } from 'soukai';
//
// class User extends Model {}
//
// const engine = new InMemoryEngine();
//
// Soukai.loadModel('User', User);
// Soukai.useEngine(new LogEngine(engine));



export default {
  name: "SoukaiTest",
  data(){
    return {
      brains: [],
      users: []
    }
  },
  created(){
    User.create(
      { name: 'John',
      surname: 'Doe',
      birthDate: new Date(),
      interests : ["Solid", "dev"],
      contact : {email: "jhgj@ku.juyg", phone: "01234567890"},
      blop: "youhou"
    })
    .then(() => User.all())
    .then(models => models.map(model => model.getAttributes()))
    .then(users => {
      console.log('user models', users)
      this.users = users
    });

    Brain.create({ name: 'RAndom', surname: 'Name' })
    .then(() => Brain.all())
    .then(models => models.map(model => model.getAttributes()))
    .then(brains => {
      console.log('brain models', brains)
      this.brains = brains
    });

  }
}
</script>

<style scoped>

</style>
