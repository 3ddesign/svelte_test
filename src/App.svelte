<script>
	import ContactCard from './ContactCard.svelte';

	export let name = 'test';
	let title = '';
	let image = '';
	let description = '';
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
<!-- <button on:click="{ increment.toSting() }"> Increment </button> -->
<!-- <button on:click={increment.changeName()}> Change name </button> -->
<!-- <input type="text" value="{name}" on:input="{nameInput}"> -->
<input type="text" bind:value="{name}">
<input type="text" bind:value="{title}">
<input type="text" bind:value="{image}">
<textarea rows="3" bind:value="{description}"></textarea>

<ContactCard userName="{name}" jobTitle={title} {description} userImage="{image}" />
