<script>
	import { fly } from 'svelte/transition'
	import { t } from './i18n.js'
	import WlButtonBase from './WlButtonBase.svelte'
	import { location } from './router.js'
</script>

<div class="flex flex-col mb-5" in:fly={{ delay: 0, duration: 500 }}>
	<WlButtonBase href={location.language}>
		<div class="flex text-base py-1">
			<div class="flex-100 text-left">{$t('setting.language')}</div>
			<div class="self-center px-2 cursor-pointer">
				<img class="h-6" src="/images/rigthShevron.svg" alt="" />
			</div>
		</div>
	</WlButtonBase>

	<WlButtonBase href={location['export-import']}>
		<div class="flex text-base py-1">
			<div class="flex-100 text-left">{$t('setting.export-import')}</div>
			<div class="self-center px-2 cursor-pointer">
				<img class="h-6" src="/images/rigthShevron.svg" alt="" />
			</div>
		</div>
	</WlButtonBase>
</div>
