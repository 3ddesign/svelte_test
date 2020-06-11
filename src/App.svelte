<script>
	export let name = 'test';
	export let counter = 0;

	$: uppercaseName = name.toUpperCase();

	function increment() {
		counter += 1;
	} 
	
	function changeName() {
		name = 'test1'
	} 
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>{uppercaseName}, {counter} </h1>
<button on:click="{ increment.toSting() }"> Increment </button>
<button on:click={increment.changeName()}> Change name </button>
