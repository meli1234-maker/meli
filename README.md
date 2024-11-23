# Seven and a half game

## Implementation:

I have added a card image to make the game more visually appealing and engaging for the player. Additionally, to make the experience more interactive and dynamic, I have included a GIF at the end of the game. I also added emojis in the player information section, such as when entering their name and balance, which makes the experience more fun and enjoyable. To add more excitement, emojis also appear when the player wins or loses, making the result feel more emotional and lively.

In terms of the JavaScript, beyond the specifications outlined in the prompt, I have researched the official rules on Wikipedia and incorporated additional rules to make the game more complete and accurate. For example, if the player draws a 7.5 with their first two cards (7,5 natural), they win automatically. Conversely, if the dealer gets a 7.5 with their first two cards, the player loses immediately.

I have also accounted for situations where both the player and dealer could end up with the same score, which, while uncommon, ensures that the game functions properly in all scenarios. This extra attention to detail helps guarantee that the game runs smoothly and provides an authentic experience.

To keep the game's interface simple yet appealing, I added colors to the background and text, making it more visually striking and engaging for me as a player. This enhances the overall aesthetic and draws my attention, providing a more enjoyable and attractive experience.

I used an async function to delay the display of each card the dealer draws. This creates a more exciting and suspenseful experience for me as a player, as I can see the game unfold slowly and anticipate whether I'm going to win or lose. By adding a one-second delay between each card, I heighten the drama of the game and make it more interactive for myself as the player.

## Functions oj Javascript:
- **startGame():** Starts the game by getting the player's name and balance, validating the information, and displaying it on the screen. It hides the initial screen and shows the game controls to begin playing.
- **newRound():** Starts a new round by resetting both the player's and dealer's hands, generating a new shuffled deck, and updating the screen to reflect the fresh game state.
- **placeBet()::** Allows the player to place a bet before starting the game. It checks if the bet is within the player's balance, then hides the betting section and shows the buttons to draw cards.
- **generateDeck():** Creates a deck of 40 cards, in line with the "Sette e Mezzo" rules, assigning the appropriate values to each card. It also shuffles the deck to randomize the card order at the start of the game.
- **drawCard():** The player draws a card from the deck. If the player exceeds 7.5 points, the round ends immediately. It also checks if the player gets a 7.5 natural (automatically winning the game).
- **async dealerDraws():** The dealer draws cards according to the game rules. The dealer continues drawing cards until they either have a higher score than the player or exceed 7.5 points, in which case the player wins. Each card drawn is displayed with a one-second delay.
- **endRound():**  Ends the round by determining whether the player has won, lost, or if there's a tie. It updates the screen with the result and shows the player’s current balance.
- **endGame():** Ends the game and shows the player’s final balance. It hides the game elements and displays a fun GIF animation to give a lively conclusion to the game.
- **updateDisplay():** Updates the screen to show the current cards of both the player and the dealer, as well as their respective scores. It keeps the game’s visuals in sync with the state of play.
