import 'dotenv/config';
import eventsData from './data.json';
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.ENDPOINT) // Your API Endpoint
    .setProject(process.env.PROJECT_ID); // Your project ID

const databases = new Databases(client);

const addData = async () => {
    try {
        for (let idx = 0; idx < eventsData.length; idx++) {
            const eventData = eventsData[idx];

            const eventContacts = [];
            for (let j = 0; j < eventData.contacts.length; j++) {
                const contact = eventData.contacts[j];
                const res = await addContacts(eventData.id, contact);
                eventContacts.push(res.$id);
            }


            delete eventData.participants;
            const eventID = eventData.id;
            delete eventData.id;
            delete eventData.contacts;

            const result = await databases.createDocument(
                process.env.DATABASE_ID,
                'events',
                eventID,
                {
                    ...eventData,
                    startdate: "2023-02-03T12:00:00Z",
                    venue: "AIIMS Patna",
                    eventContacts,
                    price: Number(eventData.price),
                    minMembers: Number(eventData.minMembers),
                    sponsorLogo: eventData.sponsorLogo ? eventData.sponsorLogo : null
                },
                ['read("any")']
            );

            console.log("Document added : ", result.name, idx);
        }


        // const result = await databases.createDocument(
        //     process.env.DATABASE_ID, // databaseId
        //     'events', // collectionId
        //     "case-presentation",
        //     {
        //         price: 100,
        //         minMembers: 1,
        //         image: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/images%2Fwj4LsKOO5qeTGsxc4825gmh8yOJ2-academics.webp-45b148e1-3215-45ad-b056-07a0073912d2?alt=media&token=81cc2b15-bd46-4de5-a3e4-2813abed8576",
        //         status: "Ended",
        //         name: "Case Presentation ",
        //         sponsorLogo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/images%2F6QdGbwRQezLbM0mpM4D69yZzpCI2-littmann.png-a12a69ea-2201-4b16-9d2e-f5129135fdd2?alt=media&token=d6b6e4dc-4556-45cb-b6a2-a986c51d314d",
        //         description: "“It's never lupus”, are the famous words of Dr House. If you've ever encountered a mysterious illness in your mundane posting, didn't round it down to Lupus and actually have an interesting diagnosis to present, this is the place for you! KAIZEN's case presentation competition is a call to all those budding physicians of tomorrow to present that mind twisting case that made your day!",
        //         rulebook: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/rulebook%2FAcademic%20Events-%20Rulebook%20Kaizen.pdf?alt=media&token=3ab6f227-ea8e-44ef-9da8-ae3a72ce4eec",
        //         prizes: "worth ₹2.5k",
        //         category: "Academics",
        //         tagline: "Academic event",
        //         sponsorName: "Littmann",
        //         startdate: "2023-02-03T12:00:00Z",
        //         venue: "Online",
        //     }, // data
        //     ['read("any")'] // permissions (optional)
        // );
    } catch (error) {
        console.error("Document not added", error);
    }
}

const addContacts = async (eventID, contacts) => {
    try {
        const result = await databases.createDocument(
            process.env.DATABASE_ID, // databaseId
            'event-contacts', // collectionId
            ID.unique(),
            {
                event: eventID,
                ...contacts
            }, // data
            ['read("any")'] // permissions (optional)
        );

        console.log(result.name);
        return result;
    } catch (error) {
        console.error(error.message);
    }
}


const getEvents = async () => {
    const result = await databases.listDocuments(
        process.env.DATABASE_ID, // databaseId
        'events', // collectionId
        [] // queries (optional)
    );

    console.log(result);
}

export { addData, addContacts, getEvents };


// startdate
// venue
// eventContacts