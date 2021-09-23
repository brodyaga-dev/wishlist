<script>
	import { fly } from 'svelte/transition'

	import WlItem from './WlItem.svelte'
	import WlFooter from './WlFooter.svelte'

	export let wlItems = []

	$: total = wlItems.length
		? wlItems.reduce((acc, item) => {
				const price = item.done ? 0 : item.price
				return acc + price
		  }, 0)
		: 0

	$: wlItemsLast = wlItems.length ? wlItems.filter((item) => !item.done) : []
</script>

<div class="mt-3" in:fly={{ delay: 0, duration: 500 }}>
	<div class="wl_container">
		{#each wlItemsLast as wlItem}
			<WlItem {wlItem} />
		{/each}
	</div>
	<div class="h-3" />
	<WlFooter {total} />
</div>
