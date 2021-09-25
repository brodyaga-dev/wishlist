<script>
	import { fly } from 'svelte/transition'

	import WlCountDownTimer from './WlCountDownTimer.svelte'
	import WlItem from './WlItem.svelte'
	import WlFooter from './WlFooter.svelte'
	import { update } from './store/wlitems.js'
	import { routeRefresh } from './router.js'

	export let wlItems = []

	let show = false
	let item = {}

	function done(message) {
		item = message.detail
		show = true
	}

	async function abord() {
		item.done = false
		await update(item)
		show = false
		routeRefresh()
	}

	$: total = wlItems.length
		? wlItems.reduce((acc, item) => {
				const price = item.done ? 0 : item.price
				return acc + price
		  }, 0)
		: 0

	$: wlItemsLast = wlItems.length ? wlItems.filter((item) => !item.done) : []
</script>

<div class="mt-3 relative" in:fly={{ delay: 0, duration: 500 }}>
	<div class="wl_container">
		{#each wlItemsLast as wlItem}
			<WlItem {wlItem} on:done={done} />
		{/each}
	</div>
	<div class="h-3" />
	<WlFooter {total} />
	{#if show}
		<WlCountDownTimer latch="3" on:timeout={() => (show = false)} on:abord={abord}
			>отмена</WlCountDownTimer
		>
	{/if}
</div>
