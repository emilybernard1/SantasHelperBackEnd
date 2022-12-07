# Santa's Helper
## Overview
This is a full stack application where users can create wish lists of Christmas gifts and denote whether each item has been bought and wrapped. Users will also be able to keep a "wishlist for Santa" called "Santa's Secrets".

## Deployed Link
TBD
<!-- also include link to other repo which consumes this api  -->
## Technology Used
  - HTML
  - CSS
  - Mongoose
  - MongoDB
  - Express.js
  - React 
  - Node 
  - Bootstrap

(for alternate backend)
  - Python
  - Django

## Stretch	Goals
- add a field for where the gift is stored
- have a checkbox where the user can chose an image to go with the wish list: either a candy-cane, christmas tree, or a gift box

## Version 2
- add a field for where the gift is stored
- have a checkbox where the user can chose an image to go with the wish list: either a candy-cane, christmas tree, or a gift box
- make it so users can upload pictures of the recipients to go with their wish lists
- make it so the gifts show up in separate fields so they can individually be marked as bought or wrapped, rather than all or nothing
- style the Santa's Secrets so it looks more like a roll of parchment and so that the messages become one big message, rather than individual messages

## Entity Relationship Diagrams
![erd](/images/ERD-SantasHelper.png "ERD")

## Route Table
![RouteTable](/images/RouteTableSantasHelper.png "RouteTable")

## Schedule
- Friday 11/18: Project planning, finish readme, including wireframes and ERDs
- Monday 11/21: Pitch idea, seed db, get the back end going
- Tuesday 11/22: Testing with postman and make sure back end is nearly good to go
- Saturday 11/26: Finish up back end and start on front end with react
- Sunday 11/27: Front end with react
- Monday 11/28: Front end with react, should be near MVP
- Tuesday 11/29: Goal: MVP status, work on front end styling, deployment party
- Wednesday 11/30: Polish all details
- Thursday 12/1: Polish all details
- Friday 12/2: Presentation day

## MVP
- An app that looks and functions on a basic level; with a navigation bar, div boxes that display the users wish lists for their loved ones, the capability to update and delete said lists, as well as make secret lists for stocking stuffers (Santa's Secrets).

## Example Seed Data 
```
const startGifts = [
    { name: "Corgi", gift: "Schitt's Creek Game", type: "board game", isBought: true, isWrapped: true },
    { name: "Vivi", gift: "Art Class Sweater", type: "clothing", isBought: true, isWrapped: false },
    { name: "Beth", gift: "Magic Mixies", type: "toy", isBought: false, isWrapped: false },
    { name: "Ryleigh", gift: "christmas pjs", type: "clothing", isBought: false, isWrapped: false },
    { name: "Gavin", gift: "christmas pjs", type: "clothing", isBought: false, isWrapped: false }
]
```

## Available Scripts

In the project directory, you can run:
<!-- currently: you have your package.json and package-lock.json in your .gitignore so we actually can't do any of this / we want those so we CAN share the packages that you need to run it, without sharing the node modules themselves ( being so massive it's nearing 'black-hole' status) -->
### `npm run start` 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
<!-- have we tried these commands ? do they work in the repo?  -->
### `npm test`
<!--  -->
### `npm run build`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).