# Manga-announcement

## Install deps

`sudo apt update`  
`sudo apt install git`  
`git --version`

`apt install curl`  
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

`nvm install last`

`git clone https://github.com/Findoss/Manga-announcement.git`  
`npm ci`  
`npm install pm2 -g`

## Env

`touch .env`  
`nano .env`

## Use

`pm2 start index.js`  
`pm2 reload index.js`
`pm2 logs index.js`
`pm2 list`  
`pm2 monit`

## Backup

files

`db.json`  
`.env`
