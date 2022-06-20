<template>
  <div> Ipfs connector

ipfs node : {{ ipfsNode}}

    <b-button  size="sm"  @click.stop="share()">
      <b-icon-share @click.stop="share()"  ></b-icon-share>
    </b-button>
      <b-button v-if="ipfsNode!= null">Ipfs ready</b-button>
    <b-button v-else variant="light" disable size="sm">Connecting to ipfs..</b-button>


    <div v-if="graph_cid == null">
    Saving on ipfs .... Pending
  </div>
  <div v-else>
    <b-button @click="saveNodesToIpfs" :disabled="ipfsNode == null ? true : false">to IPFS</b-button>
    ipfs_cids:




    <div v-if="ipfs_cids.length > 0" >
      <b-button  @click="save_cids">Save Cids</b-button>
    </div>
    <ul>
      <li v-for="c of ipfs_cids" :key="c.cid">
        <a :href="'https://ipfs.io/ipfs/'+c.cid" target="_blank">{{c.name}}</a>
      </li>
    </ul>
    {{ipfs_cids}}
    <hr>
    ipfsNode : {{ipfsNode}}


  <a :href="'https://ipfs.io/ipfs/'+graph_cid.path" target="_blank">{{graph_cid.path}}</a>
  <b-input v-model="pinning_name" placeholder="Name"/>
  <b-button @click="pinIt">Pin it</b-button>

  <div id="pinConfig">
    <h3>Pinata Pinning service Pinata</h3>
    <a href="https://app.pinata.cloud/keys" target="_blank">Get your keys</a>
    <b-input v-model="pinning_service.endpoint" placeholder="endpoint"/>
    <b-input v-model="pinning_service.api_key" placeholder="api_key"/>
    <b-input v-model="pinning_service.secret_api_key" placeholder="secret_api_key"/>
    <b-input v-model="pinning_service.token" placeholder="or token (todo)"/>
    <i><small><a href="https://docs.ipfs.io/how-to/work-with-pinning-services/#use-an-existing-pinning-service">What is a pinning service</a>
    </small></i>
    <b-button @click="connectPinningService">Connect Pinning Service</b-button>

  </div>

