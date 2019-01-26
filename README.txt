How the protocol works:

Client connects to server

1.- Request to join a room (JOIN_ROOM event)
2.- Server broadcast id to rest of clients in the room
3.- From there, the communication relies only on DIRECT_MESSAGES.

    Message format goes as follows {from: String, to: String, data: String}