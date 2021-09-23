<script>
	import WlButtonPrimary from './WlButtonPrimary.svelte'

	import { location } from './router.js'
	import { t } from './i18n.js'

	export let total = 0
</script>

<div class="flex items-center">
	<div class="flex-auto text-lg text-gray-600 text-center font-bold">
		{$t('footer.total')}:
		{new Intl.NumberFormat('ru-RU', {
			maximumFractionDigits: 0
		}).format(total)}
		{String.fromCodePoint($t('currency'))}
	</div>
	<WlButtonPrimary href={location.edit} full={false} outline={false}>+</WlButtonPrimary>
</div>
