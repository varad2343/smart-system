/**
 * Base class for all smart devices
 */
class Device {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.status = 'offline';
  }

  connect() {
    this.status = 'online';
    console.log(`${this.name} (${this.type}) connected`);
  }

  disconnect() {
    this.status = 'offline';
    console.log(`${this.name} (${this.type}) disconnected`);
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      status: this.status
    };
  }
}

/**
 * Smart Light device
 */
class Light extends Device {
  constructor(id, name) {
    super(id, name, 'light');
    this.isOn = false;
    this.brightness = 100;
  }

  turnOn() {
    this.isOn = true;
    console.log(`${this.name} turned on`);
  }

  turnOff() {
    this.isOn = false;
    console.log(`${this.name} turned off`);
  }

  setBrightness(level) {
    if (level >= 0 && level <= 100) {
      this.brightness = level;
      console.log(`${this.name} brightness set to ${level}%`);
    } else {
      console.log('Brightness must be between 0 and 100');
    }
  }

  getInfo() {
    return {
      ...super.getInfo(),
      isOn: this.isOn,
      brightness: this.brightness
    };
  }
}

/**
 * Smart Thermostat device
 */
class Thermostat extends Device {
  constructor(id, name) {
    super(id, name, 'thermostat');
    this.temperature = 20;
    this.targetTemperature = 22;
    this.mode = 'auto';
  }

  setTemperature(temp) {
    this.targetTemperature = temp;
    console.log(`${this.name} target temperature set to ${temp}°C`);
  }

  setMode(mode) {
    const validModes = ['heat', 'cool', 'auto', 'off'];
    if (validModes.includes(mode)) {
      this.mode = mode;
      console.log(`${this.name} mode set to ${mode}`);
    } else {
      console.log('Invalid mode. Use: heat, cool, auto, or off');
    }
  }

  getInfo() {
    return {
      ...super.getInfo(),
      temperature: this.temperature,
      targetTemperature: this.targetTemperature,
      mode: this.mode
    };
  }
}

/**
 * Smart Security Camera device
 */
class SecurityCamera extends Device {
  constructor(id, name) {
    super(id, name, 'camera');
    this.isRecording = false;
    this.motionDetection = true;
  }

  startRecording() {
    this.isRecording = true;
    console.log(`${this.name} started recording`);
  }

  stopRecording() {
    this.isRecording = false;
    console.log(`${this.name} stopped recording`);
  }

  toggleMotionDetection() {
    this.motionDetection = !this.motionDetection;
    console.log(`${this.name} motion detection ${this.motionDetection ? 'enabled' : 'disabled'}`);
  }

  getInfo() {
    return {
      ...super.getInfo(),
      isRecording: this.isRecording,
      motionDetection: this.motionDetection
    };
  }
}

module.exports = {
  Device,
  Light,
  Thermostat,
  SecurityCamera
};
