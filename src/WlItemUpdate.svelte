<script>
	import WlButtonPrimary from './WlButtonPrimary.svelte'
	import WlButtonDanger from './WlButtonDanger.svelte'
	import { onMount } from 'svelte'

	import { fly } from 'svelte/transition'
	import { prepare, validateImgUrl, DEFAULT_IMAGE_URL, newItem } from './helpers.js'
	import { remove, update } from './store/wlitems.js'
	import { location } from './router.js'

	import { t } from './i18n.js'

	export let item = newItem()

	async function handleSave() {
		await update(prepare(item))
	}

	async function handleRemove() {
		await remove(item.id)
	}

	$: img = validateImgUrl(item.imgSrc) ? item.imgSrc : DEFAULT_IMAGE_URL

	onMount(async () => {
		if (!validateImgUrl(item.imgSrc)) {
			item.imgSrc = ''
		}
	})
</script>

<div class="w-full flex flex-col mt-6" in:fly={{ delay: 0, duration: 500 }}>
	<img class="header_image" src={img} alt={item.name} />
	<div class="row">
		<div class="row_name">{$t('updated.row_name.foto')}</div>
		<div class="flex-auto">
			<input class="row_input" bind:value={item.imgSrc} placeholder={$t('updated.input.foto')} />
		</div>
	</div>

	<div class="row">
		<div class="row_name">{$t('updated.row_name.name')}</div>
		<div class="flex-auto">
			<input class="row_input" bind:value={item.name} placeholder={$t('updated.input.name')} />
		</div>
	</div>

	<div class="row">
		<div class="row_name">{$t('updated.row_name.price')}</div>
		<div class="flex-auto">
			<input class="row_input" bind:value={item.price} placeholder={$t('updated.input.price')} />
		</div>
	</div>
	<div class="flex justify-center mt-8">
		<WlButtonDanger on:click={handleRemove} full={true} outline={true} href={location.show}>
			{$t('button.delete')}
		</WlButtonDanger>
		<WlButtonPrimary
			on:click={handleSave}
			full={true}
			outline={false}
			href={location.show}
			disabled={item.name === ''}
		>
			{$t('button.save')}
		</WlButtonPrimary>
	</div>
</div>

<style lang="postcss">
	.header_image {
		@apply mb-4 max-w-52 h-52 self-center object-contain;
	}
	.row {
		@apply w-full text-sm flex h-10 items-center;
	}
	.row_name {
		@apply w-14 appearance-none border-2 border-gray-200 rounded-l py-2 pl-2 mx-auto text-gray-700 leading-tight;
	}
	.row_input {
		@apply w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500;
	}
</style>
