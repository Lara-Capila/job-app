import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import useFetch from '../../hook/useFetch';
import { COLORS, SIZES, icons } from '../../constants';
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';

const tabs = ['Sobre', 'Qualificações', 'Responsabilidades'];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setRefeshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data, error, isLoading, refetch } = useFetch({
    endpoint: 'job-details',
    params: {
      job_id: params.id,
    },
  });

  const onRefresh = useCallback(() => {
    setRefeshing(true);
    refetch();
    setRefeshing(false);
  }, []);

  const displayTabContent = () => {
    const tab = {
      Sobre: (
        <JobAbout info={data[0].job_description ?? 'Nenhum dado fornecido'} />
      ),
      Qualificações: (
        <Specifics
          title="Qualificações"
          points={data[0].job_highlights.Qualifications ?? ['N/A']}
        />
      ),
      Responsabilidades: (
        <Specifics
          title="Responsabilidades"
          points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
      ),
    };

    return tab[activeTab];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: '',
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading && (
            <ActivityIndicator size="large" color={COLORS.primary} />
          )}

          {!isLoading && data.length === 0 && (
            <Text>Nenhum dado encontrado</Text>
          )}

          {!isLoading && error && <Text>Desculpe, algo deu errado</Text>}

          {!isLoading && !error && data.length > 0 && (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                companyName={data[0].employer_name}
                jobTitle={data[0].job_title}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
      <JobFooter url={data[0]?.job_google_link ?? 'Nenhum link fornecido'} />
    </SafeAreaView>
  );
};

export default JobDetails;
