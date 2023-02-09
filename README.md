# Pokemon Stats Api

Built Pokemon Stats site using online tutorial to learn how to get specific data from api and display it in react website.

- Currently best viewed on Desktop or Laptop.

## How to use Pokemon Stats

Type your Pokemon into the search box or choose suggested pokemon in the dropbox and click "Search Pokemon" button. Your pokemon's data will be displayed on screen. 

## Things I learnt

- How to call data from api
- How to access each array and creating a path to specific data
- How to display that that data on the front end

## Improvements I've made to site

- Problem: Input could only take lower case letters otherwise would throw errors.
    - Solution: using Regex .toLowerCase() input could now take upper or lower case letters and still retrieve correct data.
- Problem: For users who are unfamiliar with Pokemon won't know what to search.
    - Solution: Create autocomlete on search box to suggest pokemon to search. By ether using the first letter they type or by scrolling through suggestions box. Adding pokemon sprites to help give user an image to help recognise what pokemon look like.