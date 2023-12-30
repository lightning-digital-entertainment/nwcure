import { BarCodeScanningResult, Camera, CameraType } from "expo-camera";
import { Text, View } from "react-native";
import CustomScreen from "../../components/CustomScreen";
import { BOLT11REGEX, NWCREGEX } from "../../constants/regex";
import { useEffect, useState } from "react";

export default function ScannerView({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanner] = useState(false);
  useEffect(() => {
    requestPermission();
  }, []);

  function scanHandler(result: BarCodeScanningResult) {
    if (result.data.match(BOLT11REGEX)) {
      navigation.navigate("Tab-Source", {
        screen: "Source-Invoice",
        params: { invoice: result.data },
      });
    } else if (result.data.match(NWCREGEX)) {
      navigation.navigate("Tab-Source", {
        screen: "Source-Add",
        params: { connectionString: result.data },
      });
    }
  }

  if (!permission || !permission.granted) {
    return (
      <CustomScreen>
        <Text>No permission to access camera...</Text>
      </CustomScreen>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={CameraType.back}
        onBarCodeScanned={!scanned ? scanHandler : undefined}
      />
    </View>
  );
}
