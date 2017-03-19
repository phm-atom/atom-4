window.Atom = window.Atom || {};
 
window.Atom.Element = class extends HTMLElement {
    static kebabToCamel (str) {
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    }
    
    static camelToKebab (str) {
        return str.replace(/([A-Z])/g, function (g) { return "-" + g.toLowerCase(); });
    }
    
    static _createPropertyProxy (el, defs) {
        return new Proxy({}, {
            get: function(target, name) {
                return target[name];
            },
            
            set: function(obj, prop, value) {
                let propDef = defs[prop];
                obj[prop] = value;

                if (propDef && (propDef.reflectToAttribute) && (el.parentNode)) {
                    el.setAttribute(Atom.Element.camelToKebab(prop), value);
                }

                return true;
            }
        });
    }
    
    constructor () {
        super();
        this._createProperties();
    }
    
    _createProperties () {
        if (this.constructor.properties) {
            this._propertyProxy = Atom.Element._createPropertyProxy(this, this.constructor.properties);

            Object.getOwnPropertyNames(this.constructor.properties)
                .forEach(name => this._createProperty(name));
        }
    }
    
    _createProperty (name) {
        let def = this.constructor.properties[name];
        this._defineProperty(name);
        (def.value === undefined) ? this[name] = null : this[name] = def.value;
    }
    
    _defineProperty (name) {
        if (this[name] !== undefined) { return; }
        
        Object.defineProperty(this, name, {
            get: () => this._propertyProxy[name],
            set: newValue => this._propertyProxy[name] = newValue,
            enumerable: true,
            configurable: false
        });
    }
    
    _init () {
        if (this.shadowRoot !== null) { return; }
        
        if (this.constructor.template) {
           this.attachShadow({ mode: "open" });
           this.shadowRoot.innerHTML = this.constructor.template;
        }
        else if (this.template) {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.innerHTML = this.template;
        }
        
        if (this.constructor.properties) {
            Object.getOwnPropertyNames(this.constructor.properties)
                .forEach(function (prop) {
                    let def = this.constructor.properties[prop];
                    
                    if (def && (def.reflectToAttribute) && (this.parentNode)) {
                        this.setAttribute(Atom.Element.camelToKebab(prop), this[prop]);
                    } 
                }.bind(this));
        }
    }
   
    connectedCallback () {
        this._init();
    }
   
    disconnectedCallback () {
    }
   
    attributeChangedCallback (attrName, oldVal, newVal) {
        if (this.constructor.observedAttributes) {
            if (this.constructor.observedAttributes.indexOf(attrName) > -1) {
                let propName = Atom.Element.kebabToCamel(attrName);
                
                this._defineProperty(propName);

                if (this[propName] !== newVal) {
                    this[propName] = newVal;
                }
            }
        }
    }
}
