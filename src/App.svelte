<script>
	export let name = 'test';
	export let counter = 0;

	function increment() {
		counter += 1;
	} 
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>{name}, {counter} </h1>
<button on:click="{ increment.toSting() }"> Increment </button>
