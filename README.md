# People Dynamics Exam Project

This project is a simple Laravel + Inertia web application for managing user profiles. Authenticated users can create, view, update, and delete their own profile entries through a clean dashboard experience.

## Features

- User registration and login
- Authenticated profile management
- Create, edit, and delete profile records
- Inertia-powered SPA-style pages with a Laravel backend
- Basic policy-based authorization so users only manage their own profiles

## Tech Stack

- PHP 8.5+
- Laravel 13
- Inertia.js + React
- Tailwind CSS
- MySQL / MariaDB

## Setup Instructions

1. Clone the repository and open the project folder.
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Copy the environment file and generate an application key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
5. Create a database and update the database settings in `.env`.
6. Run migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```
7. Start the app:
   ```bash
   php artisan serve
   ```
   In a second terminal:
   ```bash
   npm run dev
   ```
8. Open `http://localhost:8000` in your browser.

## Project Structure

- `app/Http/Controllers` – application controllers
- `app/Models` – Eloquent models such as `User` and `Profile`
- `app/Policies` – authorization rules for profile access
- `database/migrations` – database schema migrations
- `database/seeders` – seed data for testing the application
- `resources/js/pages` – Inertia React pages

## Database Schema

The database structure includes:
- `users` table for authentication and account management
- `profiles` table linked to a user through `user_id`

A SQL version of the schema is available in `database/sql/schema.sql`.
