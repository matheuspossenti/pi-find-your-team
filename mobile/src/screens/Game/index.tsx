import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { THEME } from "../../theme";
import { styles } from "./styles";

import { GameParams } from "../../@types/navigation";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { TeamCard, type TeamCardProps } from "../../components/TeamCard";
import { TeamMatch } from "../../components/TeamMatch";

export function Game() {
  const [teams, setTeams] = useState<TeamCardProps[]>([]);
  const [discordTeamSelected, setDiscordTeamSelected] = useState("");

  const navigation = useNavigation();
  const router = useRoute();
  const game = router.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.1.6:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordTeamSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.1.6:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setTeams(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={24}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TeamCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            teams.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          }
        />

        <TeamMatch
          visible={discordTeamSelected.length > 0}
          discord={discordTeamSelected}
          onClose={() => setDiscordTeamSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
