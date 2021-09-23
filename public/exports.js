browser.runtime.onMessage.addListener((message) => {
    const el = document.getElementById('exports')
    el.innerHTML = message
})