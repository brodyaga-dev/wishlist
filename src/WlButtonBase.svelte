<script>
	import { createEventDispatcher } from 'svelte'
	import { routeBack, routeTo } from './router.js'

	const dispatch = createEventDispatcher()

	export let href
	export let disabled

	function handleClick() {
		dispatch('click')
		setTimeout(function () {
			if (href) {
				routeTo(href)
			} else {
				routeBack()
			}
		}, 100)
	}
</script>

<button on:click={handleClick} {disabled} class="w-full">
	<slot />
</button>
