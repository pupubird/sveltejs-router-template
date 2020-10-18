import GAnalytics from 'ganalytics';
import App from './App.svelte';

new App({
	target: document.body
});

if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');
}
