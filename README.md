# Tic-Tac-Toe: An Intermediate JavaScript Project

## Table of Contents
1. [Overview](#overview)
2. [Scope](#scope)
3. [The Game](#the-game)
4. [Future Considerations](#future-considerations)

## Overview
This is a mini JavaScript project from the [JavaScript course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript) hosed by [The Odin Project](https://www.theodinproject.com/).

The aim of this project is to create a browser based game of tic-tac-toe.

This is my attempt at completing this project.

## Scope
- [x] Project is to use HTML, CSS, and JavaScript
- [x] The game needs to include
- [x] Aim to minimise global code
- [x] Interactive UI
    - [x] User can mark the chosen grid cell
    - [x] Button to start a new game and reset the game once it's finished
    - [ ] User can input their own player names
    - [x] Display element that shows once a game has finished

## The Game
To play the game, please visit the following website: https://je-richards.github.io/odin-tic-tac-toe/

## Future Considerations

- Remove instances of `console.log()` throughout the JS script.
    - These were originially included as the game was build to be played in the console initially. They were also useful to spot errors whilst testing the game. But now the game is finished, they could removed.
- The dialog modal that appears when a game has finished could be improved.
    - The names of the player who won are currently hard coded. Should aim to call the names from the players object so that it would still work even if functionality was added for users to input their own player names.
- Code should be made more DRY.