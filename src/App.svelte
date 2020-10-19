<script>
	import { onDestroy } from "svelte";
	import { Route, params } from "@/components/stores.js";
	import router from "@/rootRoutes";

	let uri = location.pathname;

	function track(obj) {
		uri = obj.state || obj.uri || location.pathname;
		if (window.ga) ga.send("pageview", { dp: uri });
	}

	addEventListener("replacestate", track);
	addEventListener("pushstate", track);
	addEventListener("popstate", track);

	router.listen();

	onDestroy(router.unlisten);
</script>

<main>
	<svelte:component this={$Route} {$params} />
</main>
