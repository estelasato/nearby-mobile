import { Steps } from "@/components/steps/inde";
import { Welcome } from "@/components/welcome";
import { View, Text } from "react-native";

export default function Index() {
  console.log("Component rendered");

  return (
    <View
      style={{ flex: 1, padding: 40, gap: 40}}
    >
      <Welcome/>

      <Steps/>
    </View>
  );
}
