<script>
	import { locale, languages } from '../i18n.js'
	import { update } from '../store/setting.js'

	$: {
		update({ language: $locale })
	}
</script>

{#each languages as lang}
	<div>
		<label class="flex justify-evenly text-base py-1">
			<span class="flex-100">{lang.name}</span>
			<input type="radio" class="w-6" name="radio" value={lang.lang} bind:group={$locale} />
		</label>
	</div>
{/each}
