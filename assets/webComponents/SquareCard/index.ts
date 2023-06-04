import './SquareCard.scss';

class SquareCard extends HTMLElement {
  constructor() {
    super();
    this.classList.add('drop-shadow');
  }
}

customElements.define('square-card', SquareCard);
