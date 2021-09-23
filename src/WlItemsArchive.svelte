<script>
	import { fly } from 'svelte/transition'
	import { DEFAULT_IMAGE_URL } from './helpers.js'
	import { t } from './i18n.js'
	import WlItem from './WlItem.svelte'
	import { get } from './store/wlitems.js'

	let wlItems = getWls()

	function getWls() {
		return get().then((items) => {
			wlItems = [...items]
		})
	}

	$: wlItemsDone = wlItems.length ? wlItems.filter((item) => item.done) : []
</script>

<div class="mt-3" in:fly={{ delay: 0, duration: 500 }}>
	{#if wlItemsDone.length}
		<div class="wl_container">
			{#each wlItemsDone as wlItem}
				<WlItem {wlItem} />
			{/each}
		</div>
		<div class="h-3" />
	{:else}
		<div class="flex flex-col items-center mb-10">
			<img class="object-contain w-52" src={DEFAULT_IMAGE_URL} alt="" />
			<div class="text-base text-center uppercase my-5 max-w-40">
				{$t('archive.title')}
			</div>
		</div>
	{/if}
</div>
