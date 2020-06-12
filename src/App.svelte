<script>
	export let name = 'test';
	export let counter = 0;

	$: uppercaseName = name.toUpperCase();

	$: console.log(name);

	$: if (name === 'test') {
		 console.log(name);
	}

	function increment() {
		counter += 1;
	} 
	
	function changeName() {
		name = 'test1'
	} 

	function nameInput(event) {
		const evnteredValue = event.target.value;
		name = evnteredValue;
	} 
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>{uppercaseName}, {counter} </h1>
<button on:click="{ increment.toSting() }"> Increment </button>
<!-- <button on:click={increment.changeName()}> Change name </button> -->
<input type="text" value="{name}" on:input="{nameInput}">
