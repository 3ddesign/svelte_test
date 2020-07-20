import { writable } from 'svelte/store';

const meetups = writable([
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
    ]
);

export default meetups; 
