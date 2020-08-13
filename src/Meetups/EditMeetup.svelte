  <script>
    import meetups from './meetups-store.js'
    import { createEventDispatcher } from 'svelte';
    import TextInput from  '../UI/TextInput.svelte';
    import Button from  '../UI/Button.svelte';
    import Modal from  '../UI/Modal.svelte';
    import { isEmpty, isValidEmail } from '../helpers/validation.js';

    export let id = null;

    const dispatch = createEventDispatcher();

    let title = '';
    let subtitle = '';
    let address = ''; 
    let email = '';
    let imageUrl = '';
    let description = '';

    if (id) {
        const unsubscribe = meetups.subscribe(items => {
          const selectedMeetup = items.find(i => i.id === id);
          title = selectedMeetup.title;
          subtitle = selectedMeetup.subtitle;
          address = selectedMeetup.address;
          email = selectedMeetup.contactEmail;
          imageUrl = selectedMeetup.imageUrl;
          description = selectedMeetup.description;
        });

        unsubscribe();
    } 

$: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = isValidEmail(email);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    emailValid;

    function submitForm() {
          const meetupData =  { 
          title: title,
          subtitle: subtitle,
          description: description,
          imageUrl: imageUrl,
          contactEmail: email,
          address: address
      }
      if (id) {
        meetups.updateMeetup(id, meetupData);
        fetch(`https://sv-test213.firebaseio.com/meetups/${id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(meetupData),
          headers: { 'Content-Type': 'application/json'} 
        })
        .then(response => {
          if (!res.ok) {
            throw new Error('Request is failed');
          }
          meetups.updateMeetup(id, meetupData);
        }) 
        .catch(error => console.error(error));
      } else {
        fetch('https://sv-test213.firebaseio.com/meetups.json', {
          method: 'POST',
          body: JSON.stringify({ ...meetupData, isFavorite: false }),
          headers: { 'Content-Type': 'application/json'} 
        })
        .then(response => {
          if (!res.ok) {
            throw new Error('Request is failed');
          }
          res.json();
        })
         .then(data => {
           meetups.addMeetup({ ...meetupData, isFavorite: false, id: data.name });
         })
        .catch(error => console.error(error));
      }
      dispatch('save');
    }

    function cancel() {
      dispatch('cancel');
    }

    function deleteMeetup() {
         fetch(`https://sv-test213.firebaseio.com/meetups/${id}.json`, {
          method: 'DETELE'
        })
        .then(response => {
          if (!res.ok) {
            throw new Error('Request is failed');
          }
           meetups.removeMeetup(id);
        }) 
        .catch(error => console.error(error));
    
      dispatch('save');
     }
 </script>

 <style>
    form {
        width: 100%;
    }
</style>
<Modal title="Edit Meetup" on:cancel>
    <form on:submit|preventDefault="{submitForm}">
          <TextInput id="title"
          label="Title" 
          valid={titleValid}
          validityMessage="Please enter valid title."
          value="{title}"
          on:input="{(event) => title = event.target.value}" />
          <TextInput 
          id="subtitle"
          label="Subtitle" 
          value="{subtitle}"
          valid={titleValid}
          validityMessage="Please enter valid subtitle."
          on:input="{(event) => subtitle = event.target.value}" />
          <TextInput 
          id="address"
          label="Address" 
          value="{address}"
          valid={addressValid}
          validityMessage="Please enter valid address."
          on:input="{(event) => address = event.target.value}" />
          <TextInput
          id="imageUrl"
          label="Image Url" 
          value="{imageUrl}"
          valid={imageUrlValid}
          validityMessage="Please enter valid Image Url."
          on:input="{(event) => imageUrl = event.target.value}" /> 
          <TextInput 
          id="email"
          label="Email" 
          value="{email}"
          type="email"
          valid={emailValid}
          validityMessage="Please enter valid email."
          on:input="{(event) => email = event.target.value}" /> 
          <TextInput
          id="description"
          label="Description"
          controlType="textarea"
          valid={descriptionValid}
          validityMessage="Please enter a valid description."
          bind:value={description} />
      </form>
      <div>
          <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
          <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
          {#if id}
          <Button type="button"  on:click={deleteMeetup}>Delete</Button>
          {/if}
      </div>
</Modal>