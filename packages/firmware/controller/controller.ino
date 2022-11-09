#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

#define LED_1_PIN 9
#define LED_2_PIN 10
#define LED_3_PIN 11
#define LED_4_PIN 12

#define BUTTON_PIN 5

byte lastButtonState = LOW;
byte currentButtonState = LOW;
unsigned long lastButtonDebounceTime = 0;
unsigned long buttonDebounceDelay = 20;

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void powerOffAllLEDs()
{
    digitalWrite(LED_1_PIN, LOW);
    digitalWrite(LED_2_PIN, LOW);
    digitalWrite(LED_3_PIN, LOW);
    digitalWrite(LED_4_PIN, LOW);
}
void displayStandBy()
{

  display.clearDisplay();

  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  // Display static text
  display.println("Ready");
  display.setCursor(0, 20);
  display.setTextSize(1);
  display.println("Push button");
  display.display(); 
}
void setup()
{
  Serial.begin(115200);
  pinMode(LED_1_PIN, OUTPUT);
  pinMode(LED_2_PIN, OUTPUT);
  pinMode(LED_3_PIN, OUTPUT);
  pinMode(LED_4_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);

  powerOffAllLEDs();

  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  delay(2000);
  displayStandBy();
}

void loop()
{
  byte readValue = digitalRead(BUTTON_PIN);

  if (readValue != lastButtonState) {
    lastButtonDebounceTime = millis();
  }

  if (millis() - lastButtonDebounceTime > buttonDebounceDelay) {
    if (readValue != currentButtonState) {
      currentButtonState = readValue;
      if (currentButtonState == HIGH) {
        Serial.write(18);
        digitalWrite(LED_1_PIN, HIGH);
      }
      else {
        digitalWrite(LED_1_PIN, LOW);
      }
    }
  }

  lastButtonState = readValue;

  if (Serial.available() > 0) {
    int ledNumber = Serial.read() - '0';

    display.clearDisplay();
    display.setCursor(0, 0);
    display.setTextSize(2);
    display.println("Comando: " + ledNumber);
    display.display();

    powerOffAllLEDs();

    switch (ledNumber) {
      case 1:
        digitalWrite(LED_1_PIN, HIGH);
        break;
      case 2:
        digitalWrite(LED_2_PIN, HIGH);
        break;
      case 3:
        digitalWrite(LED_3_PIN, HIGH);
        break;
      case 4:
        digitalWrite(LED_4_PIN, HIGH);
        break;
      default:
        // wrong pin number, do nothing
        // all LEDs will be powered off
        break;
    }
  }
}
