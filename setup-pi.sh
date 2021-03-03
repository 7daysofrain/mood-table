#basics
sudo apt install build-essential git
sudo apt install gcc-4.8 g++-4.8 && export CXX=g++-4.8
sudo apt install libusb-1.0-0 libusb-1.0-0-dev
sudo apt-get install libasound2-dev

# hyperion

wget https://github.com/hyperion-project/hyperion.ng/releases/download/2.0.0-alpha.9/Hyperion-2.0.0-alpha.9-Linux-armv7l.deb
apt install ./Hyperion-2.0.0-alpha.9-Linux-armv7l.deb

# node
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -

# project
git clone https://github.com/7daysofrain/f1-led.git
cd f1-led
sudo npm install
sudo npm install node-hid --build-from-source
