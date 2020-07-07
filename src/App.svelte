<script>
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import TextInput from  './UI/TextInput.svelte';
    import Button from  './UI/Button.svelte';

    let title = '';
    let subtitle = '';
    let address = ''; 
    let email = '';
    let imageUrl = '';
    let description = '';

    let meetups = [
        {
            id: 'm1',
            title: 'test title',
            subtitle: 'test substitle',
            description: 'test description',
            imageUrl: 'http://www.underconsideration.com/brandnew/archives/meetup_logo.png',
            address: '27th Nerd Road, 43243 New York',
            contactEmail: 'code@test.com',
            isFavorite: false
        },
                {
            id: 'm2',
            title: 'test title 2',
            subtitle: 'test substitle 2',
            description: 'test description 2',
            imageUrl: 'http://www.underconsideration.com/brandnew/archives/meetup_logo.png',
            address: '27th Nerd Road, 43243 New York',
            contactEmail: 'code2@test.com',
            isFavorite: false
        }
    ];

    function addMeetup() {
        const newMeetup =  {
            id: Math.random().toString(),
            title: title,
            subtitle: subtitle,
            description: description,
            imageUrl: imageUrl,
            contactEmail: email,
            address: address
        }

        // meetups.push(newMeetup); // Does not work
        meetups = [newMeetup, ...meetups];
    }

    function toggleFavorite(event) {
        const id = event.detail;
        const updatedMeetup = { ...meetups.find(m => m.id === id) };
        updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
        const meetupIndex = meetups.findIndex(m => m.id === id);
        const updatedMeetups = [...meetups];
        updatedMeetups[meetupIndex] = updatedMeetup;
        meetups = updatedMeetups;
    }
</script>

<style>
    main {
        margin-top: 5rem;
    }

    form {
        width: 30rem;
        max-width: 90%;
        margin: auto
    }
</style>

<Header />

<main>
    <form on:submit|preventDefault="{addMeetup}">
        <TextInput id="title"
         label="Title" 
         value="{title}"
         on:input="{(event) => title = event.target.value}" />
        <TextInput 
         id="subtitle"
         label="Subtitle" 
         value="{subtitle}"
         on:input="{(event) => subtitle = event.target.value}" />
        <TextInput 
         id="address"
         label="Address" 
         value="{address}"
         on:input="{(event) => address = event.target.value}" />
        <TextInput
         id="imageUrl"
         label="Image Url" 
         value="{imageUrl}"
         on:input="{(event) => imageUrl = event.target.value}" /> 
        <TextInput 
         id="email"
         label="Email" 
         value="{email}"
         type="email"
         on:input="{(event) => email = event.target.value}" /> 
        <TextInput 
         id="description"
         label="Description" 
         value="{description}"
         controlType="textarea"
         rows="3" 
         on:input="{(event) => description = event.target.value}" /> 

         <Button type="submit" caption="Save" />
    </form>
    <MeetupGrid {meetups} on:togglefavorite="{toggleFavorite}" />
</main>

