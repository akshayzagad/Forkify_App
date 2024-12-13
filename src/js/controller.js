import icons from 'url:../img/icons.svg' 
import 'core-js/stable';
import 'regenerator-runtime/runtime'


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

const renderSpinner = function (parentEl){
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> `;
  parentEl.innerHTML='';
  parentEl.insertAdjacentHTML('afterbegin',markup);
}

const recipe = async function () {
    try {

      const id = window.location.hash.slice(1);
      if(!id) return;

      //  Rendering spinner when load the recipe
      renderSpinner(recipeContainer);

      //Recipe Api
        const responseApi = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

        const responseData = await responseApi.json();
        if (!responseApi.ok) throw new Error(`Somthing went wrong in responseApi.status ${response.status},${responseData.message}`);
        // console.log(responseApi);
        // console.log(responseData.data);
        let { recipe } = responseData.data;
        recipe =
        {
            cookingTime: recipe.cooking_time,
            id: recipe.id,
            imageurl: recipe.image_url,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceurl: recipe.source_url,
            title: recipe.title,
            ingredients: recipe.ingredients,
            };
        
      const markup =
       `<figure class="recipe__fig">
          <img src="${recipe.imageurl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(ing =>{
            return`
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
          }).join('')}
            
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
      recipeContainer.insertAdjacentHTML('afterbegin', markup)
    } catch (err) {
        alert(err)
        console.error(err);
    } 

}

// recipe();
let events=['hashchange', 'load']

events.forEach(ev => window.addEventListener(ev, recipe));
