int vibrationSensorPower = D0;
int vibrationSensorInput = A0;
int ledPin = D5;

int sendTimestamp;
int activityTimestamp;
int currentTimestamp;
int currentActivityLevel;
int vibrationLevel;

void setup() {
    pinMode(vibrationSensorPower, OUTPUT);
    pinMode(vibrationSensorInput, INPUT);
    pinMode(ledPin, OUTPUT);

    digitalWrite(vibrationSensorPower, HIGH);
    Serial.begin(9600);

    activityTimestamp = Time.now();
    sendTimestamp = Time.now();
    currentTimestamp = 0;
    currentActivityLevel = 0;
    vibrationLevel = 0;
}

void loop() {
    int vibrationValue = analogRead(vibrationSensorInput);
    currentTimestamp = Time.now();

    vibrationLevel += vibrationValue;
    if (currentTimestamp - activityTimestamp >= 1) {
        activityTimestamp = currentTimestamp;

        // ~98.5k vibrationLevel if no movement
        if (vibrationLevel >= 200000) {
            Serial.println(vibrationLevel);
            Serial.println("incrementing current activity levels");
            currentActivityLevel += 1;
            vibrationLevel = 0;
        }
        vibrationLevel = 0;
    }

    if (currentTimestamp - sendTimestamp >= 10) {
        Particle.publish("pet-health-activity-level", String(currentActivityLevel), PRIVATE);
        Serial.println(currentActivityLevel);
        currentActivityLevel = 0;
        sendTimestamp = currentTimestamp;
    }

    if(vibrationValue > 3000) {
        digitalWrite(ledPin,HIGH);
    }
    else {
        digitalWrite(ledPin,LOW);
    }
}
