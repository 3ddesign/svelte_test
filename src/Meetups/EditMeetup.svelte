  <script>
    import { createEventDispatcher } from 'svelte';
    import TextInput from  '../UI/TextInput.svelte';
    import Button from  '../UI/Button.svelte';
    import Modal from  '../UI/Modal.svelte';
    import { isEmpty, isValidEmail } from '../helpers/validation.js';

    const dispatch = createEventDispatcher();

    let title = '';
    let titleValid = false;
    let subtitle = '';
    let subtitleValid = false;
    let address = ''; 
    let addressValid = false;
    let email = '';
    let emailValid = false;
    let imageUrl = '';
    let imageUrlValid = false;
    let description = '';
    let descriptionValid = false;

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
      dispatch('save', {
          title: title,
          subtitle: subtitle,
          address: address,
          email: email,
          description: description,
          imageUrl: imageUrl
      });
    }

    function cancel() {
      dispatch('cancel');
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
          value="{description}"
          controlType="textarea"
          rows="3" 
          valid={descriptionValid}
          validityMessage="Please enter valid description."
          on:input="{(event) => description = event.target.value}" /> 
      </form>
      <div>
          <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
          <Button type="button" on:click={submitForm}>Save</Button>
      </div>
</Modal>