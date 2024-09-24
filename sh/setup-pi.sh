# use a 32 bit raspberry image

# basics
sudo apt update
sudo apt-get update
sudo apt install build-essential git -y
sudo apt install libusb-1.0-0 libusb-1.0-0-dev -y
sudo apt install libudev-dev -y
sudo apt-get install libasound2-dev -y

# dancing-pi
git clone https://github.com/naztronaut/dancyPi-audio-reactive-led.git
cd dancyPi-audio-reactive-led/python/install
sed -i -e 's/python-/python3-/g' install.py
sed -i -e 's/rpi_ws281x/rpi_ws281x==4.3.4 --break-system-packages/g' install.py
sudo python3 install.py
cd ..
## luego ajustar PIN GPIO (12) y NUM DE LEDS (186)
sed -i -e 's/N_PIXELS = 144/N_PIXELS = 186/g' config.py
sed -i -e 's/LED_PIN = 18/LED_PIN = 12/g' config.py

# hyperion

wget https://github.com/hyperion-project/hyperion.ng/releases/download/2.0.16/Hyperion-2.0.16-Linux-armv7.deb
sudo apt install ./Hyperion-2.0.16-Linux-armv7.deb -y
sudo systemctl disable --now hyperion@pi
sudo systemctl enable --now hyperion@root

# node
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# project
git clone https://github.com/7daysofrain/mood-table.git
cd mood-table
sudo npm install -g yarn
yarn install
cd packages/controller/

# pm2
sudo npm i pm2 -g
sudo pm2 start npm --name "moodtable" -- run prod
sudo pm2 startup

sudo reboot now


## Hay que ajustar la card id en /usr/share/alsa/alsa.conf usa arecord -l para ver cual es
