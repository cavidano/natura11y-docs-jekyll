window.addEventListener('DOMContentLoaded', () => {
    
    const customPropertiesData = "/lib/json/root-custom-properties.json";

    const allPropertiesContainer = document.getElementById("all-custom-properties");
    const relatedPropertiesContainer = document.getElementById("related-custom-properties");

    const copyButtonText = "Copy";
    const copyButtonActionText = "Copied!";

    const loadCustomProperties = async () => {
        try {
            const response = await fetch(customPropertiesData);
            const customPropertyData = await response.json();

            if(allPropertiesContainer){
                displayAllProperties(customPropertyData);
                checkAchor();
                initClipboard();
            }
            
            if(relatedPropertiesContainer){
                let myFilter = relatedPropertiesContainer.getAttribute('data-title').toString();
                let relatedProperties = customPropertyData.filter(prop => prop.type === myFilter);
                displayRelatedProperties(relatedProperties);
            }
        
        } catch (err) {
            console.error(err);
        }
    };

    const checkAchor = () => {
        const hash = window.location.hash;
        if (window.location.hash) {
            window.location.href = hash;
        }
    };

    const initClipboard = () => {

        const allCPButtonList = document.querySelectorAll('[data-clipboard="all"]');
        const cpButtonList = document.querySelectorAll('[data-clipboard="single"]');

        allCPButtonList.forEach((cpButton) => {

            cpButton.addEventListener('click', (event) => {

                event.preventDefault();

                let currentTable = event.target.closest("table");
                let currentTableRowsList = currentTable.querySelectorAll("tbody > tr");
                let currentTableSingleButtonList = currentTable.querySelectorAll('[data-clipboard="single"]');

                currentTableSingleButtonList.forEach((singleButton) => {
                    singleButton.innerHTML = copyButtonActionText.toString(); 
                });

                let currentCPArray = [];

                currentTableRowsList.forEach((row) => {

                    let cpName = row.querySelector('[data-prop]').innerHTML.trim().replace(/&nbsp;/g, '');
                    let cpValue = row.querySelector('[data-val]').innerHTML.trim().replace(/&nbsp;/g, '');
                    let cpText = `${cpName}: ${cpValue};`;

                    currentCPArray.push(cpText);

                });

                let myClipboardProperties = currentCPArray.map((property) => {

                    return `    ${property}`
                
                }).join('\n');
                
                let myClipboardText = `
                    :root {
                        ${myClipboardProperties}
                    }`;

                // Create an auxiliary hidden input
                var aux = document.createElement( 'textarea' );

                // Get the text from the element passed into the input
                aux.innerHTML = myClipboardText.trim();

                // Append the aux input to the body
                document.body.appendChild(aux);

                // Highlight the content
                aux.select();

                // Execute the copy command
                document.execCommand( 'copy' );

                // Remove the input from the body
                document.body.removeChild(aux);

            });

        });

        cpButtonList.forEach((cpButton) => {

            const resetButton = () => {
                cpButtonList.forEach((otherButtons)=> {
                    otherButtons.innerHTML = copyButtonText;
                });
            }

            cpButton.addEventListener('click', (event) => {

                event.preventDefault();
                resetButton();
                
                let currentRow = event.target.closest('tr');

                let myCustomPropertyName = currentRow.querySelector('[data-prop]').innerHTML.trim().replace(/&nbsp;/g, '');
                let myCustomPropertyValue = currentRow.querySelector('[data-val]').innerHTML.trim().replace(/&nbsp;/g, '');
                let myClipboardText = `${myCustomPropertyName}: ${myCustomPropertyValue};`;

                if( myClipboardText ){
                    event.target.innerHTML = copyButtonActionText;
                }

                // Create an auxiliary hidden input
                var aux = document.createElement( 'input' );

                // Get the text from the element passed into the input
                aux.setAttribute( 'value', myClipboardText );

                // Append the aux input to the body
                document.body.appendChild(aux);

                // Highlight the content
                aux.select();

                // Execute the copy command
                document.execCommand( 'copy' );

                // Remove the input from the body
                document.body.removeChild(aux);

            });

        });

    };

    const displayAllProperties = (customProperties) => {

        const allPropertiesTable = allPropertiesContainer.querySelector(".table-scroll__container");

        const customProperyHTML = customProperties.map((customPropertyArray) => {

            let type = customPropertyArray.type;
            let properties = customPropertyArray.customProperties;
            let scope = customPropertyArray.scope;

            let id = type.replace(/\s+/g, '-').toLowerCase();

            let slug;

            if(type === 'Gradient Veneer' || type === 'Subtle Fill') {
                slug = 'accents/#' + id;
            } else {
                slug = id;
            }

            let cpRows = properties.map((property) => {
                return `
                    <tr>
                        <td>
                            <span data-prop>--${property.name}</span>
                        </td>
                        <td>
                            <span data-val>${property.value}</span>
                        </td>
                        <td>  
                            <button data-clipboard="single">
                                ${copyButtonText}
                            </button>
                        </td>
                        <td>
                            ${property.description}
                        </td>
                    </tr>
                `;
            }).join('');

            return `
                <div class="cp-header box-shadow-1" id="cp_${id}">
                    <span class="cp-header__title">${type}</span>
                    <a class="cp-header__link button button--has-icon" href="../../docs/${slug}">
                        <span class="button__text">Docs</span>
                        <span class="icon_arrow-right button__icon"></span>
                    </a>
                </div>
                <table class="table">
                    <caption class="border-bottom">
                        <p class="font-size-md">
                            Variable scope: <code>${scope}</code>
                        </p>
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">
                                CSS Variable
                            </th>
                            <th scope="col">Default Value</th>
                            <th scope="col">
                                <button data-clipboard="all">
                                    <span>Copy All</span>
                                </button>
                            </th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cpRows}
                    </tbody>

                </table>
            `;

        }).join('');

        allPropertiesTable.innerHTML = customProperyHTML;
    };

    const displayRelatedProperties = (customProperties) => {

        const customProperyHTML = customProperties.map((property) => {

            // let type = property.type;
            let properties = property.customProperties;
            let scope = property.scope;

            let cpRows = properties.map((property) => {
                return `    --${property.name}: ${property.value};`;
            }).join('\n');

            return (`
                <pre>
                    <code class="language-css">
                        ${scope} {\n${cpRows}\n}
                    </code>
                </pre>
            `);

        }).join(''); 

        relatedPropertiesContainer.innerHTML = customProperyHTML;

        Prism.highlightElement(relatedPropertiesContainer.querySelector("code"))

    };

    loadCustomProperties();

});