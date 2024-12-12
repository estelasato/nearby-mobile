import { Button } from "@/components/button";
import { Steps } from "@/components/steps";
import { Welcome } from "@/components/welcome";
import { router } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
  console.log("Component rendered");

  return (
    <View
      style={{ flex: 1, padding: 40, gap: 40}}
    >
      <Welcome/>

      <Steps/>

      <Button isLoading={false} onPress={() => router.navigate("/home")}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}
