//Arduino Code - Rotary Encoder w push button

#include <BfButton.h>
#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7789.h> // Hardware-specific library for ST7789
#include <SPI.h>             // Arduino SPI library
#include <BasicEncoder.h>    // https://github.com/micromouseonline/BasicEncoder
#include <TimerOne.h>


// ROTARY IO
int BTN = 5; //GPIO #3-Push button on encoder
int DT = 3; //GPIO #4-DT on encoder (Output B)
int CLK = 4; //GPIO #5-CLK on encoder (Output A)

// ST7789 TFT module connections
int TFT_CS = 10;
int TFT_RST = 8;  // define reset pin, or set to -1 and connect to Arduino RESET pin
int TFT_DC = 9;  // define data/command pin
 
// Initialize Adafruit ST7789 TFT library
Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);
// Setup a RotaryEncoder
BasicEncoder encoder(DT, CLK);
// Setup Button
BfButton btn(BfButton::STANDALONE_DIGITAL, BTN, true, LOW);

int counter = 0;

//Button press hanlding function
void pressHandler (BfButton *btn, BfButton::press_pattern_t pattern) {
  switch (pattern) {
    case BfButton::SINGLE_PRESS:
      tft.fillScreen(ST77XX_BLACK);
      testdrawtext("Single push", ST77XX_CYAN); 
      break;
      
    case BfButton::DOUBLE_PRESS:
      tft.fillScreen(ST77XX_BLACK);
      testdrawtext("Double push", ST77XX_CYAN); 
      break;
      
    case BfButton::LONG_PRESS:
      tft.fillScreen(ST77XX_BLACK);
      testdrawtext("Long push", ST77XX_CYAN); 
      break;
  }
}
void timer_service() {
  encoder.service();
}
void testdrawtext(char *text, uint16_t color) {
  tft.setCursor(0, 0);
  tft.setTextSize(5);
  tft.setTextColor(color);
  tft.setTextWrap(true);
  tft.print(text);
}
void setup() {
  // IO Setup
  Serial.begin(115200);

  //Button settings
  btn.onPress(pressHandler)
  .onDoublePress(pressHandler) // default timeout
  .onPressFor(pressHandler, 1000); // custom timeout for 1 second

  // Screen
  // if the display has CS pin try with SPI_MODE0
  tft.init(240, 240, SPI_MODE2);    // Init ST7789 display 240x240 pixel
  // if the screen is flipped, remove this command
  tft.setRotation(3);
  Serial.println(F("Initialized"));
  uint16_t time = millis();
  tft.fillScreen(ST77XX_BLACK);
  testdrawtext("Hello tu", ST77XX_WHITE); 

  // Rotary
  Timer1.initialize(1000);
  Timer1.attachInterrupt(timer_service);
}

void loop() {
  //Wait for button press to execute commands
  btn.read();
  // Rotary encoder read
  int encoder_change = encoder.get_count();
  if (counter != encoder_change) {
    counter = encoder_change;
    tft.fillScreen(ST77XX_BLACK);
    char cstr[16];
    testdrawtext(itoa(encoder_change, cstr, 10), ST77XX_CYAN); 
  }
}