# wallet-app

#### A simple React.js, Tailwind Css, Nest.js, Prisma, PostgreSql app with a wallet management features including: creating an account & depositing, withdrawing and transfering funds to peers.
![image](https://github.com/user-attachments/assets/aa1961b0-733c-4dd0-b497-e3a10bc55c38)
![image](https://github.com/user-attachments/assets/bd37be4d-2239-4674-8ff7-828332cb032e)
![image](https://github.com/user-attachments/assets/124f39a1-6eaa-458a-a492-4654dea67b7a)




### Tools used

- React.js - for building the client side logic
- Vite (14) - as a build tool for a seamless build and development experience
- Tailwind Css - for a nice looking UI without a native css
- headless-ui - for a good looking modal components
- Nest.js - for handling the server logic
- Prisma - for interacting with the PostgreSql database
- PostgreSql - for storing data
- Swagger - for documenting the Nest.js API

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


