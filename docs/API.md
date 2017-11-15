# API.md

## Entity List

- Bot
- ResultSummary
- Account
- Game
	- Ranking
- Result

## Methods

### Overviews

- Games
	- Running the match
	- Getting Ranking of the game
- Matches
	- Getting a match history
	- Getting a match result
	- Getting fight log file
- Bots
	- 	Registering bot for the game
	-  Getting list of bot
	-  Getting a bot
	-  Standing a bot
- Accounts
	- Getting credentials
	- Getting other's account

### Games

#### Running the Match

*Authenticated user only*

```
post /api/v1/games/:game_name/match
```

| Field | Description | Optional |
|:--:|:--:|:--:|
| `botName` | Post bot name as identifer docker image | no |

Returns the **Result** of the game.

#### Getting Ranking of the game.

```
get /api/v1/games/:game_name/ranking
```

| Field | Description | Optional |
|:--:|:--:|:--:|
| `kind` | the kind of ranking | yes |

Returns the **Game** including **Ranking**

### Matches

#### Getting a match history:

```
get /api/v1/matches
```
*Authenticated user only*
| Field | Description | Optional |
|:--:|:--:|:--:|
| `gameName` | filtering matches where game name | yes |
| `won` | 1 or 0, for filtering | yes |

Returns an array of **Result**.

#### Getting a match result:

```
get /api/v1/matches/:id
```
*Authenticated user only*
> id is number(bigint).

Returns the **Result** including fights.

#### Getting fights log file:

```
get /api/v1/matches/:id/:ext
```
*Authenticated user only*
> ext is one of csv, json

Returns the **Result** and downloading a file of fights.

### Bots

#### Registering bot for the game:

```
post /api/v1/bots/:game_name
```

*Authenticated user only*

| Field | Description | Optional |
|:--:|:--:|:--:|
|`url`| public or private git hub repository url | no |

Returns the registered **Bot**.

#### Getting list of bot:

```
get /api/v1/bots
```

*Authenticated user only*

| Field | Description | Optional |
|:--:|:--:|:--:|
| `gameName` | Filter bots where game name | yes |
| `maxId` | Get a list of bots with ID less than this value | yes |
| `sinceId`| Get a list of bots with ID greater than this value | yes |
| `limit`	|Maximum number of bots to get (Default 40, Max 80)|yes|

Returns an array of **Bot**s.

#### Getting a bot:

```
get /api/v1/bots/:id
```

*Authenticated user only*

> id is number(bigint)

Returns the **Bot**.

#### Standing a bot:

```
put /api/v1/bots/:id
```
*Authenticated user only*
*Owner only*

Returns the **Bot**.


### Accounts

#### Getting credentials

```
get /api/v1/accounts/credentials
```
*Authenticated user only*

Returns the authenticated user's **Account**.

#### Getting other's account.

```
get /api/v1/accounts/:username
```

Returns the other's **Account**.

### Documents

これはAPIというよりもhtmlを準備して別のwebサーバをgetしたほうがいいと思う

### Forum

## Entities

### Bot

|Attribute|Description|Nullable|
|:--------|:----------|:--------|
|`id`| The ID of the **Bot**	|	no |
|`name`| The name of the **Bot**, it's unique for each **Account** | no |
|`authorId`| The ID of the **Bot**'s **Author** | no |
|`gameId`| The ID of the **Game** of **Bot** | no |
|`isPrivate`| Which repository type is private or public. | no |
|`qualified`| Whether to win for practice bot. It qualified to assign for match | no |
|`standBy`| Whether to ready for match | no |
|`repoUrl`| The url of git repository which we can fetch bot from there | no |
|`resultSummaries` | The json array of **ResultSummary** which the **Bot** | yes|

### Result
|Attribute|Description|Nullable|
|:--------|:----------|:--------|
|`id`|The id of **Result**|no|
|`botIds`| The set of bots which joined the match |no|
|`gameId`| the ID of **Game** |no|
|`winnerId`| The ID of winner (botId) | yes|
|`status`| active, finished, ...| no|
|`fights`| the number of fights|yes|
|


### ResultSummary

|Attribute|Description|Nullable|
|:--------|:----------|:--------|
|`id`|The id of **Result**|no|
|`botIds`| The set of bots which joined the match |no|
