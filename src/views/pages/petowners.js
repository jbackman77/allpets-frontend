import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class PetownersView {
  init(){
    document.title = 'Pet Owners'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Pet Owners" user="${JSON.stringify(Auth.currentUser)}">
      <style>
      <img class="signinup-logo" src="/images/logo.svg"> </va-app-header>
      
      <div class="page-content">        
     
        <p>Page content ...</p>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new PetownersView()