# TMA Tunnel

## Usage

First of all, it is assumed that you have already installed [ngrok](https://ngrok.com/docs/getting-started/) on your device.

### 1. Configuration file
Create a `tma-tunnel.config.json` file in the root of the project. Specify the following parameters in it:
#### `botToken`
Token from the bot settings is required to work with the API. Required field
#### `userIds`
An array of user ids who need to change the link in the menu button. Required field

Example file:
```json
{
  "botToken": "12345:N9tOKvKA8FEnccRCJewzEzPYyyLlWnrqWSQ",
  "userIds": [12345, 23456]
}
```

### 2. Launch
Run your project and make a call in the project console:
```shell
tma-tunnel --port=5172
```
