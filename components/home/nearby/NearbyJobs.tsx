import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';

import styles from './nearbyjobs.style';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants';
import useFetch from '../../../hook/useFetch';
import NearbyJobCard from '../../../components/common/cards/nearby/NearbyJobCard';

const NearbyJobs = () => {
  const router = useRouter();

  const { data, error, isLoading } = useFetch({
    endpoint: 'search',
    params: {
      query: 'React developer',
      num_pages: '1',
      page: '1',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Mostrar tudo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          data.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}

        {!isLoading && error && error}
      </View>
    </View>
  );
};

export default NearbyJobs;
