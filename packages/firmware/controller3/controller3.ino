#include <BasicEncoder.h>    // https://github.com/micromouseonline/BasicEncoder
#include <TimerOne.h>

// ROTARY IO
#define ROTATORY_BTN_PIN  5
#define ROTATORY_DT_PIN 3
#define ROTATORY_CLK_PIN 4

// Setup a RotaryEncoder
BasicEncoder encoder1(ROTATORY_DT_PIN, ROTATORY_CLK_PIN);

int encoder1Counter = 0;

void timer_service() {
  encoder1.service();
}
void setup() {
  // IO Setup
  Serial.begin(115200);
  while(!Serial) {}
  while(Serial.available() > 0) {
    // Empty buffer
    Serial.read();
  }

  // Rotary
  Timer1.initialize(1000);
  Timer1.attachInterrupt(timer_service);
}

void loop() {
  // Rotary encoder read
  int encoder_change = encoder1.get_count();
  if (encoder1Counter != encoder_change) {
    encoder1Counter = encoder_change;
    sendRotatoryChange("1", encoder_change);
  }
}

void sendRotatoryChange(String id, int value) {
    char cstr[16];
    itoa(value, cstr, 10);
    Serial.println("knob_changed:" + id + "," + cstr);
}
