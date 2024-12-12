import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";


export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState<string>("")

  const [markets, setMarkets] = useState<PlaceProps[]>([])

  async function fetchCategories() {
    try {
      const {data} = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch(e) {
      console.log(e)
      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
    }
  }

  async function fetchMarket() {
    try {
      if (!category) return
      const {data} = await api.get(`/markets/category/${category}`)
      setMarkets(data)
    } catch(e) {
      console.log(e)
      Alert.alert("Locais", "Não foi possível carregar os locais.")
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarket()
  }, [category])

  return (
    <View style={{ flex: 1}}>
      <Categories data={categories} selected={category} onSelected={setCategory}/>
      <Places data={markets}/>
    </View>
  )
}