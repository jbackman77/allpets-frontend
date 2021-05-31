import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-allpets', class Allpets extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      }, 
      name: {
        type: String
      },  
      description: {
        type: String
      },  
      user: {
        type: Object
      },  
      image: {
        type: String
      },
      animal: {
        type: String
      },
      contact: {
        type: String
      }     
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    //create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    
    //add className
    dialogEl.className = 'petminders-dialog'
    
    //sl-dialog content 
    const dialogContent = html `
    <style>
  .wrap {
    display: flex;
  }
  .image {
    width: 50%;
  }
  .image img {
    width: 100%;
  }
  .content {
    padding-left: 1em;
  }
  .animal {
    font-weight: bold;
  }
</style>
<div class="wrap">
  <div class="image">
    <img src="${App.apiBase}/images/${this.image}" alt="${this.image}"/>
  </div>
  <div class="content">
    <h1>${this.name}</h1>
    <p>${this.description}</p>
    <p class="animal">$${this.animal}</p>
    

    <sl-button @click=${this.addFavHandler.bind(this)}>
      <sl-icon slot="prefix" name="heart-fill"></sl-icon>
      Add to Favourites
    </sl-button>
  </div>
</div>
    `
    render(dialogContent,dialogEl)

    //appent to document.body
    document.body.append(dialogEl)

    //show sl-dialog
    dialogEl.show()

    //on hide delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
      dialogEl.remove()
    })
  }
  async addFavHandler(){    
    try {
      UserAPI.addFavPetminder(this.id)
      Toast.show('Petminder added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  
  render(){    
    return html`
    <style>
     
    </style>

    <sl-card>
  <img slot="image" src="${App.apiBase}/images/${this.image}"/> 
  <h2>${this.name}</h2>
  <p class="author">${this.user.firstName} ${this.user.lastName}</p>
  <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
  <sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>

</sl-card>

    `
  }
  
})