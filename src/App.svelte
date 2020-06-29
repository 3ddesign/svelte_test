<script>
    import Header from './UI/Header.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';

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
            contactEmail: 'code@test.com'
        },
                {
            id: 'm2',
            title: 'test title 2',
            subtitle: 'test substitle 2',
            description: 'test description 2',
            imageUrl: 'http://www.underconsideration.com/brandnew/archives/meetup_logo.png',
            address: '27th Nerd Road, 43243 New York',
            contactEmail: 'code2@test.com'
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
</script>

<style>
    main {
        margin-top: 5rem;
    }
</style>

<Header />

<main>
    <form on:submit|preventDefault="{addMeetup}">
        <div class="form-control">
            <label for="title">Title</label>
            <input type="text" id="title" bind:value="{title}" />
        </div>
        <div class="form-control">
            <label for="subtitle">Subtitle</label>
            <input type="text" id="subtitle" bind:value="{subtitle}" />
        </div>
        <div class="form-control">
            <label for="address">Address</label>
            <input type="text" id="address" bind:value="{address}" />
        </div>
        <div class="form-control">
            <label for="imageUrl">Image Url</label> 
            <input type="text" id="imageUrl" bind:value="{imageUrl}" />
        </div>
         <div class="form-control">
            <label for="email">Email</label>
            <input type="email" id="email" bind:value="{email}" />
        </div>       
        <div class="form-control">
            <label for="description">Description</label>
            <textarea rows="3" id="description" bind:value="{description}" />
        </div>
        <button type="submit">Save</button>     
    </form>
    <MeetupGrid {meetups} />
</main>

