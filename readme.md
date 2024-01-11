# TMA Tunnel
A utility that allows you to make a server on your local computer public uses [ngrok](https://ngrok.com/docs/getting-started/). The created address will be automatically inserted into the menu button of your telegram bot. Once the tunnel is stopped, the default button will be returned.
\
\
![image.png](https://i.postimg.cc/mgpgHpYv/min.png)
## Install
```shell
npm install tma-tunnel -g
```
## Usage

First of all, it is assumed that you have already installed [ngrok](https://ngrok.com/docs/getting-started/) on your device.

### 1. Configuration file
Create a `tma-tunnel.config.json` file in the root of the project. Specify the following parameters in it:
#### `botToken`
Token from the bot settings is required to work with the API. Required field.
#### `userIds`
An array of user ids who need to change the link in the menu button. Required field.

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
Or if the dependency is installed locally:
```shell
npx tma-tunnel --port=5172
```

---
\
Order the development of TMA or TON projects:

* tg: [t.me/tgappsman](t.me/tgappsman)
* vk: [vk.com/dev_juice](vk.com/dev_juice)
* website: [juicedev.org](juicedev.org)
