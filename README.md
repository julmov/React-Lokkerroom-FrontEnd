
# Lokker-room  - Chat Applicarion

Lokker-room - chat application wich allow users create rooms, to chat with members of their their teams. This app give possibility to create acount, login, create chat rooms, write messages in that rooms,  send direct messages, users can delete or change their own messages, etc.
This project has two parts: back-end and front-end.


# Back-End
Back-end part is deploed to Heroku and contains API end-points. At first user get accesses to registration and login api´s and if chosed action was successfull app will use JWT to give access to another end-points. Without this token another end-points not available for users. 

Back-end application connected to PostgreSQL heroku. Which contains 4 tables: users, messages, message_lobbies, direct_messages.

# Front-End

On front-end we use React to create for routes to login and registration parts, which connected with FETCH function to back-end. User can login or create account and recieved from back-end token will be saved in local storage and will be used to provide access to application.
