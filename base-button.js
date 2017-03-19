class BaseButton extends Atom.Element {
    static get is () { return "base-button"; }
    
    static get observedAttributes() {
        return ["caption"];
    }
    
    static get properties() {
        return {
            caption: {
                value: "button",
                reflectToAttribute: true
            }
        }
    }
    
    get template () {
        return `
            <style>
                :host {
                    display: inline-block;
                }

                .container {
                    padding: 8px;
                    background: silver;
                    border: 1px solid black;
                    cursor: pointer;
                    min-width: 48px;
                    text-align: center;
                }

                .container:hover {
                    background: gray;
                }
            </style>

            <div class="container">${this.caption}</div>          
        `;
    }
}
 
customElements.define(BaseButton.is, BaseButton);