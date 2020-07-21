<script>
    import meetups from './Meetups/meetups-store.js';
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';
    import Button from  './UI/Button.svelte';

    let editMode;
    // let meetups = 
    
    let loadedMeetups = meetups;

    function addMeetup(event) {
        const meetupData =  { 
            title: event.detail.title,
            subtitle: event.detail.subtitle,
            description: event.detail.description,
            imageUrl: event.detail.imageUrl,
            contactEmail: event.detail.email,
            address: event.detail.address
        }

        // meetups.push(newMeetup); // Does not work
        meetups.addMeetup(meetupData);
        editMode = null;
    }

    function toggleFavorite(event) {
        const id = event.detail;
        meetups.toggleFavorite(id)

    }

    function cancelEdit() {
        editMode = null;
    }
</script>

<style>
    main {
        margin-top: 5rem;
    }

    .meetup-controls {
        margin: 1rem;
    }
</style>

<Header />

<main>
    <div class="meetup-controls">
        <Button on:click="{() => editMode = 'add'}">New Meetup</Button>
    </div>
    {#if editMode === 'add'}
    <EditMeetup on:save="{addMeetup}" on:cancel={cancelEdit}/>
    {/if}
    <MeetupGrid meetups={$meetups} on:togglefavorite="{toggleFavorite}" />
</main>

