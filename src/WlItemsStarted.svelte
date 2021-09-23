<script>
	import { DEFAULT_IMAGE_URL } from './helpers.js'
	import { fly } from 'svelte/transition'
	import { t } from './i18n.js'
	import WlButtonBase from './WlButtonBase.svelte'
	import { location } from './router.js'
</script>

<div class="flex flex-col items-center mb-10" in:fly={{ delay: 0, duration: 500 }}>
	<img class="object-contain w-52" src={DEFAULT_IMAGE_URL} alt="" />
	<div class="text-base text-center uppercase my-5 max-w-40">
		{$t('started.title')}
	</div>

	<div class="btnblue">
		<WlButtonBase href={location.edit}>
			{$t('button.init')}
		</WlButtonBase>
	</div>
</div>

<style lang="postcss">
	.btnblue {
		@apply hover:bg-blue-700 rounded duration-300 px-6 py-2 text-base border-blue-500 border bg-blue-500 text-white;
	}
</style>
