document.addEventListener("DOMContentLoaded", () => {

    const iframeList = document.getElementsByTagName("iframe");

    for (const iframe of iframeList) {

        const iframeWindow = iframe.contentDocument;

        const getIframeDocHeight = () => {

            let iframeWindowHeight = iframeWindow.document.body.scrollHeight;
            iframe.style.height = iframeWindowHeight + 'px';
        }

        iframe.addEventListener('load', getIframeDocHeight);
        window.addEventListener('resize', getIframeDocHeight);

    }

});