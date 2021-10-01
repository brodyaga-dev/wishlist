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
				<WlButtonBase href={location.archive}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="archive-svg h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
						/>
					</svg>
				</WlButtonBase>
			</div>
		{/if}
	</div>

	<div class="title_name">
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
	.archive-svg {
		color: rgb(230, 230, 230);
		margin-left: auto;
		margin-right: auto;
	}

	.title_base {
		@apply h-12 bg-blue-500 flex items-center justify-center font-courgette text-2xl text-white;
	}
	.title_name {
		@apply flex-100 text-center;
	}
	.title_back__control {
		@apply text-center cursor-pointer font-sans flex;
	}
	.title_back {
		@apply w-28;
	}
</style>
