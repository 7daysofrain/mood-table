# Created using this article
# https://reelyactive.github.io/diy/pi-kiosk/

sudo apt-get install --no-install-recommends xserver-xorg -y
sudo apt-get install --no-install-recommends xinit -y
sudo apt-get install --no-install-recommends x11-xserver-utils -y
sudo apt-get install chromium-browser -y
sudo apt-get install matchbox-window-manager xautomation unclutter -y
sudo apt-get install fonts-noto-color-emoji -y
cp kiosk ~/kiosk
sudo chmod 755 ~/kiosk
echo 'xinit /home/pi/kiosk -- vt$(fgconsole)' >> ~/.bashrc
sudo echo 'display_hdmi_rotate=1'>> /boot/config.txt
echo "Don't forget enable autologin using raspi-config"
read -p "Do you want to reboot now? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    sudo reboot now
fi
