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
`pm2 reload 0`
`pm2 stop 0`
`pm2 logs 0`
`pm2 list`  
`pm2 monit`
`pm2 report`

## Backup

files

`db.json`  
`.env`
