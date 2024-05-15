import { Alert, Box, Group, Loader } from "@mantine/core";
import styles from "@/app/search/styles.module.css";
import { ResultCard } from "@/app/search/result-card";
import { ParsedRealEstate } from "core";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface ResultsGridProps {
  isLoading?: boolean;
  error?: unknown;
  data?: ParsedRealEstate[];
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({
  isLoading = false,
  error,
  data,
}) => {
  const [parent] = useAutoAnimate({
    duration: 400,
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  if (error) {
    return <Alert color="red">Failed to load results</Alert>;
  }

  return (
    <>
      <Box ref={parent} className={styles.ResultsGrid}>
        {data?.map((result) => <ResultCard key={result.id} result={result} />)}
      </Box>

      {isLoading && (
        <Group pos={"sticky"} bottom={0} justify={"center"} p={"xl"}>
          <Loader />
        </Group>
      )}
    </>
  );
};
