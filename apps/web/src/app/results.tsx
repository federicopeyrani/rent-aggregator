import useSWR from "swr";
import { searchByUrl, SearchByUrlParams } from "@/app/search-by-url";
import { Alert, Box, Group, Loader } from "@mantine/core";
import { ResultCard } from "./result-card";

import styles from "./styles.module.css";

export const Results: React.FC<SearchByUrlParams> = (params) => {
  const { data, error, isLoading } = useSWR(params, searchByUrl, {
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <Group justify={"center"} align={"center"} p={"xl"}>
        <Loader />
      </Group>
    );
  }

  if (error) {
    return <Alert color="red">Failed to load results</Alert>;
  }

  return (
    <Box className={styles.ResultsGrid}>
      {data?.map((result) => <ResultCard key={result.id} result={result} />)}
    </Box>
  );
};
