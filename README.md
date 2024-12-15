# wallet-app

#### A simple React.js, Tailwind Css, Nest.js, Prisma, PostgreSql app with a wallet management features including: creating an account & depositing, withdrawing and transfering funds to peers.

### Tools used

#### Frontend
##### React.js: Popular UI library for building component-based interfaces
##### Vite: Modern build tool offering faster development and optimized builds
##### Tailwind CSS: Utility-first CSS framework for rapid styling without writing custom CSS
##### Headless UI: Accessible, unstyled components that integrate perfectly with Tailwind
#### Backend
##### Nest.js: TypeScript-based Node.js framework offering:
Modular architecture
Built-in testing support
Easy API documentation
Strong typing system
Dependency injection
Prisma: Modern ORM providing:
Type-safe database queries
Auto-generated types
Easy schema management
Database migrations
PostgreSQL: Robust relational database with:
ACID compliance
JSON support
Advanced querying capabilities
Swagger: Automatic API documentation integrated with Nest.js for:
Interactive API testing
Clear endpoint documentation
Request/response schema visualization
##### Key Benefits
Full-stack TypeScript support
Excellent developer experience
Built-in testing capabilities
Automatic API documentation
Scalable and maintainable architecture

### How to run the app locally

To run this project locally on your machine, follow these steps:

#### Prerequisites

Make sure you have the following installed:
- Node.js
- npm or yarn
- postgresql 
  

#### Clone the Repository

First, open you terminal window & clone this repository to your local machine:
```bash
git clone https://github.com/Dagmawi-22/wallet-app.git
```
then, cd into the server folder:

```bash
cd wallet-app/server
```
then, install the required libraries:
```bash
yarn install
```

then, customize your .env variables & run the migrations and generate your prisma client:
```bash
npx prisma migrate dev
```

then, start the app:
```bash
yarn start dev
```
then, cd into the client folder using a new terminal window:

```bash
cd ../client
```
then, install the required libraries:
```bash
yarn install
```
Finally, start the app:
```bash
yarn dev
```

Finally, open your preferred browser and go to http://localhost:5173 and browse through the app.
Thank you!


