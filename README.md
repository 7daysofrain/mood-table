# Mood Table Project 2

#Image setup

Despues de meter la imagen de Raspberry OS. Para habilitar la red:

create a wpa_supplicant.conf file in 'boot':
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=ES

network={
 ssid="<Name of your wireless LAN>"
 psk="<Password for your wireless LAN>"
}
```

Enable SSH on a headless Raspberry Pi (add file to SD card on another machine)
   For headless setup, SSH can be enabled by placing a file named ssh, without any extension, onto the boot partition of the SD card from another computer. When the Pi boots, it looks for the ssh file. If it is found, SSH is enabled and the file is deleted. The content of the file does not matter; it could contain text, or nothing at all.

## Screen

Importante antes
```
sudo apt update
```
 Las instrucciones
 https://tengfone.medium.com/setting-up-raspberry-pi-4-3-5-touch-screen-xpt2046-349e484a7813
 
## Kiosk mode

## Comandos Arduino
arduino-cli compile -b arduino:avr:nano:cpu=atmega328 controllerr2
arduino-cli upload -v -p /dev/ttyUSB0 -b arduino:avr:nano:cpu=atmega328 controllerr2
