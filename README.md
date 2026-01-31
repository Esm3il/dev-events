# Dev-Events

Dev-Events is a full-stack web application built with Next.js that serves as a central hub for discovering and booking developer-focused events, including hackathons, meetups, and conferences. The platform features a dynamic and modern user interface, a robust backend for event and booking management, and integrated analytics.

## Features

-   **Event Discovery:** Browse a curated list of developer events on the homepage.
-   **Detailed Event Pages:** View comprehensive information for each event, including description, agenda, location, date, time, and organizer details.
-   **Event Booking:** A simple, email-based system allows users to book their spot for an event.
-   **Similar Event Recommendations:** Discover related events based on shared tags.
-   **Dynamic UI:** An interactive light-ray background effect created with WebGL (OGL) enhances the user experience.
-   **Analytics:** Integrated with PostHog for tracking user engagement and application performance.
-   **Image Management:** Utilizes Cloudinary for efficient handling of event image uploads.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Analytics:** [PostHog](https://posthog.com/)
-   **Image Management:** [Cloudinary](https://cloudinary.com/)
-   **3D Graphics:** [OGL](https://github.com/oframe/ogl) (WebGL)

## Environment Variables

To run this project locally, you need to create a `.env.local` file in the root directory and add the following environment variables:

```bash
# MongoDB Connection String
MONGODB_URI="your_mongodb_connection_string"

# Base URL of the application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Cloudinary Credentials (for event image uploads)
# You can find this in your Cloudinary dashboard
CLOUDINARY_URL="cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>"

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="your_posthog_public_key"
```

## Getting Started

Follow these instructions to set up and run the project on your local machine.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Esm3il/dev-events.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd dev-events
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and populate it with the required variables as described in the section above.

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

The application exposes the following API endpoints for managing events:

-   `GET /api/events`
    -   Fetches a list of all events, sorted by creation date.
-   `POST /api/events`
    -_   Creates a new event. Requires form-data including event details and an image file.
-   `GET /api/events/[slug]`
    -   Fetches the details of a single event by its unique slug.
