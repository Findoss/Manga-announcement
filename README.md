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

`pm2 start pm2.config.js`  
`pm2 reload app`
`pm2 stop app`
`pm2 show app`  
`pm2 logs app --lines 1000 > logs.txt`
`pm2 status`  
`pm2 monit`
`pm2 report`

## Backup

files

`db.json`  
`.env`
