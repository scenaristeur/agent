<template>
  <div>
    Soukai<br>
    users: {{ users }}
    <hr>
    brains : {{ brains }}
    <hr>
    neurones : {{ neurones }}
  </div>
</template>

<script>

let engineType = "IndexedDBEngine" // InMemoryEngine
// import Soukai, { IndexedDBEngine } from 'soukai';
import Soukai, { IndexedDBEngine, LogEngine, InMemoryEngine } from 'soukai';
// class User extends Model {}
import {User} from '@/models/User'
import {Neurone} from '@/models/Neurone'
import {Brain} from '@/models/Brain'
import {Synapse} from '@/models/Synapse'


// Soukai.useEngine(new IndexedDBEngine("smag0"));

// With Logs
// import Soukai, { /*Model,*/ LogEngine, InMemoryEngine } from 'soukai';

// class User extends Model {}

let engine = null

if(engineType == "InMemoryEngine"){
  engine = new InMemoryEngine("smagMem");
}else{
  engine = new IndexedDBEngine("smag0")
}

Soukai.loadModels({ User, Neurone, Synapse, Brain });
Soukai.useEngine(new LogEngine(engine));



export default {
  name: "SoukaiTest",
  data(){
    return {
      brains: [],
      users: [],
      neurones: []
    }
  },
  async created(){
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

    const user = new User({
      //id: "eryty",
      name: 'Johnny',
      surname: 'Doux',
      birthDate: new Date(),
    });

    let savedUser = await user.save();

    console.log('User saved', savedUser);

    Brain.create({ name: 'RAndom', surname: 'Name', authorId : user.id })
    .then(() => Brain.all())
    .then(models => models.map(model => model.getAttributes()))
    .then(brains => {
      console.log('brain models', brains)
      this.brains = brains
    });






    const neurone = new Neurone({
      name: 'Neurone1',
      authorId : user.id
    });

    let savedNeurone = await neurone.save();

    console.log('Neurone saved', savedNeurone);

    const userOne = await User.find(user.id);

    console.log('User with id "eryty"', userOne);

    Neurone.all()
    .then(models => models.map(model => model.getAttributes()))
    .then(neurones => {
      console.log('neurone models', neurones)
      this.neurones = neurones
    });


  }
}
</script>

<style scoped>

</style>
