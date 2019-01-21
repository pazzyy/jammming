This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## Synopsis

This is the source code for the Jammming React project from CodecAdemy. This code will let a user authenticate to Spotify, run a search for artist, album or songs and get search results. <br>
The user can then add tracks to a playlist and remove them as well. <br>
The user can rename the playlist and save the playlist to the Spotify account used during the authentication process at the start.<br>

There are some known issues that will be fixed later on such as persisting the search term after authentication reload/first search, using the enter key to trigger the search and adding feedback messages to confirm to the user that the playlist name has been changed and the playlist has been saved to his account. 

## Code Example

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Motivation

This project is part of a training program to learn React and get familiar with APIs.


## Installation

Runs **npm start** in the root directory to launch the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Run **npm run build** to build the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>


## API Reference

The project uses the Spotify API for the search and playlist save methods. https://developer.spotify.com/documentation/web-api/reference/ <br>

More specifically: 
Search API: https://developer.spotify.com/documentation/web-api/reference/search/search/<br> with https://api.spotify.com/v1/search 
User Profile: https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/ with https://api.spotify.com/v1/me <br>
Playlist: https://developer.spotify.com/documentation/web-api/reference/playlists/ with https://api.spotify.com/v1/playlists/{playlist_id}/tracks and https://api.spotify.com/v1/users/{user_id}/playlists<br>



## Tests

Run **npm start** in the root directory. <br>
Type in a search term and click on "Search<br>
Accept permissions (or login and accept persmissions)<br>
Enter the search term again and click on "Search" <br>
Add any track to your playlist. You can remove any track you want as well <br>
Rename your playlist by replacing "New Playlist" <br>
Click "Save to Spotify" button <br>
Go to the Spotify account used for authentication and find your playlist. Enjoy! <br>

## Contributors

You can contact me on Twitter [https://twitter.com/pezetp] and LinkedIn [https://www.linkedin.com/in/pascalpezet/] if you have any question.

## License

This code is free to re-use as training material but no commercial application is permitted without prior consent. 
