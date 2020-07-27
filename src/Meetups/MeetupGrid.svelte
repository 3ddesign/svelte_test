<script>    
    import MeetupItem from './MeetupItem.svelte';
    import MeetupFilter from './MeetupFilter.svelte';

    export let meetups;

    let favsOnly = false;

    $: filteredMeetups = favsOnly ? meetups.filter(meetup => meetup.isFavorite) : meetups;

    function setFilter(event) {
        favsOnly = event.detail === 1;
    }
</script>

<style>
    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    #meetup-contorls {
        margin: 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<section id="meetup-contorls">
    <MeetupFilter on:select={setFilter} />
</section>

<section id="meetups">
    {#each filteredMeetups as meetup}
        <MeetupItem
        id={meetup.id}
         title={meetup.title} 
         subtitle={meetup.subtitle}
         description={meetup.description} 
         address={meetup.address} 
         email={meetup.contactEmail} 
         imageUrl={meetup.imageUrl}
         isFav={meetup.isFavorite}
         on:showdetails 
         on:edit/>
    {/each}
</section>