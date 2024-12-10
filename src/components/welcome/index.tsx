import { s } from "./style";
import { Image, Text, View } from "react-native";

export function Welcome() {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={s.logo} />
      <Text style={s.title}>Boas Vindas ao Nearby!</Text>

      <Text style={s.subtitle}>
        Tenha cupons de vantagem para usar em {"\n"} seus estabelecimentos
        favoritos.
      </Text>
    </View>
  );
}
