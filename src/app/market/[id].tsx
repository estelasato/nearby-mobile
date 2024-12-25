import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Coupon } from "@/components/market/coupon";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { api } from "@/services/api";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";

type MarketProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [data, setData] = useState<MarketProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);

  const params = useLocalSearchParams<{ id: string }>();
  const [permission, requestPermission] = useCameraPermissions();

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      Alert.alert("Locais", "Não foi possível carregar os locais.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert(
          "Permissão",
          "Você precisa permitir o acesso à câmera."
        );
      }

      qrLock.current = false;
      setOpenCameraModal(true);
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.post(`/coupons/${id}`);
      console.log(data);
      Alert.alert("Cupom", `${data.coupon}`);
    } catch (e) {
      Alert.alert("Cupom", "Não foi possível obter o cupom.");
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setOpenCameraModal(false);
    Alert.alert(
      "Cupom",
      "Não é possível reutilziar cupom resgatado. Deseja realmente resgatar cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={openCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={openCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setOpenCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
