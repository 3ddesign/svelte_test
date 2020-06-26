<script>
    import Header from './UI/Header.svelte';
    import MeetupItem from './Meetups/MeetupItem.svelte';


    const meetups = [
        {
            id: 'm1',
            title: 'test title',
            substitle: 'test substitle',
            description: 'test description',
            imageUrl: 'http://www.underconsideration.com/brandnew/archives/meetup_logo.png',
            address: '27th Nerd Road, 43243 New York',
            contactEmail: 'code@test.com'
        },
                {
            id: 'm2',
            title: 'test title 2',
            substitle: 'test substitle 2',
            description: 'test description 2',
            imageUrl: 'http://www.underconsideration.com/brandnew/archives/meetup_logo.png',
            address: '27th Nerd Road, 43243 New York',
            contactEmail: 'code2@test.com'
        }
    ];
</script>

<style>
    #meetups {
        margin-top: 5rem;
    }
</style>

<Header />

<section id="meetups">
    {#each meetups as meetup}
        <MeetupItem />
    {/each}
</section>

