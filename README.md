The project is a website titled “Subscribers” for movies subscription management.
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

How to run the project:
1. Seeding the database with properties for admin user:
    1. On UsersDB add a first record with username and password of your choice
    2. In ‘Permissions’ and ‘User’ JSON files, updated the admin’s id with the ‘_id’ field of the record you created in the database.
2. Run ’npm install’ for each of the components: server2, server1 and client.
3. Run ‘npm start’ on server2 and browse ‘localhost:3000’ and refresh once.
4. Run ‘npm start’ on server1 and client.
5. Browse ‘localhost:3002’ (or any other port specified by the client log)

The project’s next stage would be to automate as much as possible all of the above :)