</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "IpfsConnector",
  data(){
    return {
      pinning_service: {
        endpoint: "https://api.pinata.cloud",
        api_key: "",
        secret_api_key: ""
      },
      pinning_name : ""
    }
  },
  created(){
    this.$initIpfs()
  },
  methods:{
    async connectPinningService(){
      console.log(this.pinning_service)
      this.pinstatus =  await this.testAuthentication(this.pinning_service.api_key, this.pinning_service.secret_api_key)
      console.log(this.pinstatus)
    },


    async pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, JSONBody) {
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey
        }
      })
      .then(function (response) {
        console.log(response)
        //handle response here
      })
      .catch(function (error) {
        console.log(error)
        //handle error here
      });
    },


    async pinIt1(){
      // inspiration https://github.com/PinataCloud/Pinata-SDK/blob/master/src/commands/pinning/pinByHash.js
      // inspiration https://medium.com/pinata/how-to-pin-to-ipfs-effortlessly-ba3437b33885
      console.log("pin system")
      //const goodHashToPin = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';
      //const goodHashToPin = 'QmS5YAGt5JqShopcY5tE7Lep6xwALmhmqkcBkdHYGw8ubn'
      let options = {pinataOptions: {}}
      options.pinataOptions.name = this.pinning_name || Date.now()

      let result = await this.pinByHash(this.pinning_service.api_key,
        this.pinning_service.secret_api_key,
        this.graph_cid.path, options)
        console.log("result", result)

      },

      async pinIt(){
        let JSONBody  = {
          pinataMetadata: {
            name: 'ItemStatus',
            keyvalues: {
              ItemID: 'Item001',
              CheckpointID: 'Checkpoint002',
              Source: 'CompanyA',
              WeightInKilos: 5.25
            }
          },
          pinataContent: this.nodes
          // {
          //   itemName: 'exampleItemName',
          //   inspectedBy: 'Inspector001',
          //   dataValues: [
          //     {...}
          //   ]
          // }

        }

        JSONBody.pinataMetadata.name = this.pinning_name || Date.now()

        let result = await this.pinJSONToIPFS(this.pinning_service.api_key,
          this.pinning_service.secret_api_key, JSONBody)
          console.log(result)
        },


        async pinByHash(pinataApiKey, pinataSecretApiKey, hashToPin, options) {
          //validateApiKeys(pinataApiKey, pinataSecretApiKey);
          const endpoint = this.pinning_service.endpoint+'/pinning/pinByHash';
          // if (!hashToPin) {
          //   throw new Error('hashToPin value is required for pinning by hash');
          // }
          // if (!isIPFS.cid(hashToPin)) {
          //   throw new Error('hashToPin value is an invalid IPFS CID');
          // }
          let app = this

          //const endpoint = `${baseUrl}/pinning/pinByHash`;
          const body = {
            hashToPin: hashToPin,
            pinataOptions: {}
          };

          console.log(body)
          if (options) {
            if (options.pinataOptions) {
              body.pinataOptions = options.pinataOptions;
            }
            if (options.pinataMetadata) {
              //  validateMetadata(options.pinataMetadata);
              body.pinataMetadata = options.pinataMetadata;
            }
          }

          return new Promise((resolve, reject) => {
            axios.post(
              endpoint,
              body,
              {
                withCredentials: true,
                headers: {
                  'pinata_api_key': pinataApiKey,
                  'pinata_secret_api_key': pinataSecretApiKey
                }
              }).then(function (result) {
                if (result.status !== 200) {
                  reject(new Error(`unknown server response while adding to pin queue: ${result}`));
                }
                resolve(result.data);
              }).catch(function (error) {
                const formattedError = app.handleError(error);
                reject(formattedError);
              });
            });
          },


          testAuthentication(pinataApiKey, pinataSecretApiKey) {
            //validateApiKeys(pinataApiKey, pinataSecretApiKey);
            let app = this
            //  test authentication to make sure that the user's provided keys are legit

            const endpoint = this.pinning_service.endpoint+'/data/testAuthentication'

            return new Promise((resolve, reject) => {
              axios.get(
                endpoint,
                {
                  withCredentials: true,
                  headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                  }
                }).then(function (result) {
                  if (result.status !== 200) {
                    reject(new Error(`unknown server response while authenticating: ${result}`));
                  }
                  resolve({
                    authenticated: true
                  });
                }).catch(function (error) {
                  const formattedError = app.handleError(error);
                  reject(formattedError);
                });
              });
            },
            handleError(error){
              if (error && error.response && error.response && error.response.data && error.response.data.error) {
                return error.response.data.error;
              } else if (error.data && error.data.error) {
                return error.data.error;
              } else if (error.response && error.response.error) {
                return error.response.error;
              }
              return error;
            },
            async share(){
              this.$store.commit('core/setGraphCid', null)
              await this.$saveBrainToIpfs()
              // if (this.it.url == undefined && this.$route.query.url != undefined ){
              //   this.it.url = this.$route.query.url
              //   this.it.name = 'agent'
              //   console.log(this.it)
              // }
              //let short = await
              // fetch("https://link.infini.fr/a", {
              //   method: "POST",
              //   body: new URLSearchParams({
              //     "lsturl": "https://scenaristeur.github.io/ipgs", //?url="+this.item.url,
              //     "lsturl-custom":  "hello",
              //     "format": 'json'
              //   }),
              //   mode: 'no-cors',
              // })
              // .then(response => {
              // //  console.log(response)
              //   response.json()
              // })
              // .then(data => {
              //   console.log(data)
              // })
              // .catch(console.error);
              //  let rep = JSON.parse(`${short}`)
              //  //  let json = rep.json()
              // console.log(rep)
              // .then(response => {
              // return
              //   // response.json()
              // })
              //  .then(json => {
              //     console.log(json)
              // })
              // .then(json => {
              //   console.log(json)
              //  this.sharing.url = this.it.url != undefined ? 'https://scenaristeur.github.io/agent/?url='+this.it.url : "https://scenaristeur.github.io/agent"

              //  this.sharing.title = 'IPGS',
              //  text: 'Check out this IPGS graph.',
              //  url: 'https://scenaristeur.github.io/ipgs/?url='+this.url,
              this.$bvModal.show("share-modal"+this.it.url)
              //
              // })
            },
            save_cids(){
              console.log(this.ipfs_cids)
              this.download(JSON.stringify(this.ipfs_cids), 'ipfs_cids_'+Date.now()+'.json', 'application/json');
            },
            download(content, fileName, contentType) {
              var a = document.createElement("a");
              var file = new Blob([content], {type: contentType});
              a.href = URL.createObjectURL(file);
              a.download = fileName;
              a.click();
            },
            saveNodesToIpfs(){
              console.log("save")
              this.$saveNodesToIpfs()
            },
          },
          watch:{
            graph_cid(){
              if (this.graph_cid != null){
                this.sharing.url = 'https://scenaristeur.github.io/agent?cid='+this.graph_cid.path


                this.sharing.description = 'video demo youtube : https://youtu.be/YT61BcjGfwc\n'

                this.sharing.description += '\n\nFrançais:\nVous pouvez visualiser mon Inter Planetary Graph à cette adresse'
                this.sharing.description +=' (soyez patient, la connexion à ipfs peut prendre quelques dizaines de secondes) :\n'
                this.sharing.description +='https://scenaristeur.github.io/agent?cid='+this.graph_cid.path
                this.sharing.description += '\nles données sont stockées sur Ipfs :\n https://ipfs.io/ipfs/'+this.graph_cid.path
                this.sharing.description += "\nContact, infos and recevoir les mises à jour : scenaristeur@gmail.com"


                this.sharing.description += '\n\nEnglish:\nCheck out this Inter Planetary Graph  (could take 30s , be patient):\n'+'https://scenaristeur.github.io/agent?cid='+this.graph_cid.path
                this.sharing.description += '\n data on Ipfs :\n https://ipfs.io/ipfs/'+this.graph_cid.path
                this.sharing.description += "\nContact, infos and receive updates : scenaristeur@gmail.com"


                this.sharing.description += '\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/YT61BcjGfwc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
              }
            }
          },
          computed: {
            ipfsNode() {
              return this.$store.state.core.ipfsNode
            },
            ipfs_cids() {
              return this.$store.state.core.ipfs_cids
            },
            graph_cid() {
              return this.$store.state.core.graph_cid
            },
            nodes() {
              return this.$store.state.core.nodes
            }
          }
        }
        </script>

        <style>

        </style>
