import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";

import { TeamInfo } from "../TeamInfo";

import { styles } from "./styles";
import { THEME } from "../../theme";

export interface TeamCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: TeamCardProps;
  onConnect: () => void;
}

export function TeamCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <TeamInfo label="Nome" value={data.name} />

      <TeamInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />

      <TeamInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <TeamInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />

        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
