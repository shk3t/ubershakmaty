# Methods

## 1. Initialize game - [server]/game/init_game
  Sample body:
  ```
    {
      "timer": "00:01:00|1"
    }
  ```
  Sample response:
  ```
    {
      "pk": 8,
      "white_player": 1,
      "black_player": 2,
      "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "result": null,
      "white_timer": "00:01:00",
      "black_timer": "00:01:00",
      "increment": 1
    }
  ```

  ## 2. Make move - [server]/game/make_move
  Sample body:
  ```
    {
	    "game_id": 8,
      "move_uci": "b2b3"
    }
  ```
  Sample responses:
  * Legal move:
    ```
      {
        'board_fen': 'rnbqkbnr/p1pppppp/1p6/8/8/1P6/P1PPPPPP/RNBQKBNR w KQkq - 0 2',
        'white_timer': '00:01:00',
        'black_timer': '00:00:53',
        'moves_made': 2
      }
    ```
  * Illegal move:
    ```
      "Illegal move"
    ```
  * Draw:
    ```
      'draw'
    ```
  * Checkmate:
    ```
      'checkmate'
    ```
  * Loss by time:
    ```
      "time is up for black"
    ```
