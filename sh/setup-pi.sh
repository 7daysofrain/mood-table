# use a 32 bit raspberry image

# basics
sudo apt update
sudo apt-get update
sudo apt install build-essential git
sudo apt install gcc-4.8 g++-4.8 && export CXX=g++-4.8
sudo apt install libusb-1.0-0 libusb-1.0-0-dev
sudo apt install libudev-dev
sudo apt-get install libasound2-dev

# dancing-pi
sudo git clone https://github.com/naztronaut/dancyPi-audio-reactive-led.git
cd dancyPi-audio-reactive-led/python/install
sudo python3 install.py

## luego ajustar PIN GPIO (12) y NUM DE LEDS (186)

# hyperion

wget https://github.com/hyperion-project/hyperion.ng/releases/download/2.0.16/Hyperion-2.0.16-Linux-armv7.deb
apt install ./Hyperion-2.0.16-Linux-armv7.deb
sudo systemctl disable --now hyperion@pi
sudo systemctl enable --now hyperion@root

# node
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# project
git clone https://github.com/7daysofrain/mood-table.git
cd mood-table
sudo npm install #da error HID no pasa nada
sudo npm install node-hid --build-from-source

# pm2
sudo npm i pm2 -g
NODE_ENV=production pm2 start app/index.js
pm2 startup

