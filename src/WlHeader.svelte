<script>
	import { location, routes } from './router.js'
	import WlButtonBase from './WlButtonBase.svelte'

	let isMainScreen
	let isSettingScreen

	routes.subscribe((route) => {
		const { href } = route.at(-1)
		isMainScreen = href === location.show
		isSettingScreen = href === location.setting || href === location.language
	})
</script>

<div class="title_base">
	<div class="title_back">
		{#if !isMainScreen}
			<div class="title_back__control">
				<WlButtonBase>&#8592</WlButtonBase>
			</div>
		{:else}
			<div class="title_back__control">
				<WlButtonBase href={location.archive}>&#9842</WlButtonBase>
			</div>
		{/if}
	</div>

	<div class="title_name {isMainScreen ? 'ml-2' : ''}">
		<slot />
	</div>

	<div class="title_back">
		{#if !isSettingScreen}
			<div class="title_back__control">
				<WlButtonBase href={location.setting}>&#8285</WlButtonBase>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.title_base {
		@apply h-12 bg-blue-500 flex items-center justify-center font-courgette text-2xl text-white;
	}
	.title_name {
		@apply flex-100 text-center;
	}
	.title_back__control {
		@apply text-center cursor-pointer font-sans;
	}
	.title_back {
		@apply w-28;
	}
</style>
