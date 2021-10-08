/*

In this file:

// A. Polyfills
// B. Modules
// C. Environments

*/

//////////////////////////////////////////////
// A. Polyfills
//////////////////////////////////////////////

window.addEventListener('load', () => {

    const googleTranslateSelect = document.querySelector(".goog-te-combo");

    if (typeof(googleTranslateSelect) !== 'undefined' && googleTranslateSelect !== null) {

        const setLanguage = (myLang) => {
            googleTranslateSelect.value = myLang;
            googleTranslateSelect.querySelector(`option[value="${myLang}"]`).selected = true;

            languageChangeEvent(googleTranslateSelect, 'change');
        }

        const languageChangeEvent = (element, event) => {

            var eventObject;
            
            if (document.createEventObject){
                eventObject = document.createEventObject();
                return element.languageChangeEvent('on' + event, eventObject)
            } else {
                eventObject = document.createEvent("HTMLEvents"); 
                // event type, bubbling, cancelable
                eventObject.initEvent(event, false, true);
                return !element.dispatchEvent(eventObject);
            }
        }  

        // Footer Links
        
        const translateLinkList = document.querySelectorAll("[data-lang]");

        translateLinkList.forEach((translateLink) => {

            translateLink.classList.add('notranslate');
            
            translateLink.addEventListener("click", (event) => {

                event.preventDefault();

                let myLang = translateLink.getAttribute("data-lang");

                setLanguage(myLang);

            });
        });

        const allLanguageSelect = document.getElementById('custom-language-select');
        const allLanguageButton = document.getElementById('custom-language-update');

        allLanguageSelect.classList.add('notranslate');

        let langSelectObserver = new MutationObserver(callback);
        
        function callback (mutations) {

            console.log("From MO", 
            googleTranslateSelect.hasChildNodes(),
            googleTranslateSelect.childElementCount);

            if(allLanguageSelect.childElementCount === 0) {

                const languagesList = googleTranslateSelect.querySelectorAll('option');

                languagesList.forEach((language) => {

                    let value = language.getAttribute('value');
                    let text = language.innerHTML;
                    let option = document.createElement('option');

                    option.setAttribute('value', value);
                    option.innerHTML = text;
                    
                    allLanguageSelect.appendChild(option);
                });
            } else {
                allLanguageSelect.value = googleTranslateSelect.value;
            }

        }

        var observerOptions = {
            childList: true
        }

        langSelectObserver.observe(googleTranslateSelect, observerOptions);

        allLanguageButton.addEventListener('click', (event) => {
            if(allLanguageSelect.value !== '') {
                setLanguage(allLanguageSelect.value)
            }
        });

    }

    // RTL

    const rtlTarget = document.querySelector("html");

    const rtlObserver = new MutationObserver((mutations) => {

        mutations.forEach(() => {
            let single_class = "translated-rtl";

            if (rtlTarget.classList.contains(single_class)) {
                rtlTarget.setAttribute("dir", "rtl");
            } else {
                rtlTarget.setAttribute("dir", "ltr");
            }

        });
    });

    const rtlConfig = {
        attributes: true,
        attributeFilter: ["class"]
    }

    rtlObserver.observe(rtlTarget, rtlConfig);

});