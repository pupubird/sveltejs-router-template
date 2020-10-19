import GAnalytics from 'ganalytics';
import App from './App.svelte';

new App({
	target: document.body
});

if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/sw.js');
		});
	}
}