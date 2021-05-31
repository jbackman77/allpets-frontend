import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class favouritePetmindersView {
  init(){
    document.title = 'Favourite Petminders'    
    this.favouritePetminders = null
    this.render()    
    Utils.pageIntroAnim()
    this.getFavPetminders()
  }

  async getFavPetminders(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favPetminders = currentUser.favouritePetminders
      console.log(this.favPetminders)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Favourite Petminders" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">    

        <h1>Favourite Petminders</h1>

        <div class="haircuts-grid">
        ${this.favPetminders == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favPetminders.map(petminder => html`
            <va-haircut class="haircut-card"
              id="${petminder._id}"
              name="${petminder.name}"
              description="${petminder.description}"
              user="${JSON.stringify(petminder.user)}"
              image="${petminder.image}"
              animal="${petminder.animal}"
              contact="${petminder.contact}"
            >        
            </va-haircut>

          `)}
        `}
        </div> 
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new favouritePetmindersView()