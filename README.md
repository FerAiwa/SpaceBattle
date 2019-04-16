# Spaceship Battle

3rd challenge at Hack a BOS course! A space war simulator! 👾🎮

## Live Demo

[Spaceship Battle v2.0 👾](https://feraiwa.github.io/spaceBattle/)

### Second release: 16/04/2019
- **New Features**
  - **Logger :**
    The game now has its own logger, with diferent colors and emojis representing the flow of the game. There´s no need to check the dev-console anymore.
  - **Color units :**
    Units now have a diferent color depending on the player.
    
  - **Animations :** 
    - Active Sector: Is now marked with a green background to improve the action tracking.
    - Selection: Active units will be marked with a round colored border.
    - Unit dead: Blinks a few times before vanishing.
  - **Responsive design**
    Implemented diferent views for tablet and large screens.
    The game is designed to be optimally displayed in tablet or higher resolutions, yet it could be watched in 360px devices by hiding the unit counter. 
  - **New units :** Added 2 new unit to the tier3 and tier4, to have more diversity.

- **Major updates**
  - **Movement:** Units now expend movement points while moving to a new sector, trying to find valid targets.
  - **View** parts are now separated from the game logic.
  - **Medics:** Fixed a bug that caused ally units to stack infinite shield when the medic power surpass the maximum shield ammount





### First release: 03/04

This is a beta for a module-ending exercise.
· The [basic rules](https://github.com/FerAiwa/starBattle/blob/master/ejercicio.final.md) (spanish).

I blended and expanded some of them to have some extra fun while developing it.
I LOVE videogame design, so after I took my pencil and start drawing some ideas, I realy couldn´t stop myself)

### Add-ons

This version of the spaceship battle has some extra features like:

- Special Units:
  - **Medical Spaceships**: They look for ally targets and restore/boost their shield. (_Vitalis & Renovatio I_)
- Config (_can be edited in the main.js file_)

  - 2+ extra players: It should allow you to play as many as you want. (The UI would probably look ugly, do)

  * Extra ships: Edit the number in RULES.typelimit to get more ships.
  * Resize battlefield: Same for RULES.battlefieldSize. It will always result in a square battlefield. 2n
  * Game Speed: Adjust the rhytm for the logger messages. (seconds)

- 4 battleship types with increasing stats and several choices.
- A random army generator.
