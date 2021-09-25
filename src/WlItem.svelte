<script>
	import { createEventDispatcher } from 'svelte'

	import { routeTo, routeRefresh, location } from './router.js'
	import { update } from './store/wlitems.js'

	const dispatch = createEventDispatcher()

	export let wlItem

	function handleEdit() {
		routeTo(location.edit, wlItem)
	}

	async function handleUpdate() {
		if (wlItem.done) {
			dispatch('done', wlItem)
			await update(wlItem)
			routeRefresh()
		} else {
			await update(wlItem)
			routeRefresh()
		}
	}
</script>

<div class="row">
	<img class="row__image" src={wlItem.imgSrc} alt={wlItem.name} on:dblclick={handleEdit} />

	<div class="row__name" on:dblclick={handleEdit}>
		{wlItem.name}
	</div>
	<input class="row__input" type="checkbox" bind:checked={wlItem.done} on:change={handleUpdate} />
</div>
<div class="h-px bg-gray-200" />

<style lang="postcss">
	.row {
		@apply h-14 flex items-center cursor-pointer;
	}
	.row__image {
		@apply object-contain min-w-12 h-12;
	}
	.row__name {
		@apply text-sm mx-2 flex-100;
	}
	.row__input {
		@apply scale-125 w-12.5;
	}
</style>
