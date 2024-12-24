import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { api } from "@/services/api";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

type MarketProps = PropsDetails & {
  cover: string;
}

export default function Market() {
  const [data, setData] = useState<MarketProps>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams<{ id: string }>()
  
  async function fetchMarket() {
    try{
      const {data} = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch(e) {
      console.log(e)
      Alert.alert("Locais", "Não foi possível carregar os locais.", [
        { text: "OK", onPress: () => router.back() }
      ])
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{flex: 1}}>
      <Cover uri={data.cover} />
      <Details data={data} />
    </View>
  )
}