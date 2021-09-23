<script>
	import WlButtonBase from './WlButtonBase.svelte'
	export let full
	export let outline
	export let href
	export let disabled
</script>

<div
	class="btnblue
    {full === true ? 'btnblue_full_true' : 'btnblue_full_false'}
    {outline === true ? 'btnblue_outline_true' : 'btnblue_outline_false'}
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
	.btnblue_full_true {
		@apply px-2 text-base border-blue-500 border;
	}
	.btnblue_full_false {
		@apply text-2xl w-8;
	}
	.btnblue_outline_true {
		@apply bg-transparent text-blue-700 hover:text-white border border-blue-500 hover:border-transparent px-2 text-base;
	}
	.btnblue_outline_false {
		@apply bg-blue-500 text-white;
	}
	.btnblue {
		@apply hover:bg-blue-700  rounded duration-300 text-center;
	}
</style>
