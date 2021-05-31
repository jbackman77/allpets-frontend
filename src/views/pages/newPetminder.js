import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import PetminderAPI from './../../PetminderAPI'
import Toast from '../../Toast'

class newPetminderView {
  init(){
    document.title = 'New Petminder'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newPetminderSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      await PetminderAPI.newPetminder(formData)
      Toast.show('Petminder added!')
      submitBtn.removeAttribute('loading') 
      //reset form
      //reset text + textarea inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)
      //reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if(radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
      //reset file input
      const fileInput = document.querySelector('input[type=file')
      if(fileInput) fileInput.value = null

    }catch(err){
      Toast.show(err,'error')
     submitBtn.removeAttribute('loading') 
    }
    
  }

  render(){
    const template = html`
      <va-app-header title="New Petminder" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>New Petminder</h1>
        <sl-form class="form-signup" @sl-submit=${this.newPetminderSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Petminder Name" required></sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>
          <div class="input-group">
            <sl-textarea name="contact" rows="1" placeholder="Contact"></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
  
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Animal</label><br>
            <sl-radio-group label="animal" no-fieldset>
              <sl-radio name="animal" value="ld">Large Dog</sl-radio>
              <sl-radio name="animal" value="sd">Small Dog</sl-radio>
              <sl-radio name="animal" value="c">Cat</sl-radio>
              <sl-radio name="animal" value="la">Large Animal</sl-radio>
              <sl-radio name="animal" value="sa">Small Animal</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button type="primary" class="submit-btn" submit>Add Petminder </sl-button>
        </sl-form>       
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newPetminderView()