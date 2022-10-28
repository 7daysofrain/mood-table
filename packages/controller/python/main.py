#!/usr/bin/env python3
import serial
import random
import websocket
import _thread
import time
import rel
import json

class Object:
       def __init__(self, **attributes):
          self.__dict__.update(attributes)

def on_message(ws, message):
    print(message)

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
    print("Opened connection")

if __name__ == '__main__':

    websocket.enableTrace(True)
   ws = websocket.WebSocket()
         ws.connect("ws://echo.websocket.events")
         ws.send("Hello, Server")
         print(ws.recv())

    ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)
    ser.reset_input_buffer()

    while True:
        number = ser.read()
        if number != b'':
            if int.from_bytes(number, byteorder='big') == 18:
                led_number = random.randint(1,4)
                print("Button has been pressed.")
                print("Sending number " + str(led_number) + " to Arduino.")
                ser.write(str(led_number).encode('utf-8'))
                msg = Object(
                        type = "changeFX",
                        message = "Blue mood blobs"
                    )
                ws.send(json.dumps(msg))
import websocket


wsapp.run_forever()
