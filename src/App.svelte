<script>
	import WlHeader from './WlHeader.svelte'
	import WlItemsShow from './WlItemsShow.svelte'
	import WlItemUpdate from './WlItemUpdate.svelte'
	import WlItemsStarted from './WlItemsStarted.svelte'
	import WlItemsSetting from './WlItemsSetting.svelte'
	import WlItemsArchive from './WlItemsArchive.svelte'
	import Language from './setting/Language.svelte'
	import ExportImport from './setting/ExportImport.svelte'

	import { onDestroy } from 'svelte'

	import { get as getWls } from './store/wlitems.js'
	import { get as getSetting } from './store/setting.js'
	import { newSetting } from './helpers.js'
	import { routes, location } from './router.js'
	import { locale } from './i18n.js'

	let props = {}

	let current

	const unsubscribe = routes.subscribe(async (route) => {
		if (route.length > 0) {
			const { href, data } = route.at(-1)
			switch (href) {
				case location.setting:
					settingScreen()
					break
				case location.archive:
					archiveScreen()
					break
				case location.edit:
					editScreen(data)
					break
				case location.language:
					languageScreen()
					break
				case location['export-import']:
					exportImportScreen()
					break

				default:
					init()
					break
			}
		}
	})

	onDestroy(() => {
		unsubscribe()
	})

	async function init() {
		const wl = await getWls()
		const isComplete = wl.some((item) => !item.done)

		if (wl.length && isComplete) {
			showScreen(wl)
		} else {
			initializeScreen()
		}
		await readSetting()
	}

	function initializeScreen() {
		current = WlItemsStarted
		props = {}
	}

	function showScreen(items) {
		current = WlItemsShow
		props = {
			wlItems: items
		}
	}

	async function readSetting() {
		const setting = await getSetting()
		const defaultSetting = newSetting()
		$locale = setting.language || defaultSetting.language
	}

	async function archiveScreen() {
		current = WlItemsArchive
		props = {}
	}

	function settingScreen() {
		current = WlItemsSetting
		props = {}
	}

	function editScreen(item) {
		current = WlItemUpdate
		props = {
			item: item
		}
	}

	function languageScreen() {
		current = Language
		props = {}
	}

	function exportImportScreen() {
		current = ExportImport
		props = {}
	}
</script>

<div class="w-80 font-sans">
	<WlHeader>Wish List</WlHeader>
	<div class="m-5">
		<svelte:component this={current} {...props} />
	</div>
</div>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@font-face {
		font-family: 'Courgette';
		font-style: normal;
		font-weight: 400;
		src: local('Courgette'), local('Courgette-Regular'),
			url('/fonts/Courgette-Regular.ttf') format('woff2');
	}
	.wl_container {
		@apply max-h-400 w-280 overflow-y-auto overflow-x-hidden;
	}
</style>
