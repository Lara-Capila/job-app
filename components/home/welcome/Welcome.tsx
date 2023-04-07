import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES, COLORS } from '../../../constants';

const jobTypes = ['Full-time', 'Part-time', 'Contractor'];

type WelcomeProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
};

const Welcome = ({ handleClick, searchTerm, setSearchTerm }: WelcomeProps) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');

  const activeJobColor = (item: string) =>
    activeJobType === item ? COLORS.secondary : COLORS.gray2;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Olá, Lara!</Text>
        <Text style={styles.welcomeMessage}>Encontre o emprego perfeito!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="O que você está procurando?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobColor(item))}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobColor(item))}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
