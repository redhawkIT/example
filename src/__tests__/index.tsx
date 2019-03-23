import * as React from "react";
import { create } from "react-test-renderer";
import { Launcher } from "..";

jest.mock("Platform", () => ({
  OS: jest.fn(),
  select: jest.fn()
}));
jest.mock("AppRegistry", () => ({
  registerComponent: jest.fn(),
  runApplication: jest.fn()
}));
jest.mock("react-native-device-info", () => ({
  getAPILevel: jest.fn(),
  getApplicationName: jest.fn(),
  getBatteryLevel: jest.fn(() => Promise.resolve(1)),
  getBrand: jest.fn(),
  getBuildNumber: jest.fn(),
  getBundleId: jest.fn(),
  getCarrier: jest.fn(),
  getDeviceCountry: jest.fn(),
  getDeviceId: jest.fn(),
  getDeviceLocale: jest.fn(),
  getDeviceName: jest.fn(),
  getFirstInstallTime: jest.fn(),
  getFontScale: jest.fn(),
  getFreeDiskStorage: jest.fn(),
  getInstallReferrer: jest.fn(),
  getInstanceID: jest.fn(),
  getLastUpdateTime: jest.fn(),
  getManufacturer: jest.fn(),
  getMaxMemory: jest.fn(),
  getModel: jest.fn(),
  getPhoneNumber: jest.fn(),
  getReadableVersion: jest.fn(),
  getSerialNumber: jest.fn(),
  getSystemName: jest.fn(),
  getSystemVersion: jest.fn(),
  getTimezone: jest.fn(() => "America/Los_Angeles"),
  getTotalDiskCapacity: jest.fn(),
  getTotalMemory: jest.fn(),
  getUniqueID: jest.fn(),
  getUserAgent: jest.fn(),
  getVersion: jest.fn(),
  is24Hour: jest.fn(),
  isEmulator: jest.fn(),
  isPinOrFingerprintSet: jest.fn(),
  isTablet: jest.fn(() => false)
}));

describe("Launcher Container", () => {
  it("renders correctly", () => {
    const component = create(<Launcher />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
