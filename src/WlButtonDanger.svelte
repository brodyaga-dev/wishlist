<script>
	import WlButtonBase from './WlButtonBase.svelte'
	export let full
	export let outline
	export let href
	export let disabled
</script>

<div
	class="btnred
	{full === true ? 'btnred_full_true' : 'btnred_full_false'}
	{outline === true ? 'btnred_outline_true' : 'btnred_outline_false'}
	{disabled === true ? 'btn_disabled' : ''}"
>
	<WlButtonBase {href} {disabled} on:click>
		<slot />
	</WlButtonBase>
</div>

<style lang="postcss">
	.btn_disabled {
		@apply border-gray-500 bg-gray-400 hover:bg-gray-400 text-gray-100 cursor-default !important;
	}
	.btnred_full_true {
		@apply mx-2 px-2 text-base border-red-500 border;
	}
	.btnred_full_false {
		@apply text-2xl w-8;
	}
	.btnred_outline_true {
		@apply bg-transparent text-red-700 hover:text-white border border-red-500 hover:border-transparent px-2 text-base;
	}
	.btnred_outline_false {
		@apply bg-red-500 text-white;
	}
	.btnred {
		@apply hover:bg-red-700 rounded duration-300;
	}
</style>
