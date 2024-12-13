import icons from 'url:../img/icons.svg'
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
}

const recipe = async function () {
  try {
    // Get id when click on hasmap using load hasmap event on window 
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Loading Recipe
    await model.loadRecipe(id);

    // Get import inisilize empty object in controller to use in markup
    let { recipe } = model.state;
    console.log(recipe);

    //  Rendering spinner when load the recipe
    renderSpinner(recipeContainer);

    // Here we get data from model by object state which is initiallize above code
    recipeView.render(model.state.recipe);
    /* Here We use same method to initilize constructor in recipeView */
    //let recipeView = new recipeView(model.state.recipe); 

    
  } catch (err) {
    alert(err)
    console.error(err);
  }

}

// recipe();
let events = ['hashchange', 'load']

events.forEach(ev => window.addEventListener(ev, recipe));
