window.addEventListener('load', () => {

    const copyButtonText = 'Copy';
    const copyButtonActionText = 'Copied!';

    const initClipboard = () => {

        const allCPButtonList = document.querySelectorAll('[data-clipboard="all"]');
        const cpButtonList = document.querySelectorAll('[data-clipboard="single"]');

        allCPButtonList.forEach((cpButton) => {

            cpButton.addEventListener('click', (event) => {

                event.preventDefault();

                let currentTable = event.target.closest('table');
                let currentTableRowsList = currentTable.querySelectorAll('tbody > tr');
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

    initClipboard();
});