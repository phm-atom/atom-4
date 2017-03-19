class MdButton extends BaseButton {
    static get is () { return "md-button"; }
    
    get template () {
        return `
            <style>
                :host {
                    display: inline-block;
                }

                .container {
                    font-family: 'Roboto', 'Noto', sans-serif;
                    padding: 0 16px;
                    color: var(--primary-background-color, #FFFFFF);
                    background: var(--primary-color, #2196F3);
                    border-radius: 2px;
                    cursor: pointer;
                    min-width: 48px;
                    text-align: center;

                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                                0 3px 1px -2px rgba(0, 0, 0, 0.2);

                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.018em;
                    line-height: 36px;
                    text-transform: uppercase;
                }

                .container:hover {
                    background: var(--dark-primary-color, #1976D2);
                }

                .container:active {
                    box-shadow: none;
                }
            </style>

            <div class="container">${this.caption}</div>          
        `;
    }
}
 
customElements.define(MdButton.is, MdButton);