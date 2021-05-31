import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import PetminderAPI from '../../PetminderAPI'
import Toast from '../../Toast'

class PetmindersView {
    async init(){
    document.title = 'Pet Minders'   
    this.petminders = null
    this.render()    
    Utils.pageIntroAnim()
    await this.getPetminders()
    //this.filterPetminders('animal', 'ld')
    
  }
  
  async filterPetminders(field, match){
    //validate
    if(!field || !match) return

    //get frsh copy of petminders
   this.petminders = await PetminderAPI.getPetminders()

    let filteredPetminders 

    //animal field
    if(field == 'animal'){
      filteredPetminders = this.petminders.filter(petminder => petminder.animal == match)
    }
    //render
      this.petminders = filteredPetminders
      this.render()
    
  }
  clearFiltersBtns(){
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.removeAttribute("type"))
  }

  handleFilterBtn(e){
    // clear all filter buttons active  
    this.clearFiltersBtns()

     //set button active (type=primary)
     e.target.setAttribute("type", "primary")
    //extract the field and match from button
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")


    //filter petminders
    this.filterPetminders(field, match)
  }

  clearFilters(){
    this.getPetminders()
    this.clearFilterBtns()
  }


  async getPetminders(){
    try{
      this.petminders = await PetminderAPI.getPetminders()
      console.log(this.petminders) 
      this.render()

   }catch(err){
      Toast.show(err, 'error')
    }
  }
  render(){
    const template = html`
    <style>
    .filter-menu {
      display:flex;
      align-items: center;
    }

    .filter-menu > div {
      margin-right: 1em;
    }
    </style>

    <va-app-header title="Pet Minders" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 

       
  

      <div class="petminders-grid">
        ${this.petminders == null ? html`
        <sl-spinner></sl-spinner>
        ` : html`
          ${this.petminders.map(petminder => html `
          <va-allpets class="petminders-card"
          id="${petminder._id}"
          name="${petminder.name}"
          description="${petminder.description}"
          user="${JSON.stringify(petminder.user)}"
          image="${petminder.image}"
          animal="${petminder.animal}"
          contact="${petminder.contact}"
        >
        
        </va-allpets>

       

          `)}
        `}
        </div>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new PetmindersView()