const { Light, Thermostat, SecurityCamera } = require('./devices');

/**
 * Main Smart System class for managing all devices
 */
class SmartSystem {
  constructor(name = 'My Smart Home') {
    this.name = name;
    this.devices = new Map();
    console.log(`Smart System "${name}" initialized`);
  }

  /**
   * Add a device to the system
   */
  addDevice(device) {
    if (this.devices.has(device.id)) {
      console.log(`Device with id ${device.id} already exists`);
      return false;
    }
    this.devices.set(device.id, device);
    console.log(`Device ${device.name} added to system`);
    return true;
  }

  /**
   * Remove a device from the system
   */
  removeDevice(deviceId) {
    if (this.devices.has(deviceId)) {
      const device = this.devices.get(deviceId);
      this.devices.delete(deviceId);
      console.log(`Device ${device.name} removed from system`);
      return true;
    }
    console.log(`Device with id ${deviceId} not found`);
    return false;
  }

  /**
   * Get a device by ID
   */
  getDevice(deviceId) {
    return this.devices.get(deviceId);
  }

  /**
   * Get all devices
   */
  getAllDevices() {
    return Array.from(this.devices.values());
  }

  /**
   * Get devices by type
   */
  getDevicesByType(type) {
    return this.getAllDevices().filter(device => device.type === type);
  }

  /**
   * Connect all devices
   */
  connectAll() {
    console.log('Connecting all devices...');
    this.devices.forEach(device => device.connect());
  }

  /**
   * Disconnect all devices
   */
  disconnectAll() {
    console.log('Disconnecting all devices...');
    this.devices.forEach(device => device.disconnect());
  }

  /**
   * Get system status
   */
  getStatus() {
    const devices = this.getAllDevices();
    const online = devices.filter(d => d.status === 'online').length;
    const offline = devices.filter(d => d.status === 'offline').length;
    
    return {
      systemName: this.name,
      totalDevices: devices.length,
      onlineDevices: online,
      offlineDevices: offline,
      devices: devices.map(d => d.getInfo())
    };
  }

  /**
   * Display system information
   */
  displayStatus() {
    const status = this.getStatus();
    console.log('\n=== Smart System Status ===');
    console.log(`System: ${status.systemName}`);
    console.log(`Total Devices: ${status.totalDevices}`);
    console.log(`Online: ${status.onlineDevices}`);
    console.log(`Offline: ${status.offlineDevices}`);
    console.log('\nDevices:');
    status.devices.forEach(device => {
      console.log(`  - ${device.name} (${device.type}): ${device.status}`);
    });
    console.log('==========================\n');
  }
}

module.exports = SmartSystem;
