<script>
	import { get, set } from '../store/wlitems.js'
	import { t } from '../i18n.js'
	import WlButtonPrimary from '../WlButtonPrimary.svelte'

	let value

	const property = ['id', 'done', 'imgSrc', 'name', 'price']
	function everyPropertyExist(obj, property) {
		return Object.keys(obj)
			.map((el) => property.includes(el))
			.every((exist) => exist)
	}

	function validateImport(str) {
		if (Boolean(str) === false) {
			return false
		}
		try {
			const importDry = JSON.parse(str)
			return importDry.every((el) => everyPropertyExist(el, property))
		} catch (error) {
			return false
		}
	}

	async function importItems() {
		if (validateImport(value)) {
			await set(value)
		}
	}

	async function exportItems() {
		const wl = await get()
		const clip = JSON.stringify(wl, null, 2)

		async function waitForTabLoadComplete(
			targetTabId,
			{ timeout = 0, checkCurrentState = true } = {}
		) {
			// eslint-disable-next-line no-async-promise-executor
			return new Promise(async (resolve, reject) => {
				const cleanup = () => browser.tabs.onUpdated.removeListener(onTabUpdated)
				if (timeout)
					setTimeout(() => {
						cleanup()
						reject(Error('timeout'))
					}, timeout)
				browser.tabs.onUpdated.addListener(onTabUpdated)
				const tab = await browser.tabs.get(targetTabId)
				if (checkCurrentState && tab.status === 'complete') {
					cleanup()
					resolve(tab)
				}

				function onTabUpdated(tabId, { status }, tab) {
					if (tabId === targetTabId && status === 'complete' && tab) {
						cleanup()
						resolve(tab)
					}
				}
			})
		}

		async function onCreated(tab) {
			await waitForTabLoadComplete(tab.id, { timeout: 1000 })
			browser.tabs.sendMessage(tab.id, clip).catch(onError)
		}

		function onError() {}

		const creating = browser.tabs.create({
			url: 'exports.html'
		})

		creating.then(onCreated, onError)
	}
</script>

<div class="flex justify-between text-base py-1">
	<div class="flex-100 self-center leading-4">{$t('setting.save')}</div>
	<WlButtonPrimary full on:click={exportItems}>{$t('button.export')}</WlButtonPrimary>
</div>
<div class="">
	<div class="flex justify-evenly text-base py-1">
		<div class="flex-100 self-center leading-4">{$t('setting.import')}</div>
		<WlButtonPrimary disabled={!validateImport(value)} full on:click={importItems}
			>{$t('button.import')}</WlButtonPrimary
		>
	</div>
	<label class="block text-left mt-3">
		<textarea bind:value class="row_input" rows="3" placeholder={$t('setting.phexport')} />
	</label>
</div>

<style lang="postcss">
	.row_input {
		@apply w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500;
	}
</style>
