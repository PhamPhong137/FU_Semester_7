import os from "os";

export default function IPv4() {
  const networkInterfaces = os.networkInterfaces(); 
  const ignoredAdapters = [
    "vEthernet",
    "Ethernet 2",
    "VirtualBox",
    "docker",
    "TAP-Windows",
    "Tailscale",
    "Loopback",
  ];

  for (const interfaceName in networkInterfaces) {
    if (ignoredAdapters.some((adapter) => interfaceName.includes(adapter))) {
      continue;
    }

    const interfaces = networkInterfaces[interfaceName];
    if (interfaces) {
      for (const iface of interfaces) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
  }

  return null;
}
