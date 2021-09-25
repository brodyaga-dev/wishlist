<script>
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'

	const dispatch = createEventDispatcher()

	export let latch = 5
	let countdown = latch

	const clearImt = setInterval(function () {
		countdown -= 1
	}, 1000)

	const clearTim = setTimeout(() => {
		clearInterval(clearImt)
		clearInterval(clearTim)
		dispatch('timeout')
	}, latch * 1000)

	function handlerClick() {
		clearInterval(clearImt)
		clearInterval(clearTim)
		dispatch('abord')
	}
</script>

<div
	class="btn"
	on:click={handlerClick}
	in:slide={{ delay: 0, duration: 500 }}
	out:slide={{ delay: 0, duration: 500 }}
>
	<div class="btn_container">
		<div class="btn_container-count">{countdown}</div>
		<svg>
			<circle
				r="11"
				cx="15.5"
				cy="13.5"
				style="animation: countdown {latch}s linear infinite forwards;"
			/>
		</svg>
	</div>
	<slot />
</div>

<style lang="postcss">
	.btn {
		@apply hover:bg-gray-700 w-70 rounded duration-300 text-base border-gray-500 border bg-gray-500 text-white py-2 cursor-pointer absolute bottom-0 flex justify-center items-center;
	}

	.btn_container {
		@apply relative w-8 text-center float-left;
	}
	.btn_container-count {
		@apply text-white;
	}

	svg {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		transform: rotateY(-180deg) rotateZ(-90deg);
	}

	svg circle {
		stroke-dasharray: 72px;
		stroke-dashoffset: 0px;
		stroke-linecap: round;
		stroke-width: 2px;
		stroke: rgb(255, 83, 60);
		fill: none;
	}
</style>
