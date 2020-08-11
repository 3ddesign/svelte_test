<script>
    import meetups from './Meetups/meetups-store.js';
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte';
    import Button from  './UI/Button.svelte';
    import LoadingSpinner from  './UI/LoadingSpinner.svelte';

    let editMode;
    let editedId;
    let page = 'overview';
    let pageData = {}; 
    let isLoading = true;

    fetch('https://sv-test213.firebaseio.com/meetups.json' )
    .then(res => {
          if (!res.ok) {
            throw new Error('Fetch is failed')
          } 
          return res.json();
    })
    .then(data => {
        const loadedMeetups = [];
        for (const key in data) {
            loadedMeetups.push({
                ...data[key],
               id: key
         });
        } 
        setTimeout(() => {
            isLoading = false;
            meetups.setMeetups(loadedMeetups);
        }, 1000)
    })
    .catch(error => { 
            isLoading = false;
            console.error(console.error())
        });
    
    let loadedMeetups = meetups;

    function saveMeetup(event) {
        editMode = null;
    }

    function cancelEdit() {
        editMode = null;
        editedId = null; 
    }

    function showDetails(event) {
        page = 'details'
        pageData.id = event.detail;
    }

    function closeDetails() {
        pageData = {}; 
        page = 'overview';
    }

    function startEdit(event) {
        editMode = 'edit'; 
        editedId = event.detail;
    }
</script>

<style>
    main {
        margin-top: 5rem;
    }
 </style>

<Header />

<main>
{#if page === 'overview'}
    {#if editMode === 'edit'}
    <EditMeetup id={editedId} on:save="{saveMeetup}" on:cancel={cancelEdit}/>
    {/if}
    {#if isLoading}
        <LoadingSpinner />
    {:else}
    <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit="{startEdit }" on:add="{() => editMode = 'edit'}" />
    {/if}
{:else}
<MeetupDetail  id={pageData.id} on:close={closeDetails} />
 {/if}
</main>

