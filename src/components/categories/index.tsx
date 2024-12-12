import { FlatList, View } from "react-native";
import { Category } from "../category";
import { s } from "./styles";

export type CategoriesProps = {
  id: string;
  name: string;
}[];

type Props = {
  data: CategoriesProps;
  selected: string;
  onSelected: (id: string) => void;
};

export function Categories({ data, onSelected, selected }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.content}
      style={s.container}
      renderItem={({ item }) => <Category isSelected={selected == item.id} onPress={() => onSelected(item.id)} name={item.name} iconId={item.id} />}
    />
  );
}
