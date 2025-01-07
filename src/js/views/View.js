import icons from "url:../../img/icons.svg";

export default class View {
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.handlingError();

    this.data = data;
    const markup = this._genrateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    console.log(data);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  handlingError(message = this._errorMessage) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>No recipes found for your query. Please try again!</p>
                <p>${message}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  succsessMessage(sMessage) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
