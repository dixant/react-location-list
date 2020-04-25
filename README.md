## React-Location-List
This is a location management Application, where user can add and manage locations.

## functionalities:
1.	If there is no location available, it would show the “ No Location.jpg”

2. add location by clicking on add location button
    1.	Location name – text field Required
    2.	City – text field, State Dropdown
    3.	Zipcode – Alphanumeric 5-10 chars optional, no space allowed
    4.	Phone number – US format
    5.	Timezone Dropdown
    6.	Facility Times – should open new window ‘04. Location Timings.jpg’
        1.	Time should be text field and user should be able to type the time in 24 hour format which would convert automatically in 12 hour format
        2.	On clicking the ‘Apply to all checked’, same time should get display on all the selected rows.
    7.	Appointment Pool – User can add multiple pools as comma separate and should display as tags separately

3.	If you get the locations via API then it should show as “02. Location List.jpg”.
    1.	Sort table data
    2.	Pagination
    3.	Phone number is formatted in US format
    4.	Edit location
    5.	Delete location


## Dependencies included in Project
1. react
2. react-dom
3. concurrently
4. json-server
5. react-bootstrap
6. bootstrap
7. reactstrap
8. node-sass
9. font-awesome-icons

## Available Scripts

In the project directory, you can run:

### `npm run start-dev`

Runs the app in the development mode.<br />
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.
