# agent
3d mindmap on your Solid Pod

# creation d'un triplet
- La création d'un triplet s'effectue par la saisie de trois mots suivis par un signe de ponctuation qui peut être une virgule, un point-virgule, un point ou un tiret.
par exemple : 

`chat mange souris.`

Un triplet est un groupe de trois mots ou groupes de mots. Le premier représente *le sujet*, le second est *le prédicat* ou *la propriété*, et le troisième est *l'objet*. 

Si vous souhaitez utiliser plusieurs mot il faut entourer chaque terme du triplet par des guillements ou doubles-quotes, comme par exemple : 

`"Le gentil petit chat" "taquine amoureusement" "la souris verte".`

N'oubliez pas le signe de ponctuation à la fin de votre triplet, cela peut être un point, un point-virgule, une virgule ou un tiret : 
- le point créé le triplet et efface la ligne.
- le point virgule créé le triplet et garde le sujet pour le prochain triplet
- la virgule créé le triplet et garde le sujet et le prédicat
- le tiret créé le triplet et place l'objet à la place du sujet. Ceci permet d'enchaîner les triplets.





# specials predicates
- indiquer le point de départ d'un graphe
`sujet .fonction start.`
- contenu textuel d'un noeud
`sujet .texte "Bla bla bla".`






# mon cv 
- https://scenaristeur.github.io/agent/?source=https://spoggy-test2.solidcommunity.net/public/brains/cv3/
- http://127.0.0.1:8080/?source=https://spoggy-test2.solidcommunity.net/public/brains/cv3/ (local test)


# use nodejs16
- nvm use 16

# Todo
- [ ] ouvrir la navbar vers le haut en mobile et la mettre en bas




[![3D mindmap Demo](https://www.youtube.com/watch?v=YT61BcjGfwc/0.jpg)](https://www.youtube.com/watch?v=YT61BcjGfwc "3D mindmap on your Solid Pod")



# Tips
- ajouter la fonction "start" à un noeud 
`mon_noeud .fonction start,`
- ajouter un brain externe :  Utiliser le "+" et "external source"/"external brain"




# IPFS pinning  services
https://docs.ipfs.io/concepts/persistence/#pinning-services
Axel https://www.axel.org/2019/07/23/qa-with-the-developers-of-axel-ipfs/
Eternum https://www.eternum.io/
Infura 5GB free https://infura.io/pricing
Pinata 1GB https://www.pinata.cloud/
Temporal 3GB free https://temporal.cloud/dev/
Crust Network https://crust.network/

- editorjs collaborative https://noter.sambitsahoo.com/









## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Compiles, minifies for production, and commit
```
npm run git -- "external source"

```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## vue snippet
- https://atom.io/packages/vue-atom-snippets

`vbase tab`

# todo
upload button

https://codepen.io/adambene/pen/xRWrXN

# voir 3js
- (three + vue3 +vite https://troisjs.github.io/examples/materials/1.html)

# Solid Community server
- https://www.npmjs.com/package/@solid/community-server
```docker run --rm -v ~/Solid:/data -p 3000:3000 -it solidproject/community-server:latest```

# terminal
- https://github.com/dongsuo/vue-terminal
- autocomplete & history https://github.com/ndabAP/vue-command https://vuejsexamples.com/a-fully-working-vue-js-terminal-emulator/

- https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/

# ipfs / ipld
- https://blog.ceramic.network/how-to-store-signed-and-encrypted-data-on-ipfs/
- https://ipfs.io/ipfs/QmQmAh8R6xvu7cXrTXaxs28dqhJC6viDD6sBAFtt9aEDCP/_site/

# graphology js
- https://graphology.github.io/

# gun visualgraph
- https://github.com/dletta/visualgraph/
- gun graphin https://github.com/lmangani/gun-graphin/blob/99cd85c5eec001f2f4f37713132728f2f14caf60/README.md
# awesome gun
- https://github.com/ash0080/gun.doc.cn/blob/839b787466feac52e99d5b7b0147f9c71c97d5d6/Awesome-GUN.md

# solid providers
- https://ewingson.solidcommunity.net/public/ttl/pod-provider.ttl
- https://www.podsbeta.de/