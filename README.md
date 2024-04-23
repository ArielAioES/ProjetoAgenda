<p align="center"><span style="font-size:200px;">Event Calendar System</span></p>

This is an event calendar system developed with Laravel 10 for the backend and React with Vite for the frontend. The system allows users to view a calendar of events, add events to their schedule.

## Key Features
- Viewing a calendar of upcoming events.
- Adding events to the user's schedule for quick access.
- Exploring events by category.
- User authentication for access to protected resources.

## Prerequisites
- PHP >= 7.4 and Composer installed globally.
- Node.js and npm installed globally.
- PostgreSQL 15 database (or another compatible database) configured and running locally or on a remote server.

## Installation and Usage
1. Clone this repository to your local environment:
  git clone https://github.com/ArielAioES/ProjetoAgenda.git

2. Navigate to the project directory and install backend dependencies:
   cd C:\ProjetoAgenda\back-laravel
   composer install

3. Configure the PostgreSQL database by editing the .env file with your credentials.

4. Run migrations and seeds to create tables and populate the database:
  php artisan migrate --seed

5. Start the backend server:
   php artisan serve

6. In the `frontend` directory, install frontend dependencies:
  cd C:\ProjetoAgenda\front-vite-react\front-vite-react
  npm install

7. Start the frontend server:
   npm run dev

8. Access the system in your web browser:
   http://localhost:3000

## Contributing
If you wish to contribute to this project, follow these steps:
1. Fork this repository.
2. Create a new branch with your feature:
   git checkout -b my-feature
3. Make your changes and commit:
   git commit -m 'Add my feature'
4. Push to your fork's main branch:
   git push origin my-feature

5. Open a pull request for review.

## For future implementations in this event calendar project, some ideas include:

- Reminder System: Allow users to set reminders for upcoming events.
- Advanced Search Filters: Enhance the search functionality with advanced filters such as date range, location, and event type.
- Personalized Recommendations: Implement a recommendation system that suggests events based on the user's interests and past attendance.
- Integration with External Calendars: Enable users to sync their event schedule with external calendar applications such as Google Calendar or Outlook.
- Event Registration System: Add functionality for users to register for events directly through the calendar interface.
- Event Hosting Platform: Expand the system to allow event organizers to create and manage their events, including ticketing and attendee management features.
- Multi-Language Support: Add support for multiple languages to make the system accessible to a wider range of users.
- Social Sharing: Integrate social sharing features to allow users to share events with their friends and followers on social media platforms.
- Analytics Dashboard: Provide event organizers with insights and analytics on event attendance, engagement, and demographics.

## License
This project is licensed under the MIT License.

