The project is a website titled “Subscriberz” for movies subscription management.
The admin, which is parallel to the business manager, can perform CRUD action on the users(employees) and set them permissions.
Users can perform CRUD actions on the movies inventory and the subscribers, according to each user’s permissions.
The first user is the admin.

On MongoDB we manage 2 databases:
1. UsersDB with “users” collection
2. Subscriptions with 3 collections: members, movies, and subscriptions.

The project is consisted of 3 components:
1. Client - ReactJS
2. Server1 - REST api for client side + manages UsersDB database and 2 local JSON files: Permissions and Users(contains user details)
3. Server2 - REST api for Server1 + manages Subscriptions database

####How to run the project:
1. Run ’npm install’ for each of the components: server2, server1 and client.
2. Run ‘npm start’ on server2 and browse ‘localhost:3002’ and refresh once.
3. Run ‘npm start’ on server1 and client.
4. Browse ‘localhost:3000’ (or any other port specified by the client log)

The project’s next stage would be to automate as much as possible all of the above :)