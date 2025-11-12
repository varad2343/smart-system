# Smart System

A basic smart home system application for managing and controlling connected IoT devices.

## Features

- **Device Management**: Add, remove, and monitor smart devices
- **Multiple Device Types**: Support for lights, thermostats, and security cameras
- **Device Control**: Turn devices on/off, adjust settings, and monitor status
- **System Overview**: View all connected devices and their current states

## Installation

1. Clone the repository:
```bash
git clone https://github.com/varad2343/smart-system.git
cd smart-system
```

2. Install dependencies (if any are added in the future):
```bash
npm install
```

## Usage

### Running the Demo

To run the basic demo application:

```bash
npm start
```

Or directly with Node.js:

```bash
node index.js
```

This will start the smart home system with example devices and demonstrate basic functionality.

### Using in Your Own Code

```javascript
const SmartSystem = require('./smartSystem');
const { Light, Thermostat, SecurityCamera } = require('./devices');

// Create a new smart system
const myHome = new SmartSystem('My Home');

// Add devices
const light = new Light('light-1', 'Kitchen Light');
myHome.addDevice(light);

// Connect and control devices
light.connect();
light.turnOn();
light.setBrightness(80);

// View system status
myHome.displayStatus();
```

## Device Types

### Light
- Turn on/off
- Adjust brightness (0-100%)
- Monitor connection status

### Thermostat
- Set target temperature
- Change mode (heat, cool, auto, off)
- Monitor current and target temperature

### Security Camera
- Start/stop recording
- Toggle motion detection
- Monitor connection status

## API Reference

### SmartSystem

- `addDevice(device)` - Add a device to the system
- `removeDevice(deviceId)` - Remove a device by ID
- `getDevice(deviceId)` - Get a specific device
- `getAllDevices()` - Get all devices
- `getDevicesByType(type)` - Get devices of a specific type
- `connectAll()` - Connect all devices
- `disconnectAll()` - Disconnect all devices
- `getStatus()` - Get system status object
- `displayStatus()` - Display system status in console

### Device Methods

All devices inherit from the base `Device` class:
- `connect()` - Connect the device
- `disconnect()` - Disconnect the device
- `getInfo()` - Get device information

## Configuration

You can customize the initial setup by modifying the `config.example.json` file or creating your own configuration.

## Project Structure

```
smart-system/
├── index.js              # Main application entry point
├── smartSystem.js        # Core system management class
├── devices.js            # Device classes (Light, Thermostat, Camera)
├── config.example.json   # Example configuration file
├── package.json          # Project metadata and dependencies
└── README.md            # This file
```

## Requirements

- Node.js 12.x or higher

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!
