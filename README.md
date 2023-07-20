# youTours

The aim of this project was connect users to an easy to use application that allowed them to browse stadium tours around Europe. Going on holiday to Spain? Curious about visiting on of the many renowned stadiums? This app will allow you to book a tour for the date you visit, leave reviews and interact with other users who have a similar taste in clubs.

## Installation and Set-up Guide

1. Fork and clone the repository:

   ```
   git clone https://github.com/alexbotha/capstone-stadium-planner
   ```

2. Navigate to the project directory and install the necessary gems:

   ```
   cd capstone-stadium-planner
   bundle install
   ```

3. Navigate to the client directory and install the necessary npm packages:

   ```
   cd client
   npm install
   ```

4. In project root, set up the database and seed data:

   ```
   rails db:create
   rails db:migrate
   rails db:seed
   ```

5. In a new terminal window, start the Rails server:

   ```
   rails s
   ```

6. In another terminal window, start the React app:

   ```
   cd client
   npm start
   ```

7. Visit `http://localhost:4000` in your browser to use the app if window not opened automatically.

## Technologies Used

### Languages and Frameworks

- JS
- React.js
- Ruby
- RoR
- CSS
- React-bootstrap
