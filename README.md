# Blue Vending: Vending Machine

Blue Vending is a Unicorn company that sells Vending machines to the market and we want
to launch a new product called Simple Vending Machine for SME in our partnership. It will
help them to produce the cheapest cost.
We need to develop software for Blue Vending Machine to have simple functionality and
easily add a new expansion in the future.

## Requirements
### Customer Operation
1. A vending machine should accept coins of 1,5,10 THB and banknotes of 20, 50, 100,
500, 1,000 THB
2. Allow users to select products a product available in stock
3. The system should calculate these logics
    - enough money to buy the chosen product
    - enough coin or banknote for change to the customer
    - stock available for sale
4. Return the number of remaining changes and adjust product stock and coin &
banknote stock in the vending machine

### Non-Functional Requirement
1. Make sure your solution easily for maintainability or add new features by modular
2. Your solution should be well-structured and easy to understand
3. The option depends on your preference below
    - As a Front-end engineer: the application should have responsive UI, with
    good UX
    - As a Back-end engineer: the application should provide CRUD API endpoints
    to manage stocks, store them in the database
    - As a Full-stack engineer: pick either of the above requirements

## Directories Description

### `/back-end`
Contains FastAPI serving endpoint to interact with MongoDB and also some MongoDB set. up

### `/blue-vending-machine`
Contains vending machine prototype app, implemented using Next.js with TailwindCSS for styling and Recoil for state management


## Usage
The project is dockerized (Web application, FastAPI api, Mongodb). So, to start the project, simply run

```sh
docker-compose up --build
```

This will initialize MongoDB with some mock products data in `/back-end/mongo_image/seed_data.js`. The API server will listen on port 8080, which can check out further details on **localhost:8080/docs**. Lastly, the web application can be access on **localhost:3000**.

## Extra notes
- Web application UI are only design for desktop but you can try on mobile view if you want (Hopefully not lol).
- This is my first experience using FastAPI. Really liked it!
- There are still a lot more improvements those can be done (Unit testing, E2E test, Responsive UI, API, Data Modeling, Persist machine remaining money data, Code refactoring, etc.). But due to time constraint and my skill level, I couldn't make it on time. Apologize for that.