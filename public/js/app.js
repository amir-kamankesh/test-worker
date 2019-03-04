if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function () {
        console.log('SW registered');
    });
}

setTimeout(function () {
    document.querySelector('p').innerHTML = 'js tested';
}, 3000);