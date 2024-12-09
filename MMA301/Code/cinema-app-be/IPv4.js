import os from 'os';
function getPhysicalIPv4() {
    const networkInterfaces = os.networkInterfaces();
    const ignoredAdapters = ['vEthernet', 'VirtualBox', 'docker', 'TAP-Windows', 'Tailscale', 'Loopback','Ethernet 2'];
  
    for (const interfaceName in networkInterfaces) {
      // Ignore ignored adapters (e.g. VirtualBox, Docker, etc.) 
      if (ignoredAdapters.some(adapter => interfaceName.includes(adapter))) {
        continue;
      }
  
      const interfaces = networkInterfaces[interfaceName];
      for (const iface of interfaces) {
        // Only return IPv4 addresses (not IPv6) and not internal addresses
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  
    return null; 
  }
  
 export default getPhysicalIPv4