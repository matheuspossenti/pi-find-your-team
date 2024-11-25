import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { TeamInfo } from "../TeamInfo";
import { THEME } from "../../theme";
import { GameController } from "phosphor-react-native";

export interface TeamCardProps {
  id: string;
  name: string;
  weekDays: string[];
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
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
      <TeamInfo label="Tempo de Jogo" value={`${data.yearsPlaying} anos`} />
      <TeamInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <TeamInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController size={20} color={THEME.COLORS.TEXT} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
