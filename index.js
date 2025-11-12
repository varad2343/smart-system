const SmartSystem = require('./smartSystem');
const { Light, Thermostat, SecurityCamera } = require('./devices');

/**
 * Main application entry point
 */
function main() {
  console.log('Starting Smart Home System...\n');

  // Initialize the smart system
  const smartHome = new SmartSystem('My Smart Home');

  // Add some example devices
  const livingRoomLight = new Light('light-1', 'Living Room Light');
  const bedroomLight = new Light('light-2', 'Bedroom Light');
  const mainThermostat = new Thermostat('thermo-1', 'Main Thermostat');
  const frontCamera = new SecurityCamera('cam-1', 'Front Door Camera');

  smartHome.addDevice(livingRoomLight);
  smartHome.addDevice(bedroomLight);
  smartHome.addDevice(mainThermostat);
  smartHome.addDevice(frontCamera);

  console.log('\n');

  // Connect all devices
  smartHome.connectAll();

  console.log('\n');

  // Demonstrate device control
  console.log('--- Controlling Devices ---\n');
  
  livingRoomLight.turnOn();
  livingRoomLight.setBrightness(75);
  
  bedroomLight.turnOn();
  bedroomLight.setBrightness(50);
  
  mainThermostat.setTemperature(23);
  mainThermostat.setMode('cool');
  
  frontCamera.startRecording();
  frontCamera.toggleMotionDetection();

  console.log('\n');

  // Display system status
  smartHome.displayStatus();

  // Example: Turn off a light
  console.log('--- Additional Actions ---\n');
  livingRoomLight.turnOff();
  
  console.log('\n');

  // Final status
  smartHome.displayStatus();

  console.log('Smart Home System demo completed!');
}

// Run the application
if (require.main === module) {
  main();
}

module.exports = { main };
