# two_step_verification_project

A simple React.js, Express.js in which I implemented two step verification

To run:

creatte backend/.env file with:
GMAIL='emailYouSendFrom@gmail.com'
APPLICATION_PASSWORD='application password generated for the gmail account'

navigate to backend folder
npm run build - to build typescript project
node --env-file .env './dist/index.js' - to run

then navigate to frontend folder
npm run dev

backend endpoints tested in hoppscotch

To add a user send post request to http://localhost:4000/user endpoint with json body like this:
{
"email": "yourEmail@gmail.com",
"password": "password"
}
