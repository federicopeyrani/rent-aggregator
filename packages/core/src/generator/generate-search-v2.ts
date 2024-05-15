import { getInfo } from "../get-info";
import { toParsedRealEstate } from "../utils/to-parsed-real-estate";
import { getResultsRaw } from "../get-results-raw";
import { ParsedRealEstate } from "../model/ParsedRealEstate";

interface PageFetchState {
  completed: boolean;
  pageNumber: number;
}

interface OutputJob {
  result?: ParsedRealEstate;
  completed: boolean;
  emitted: boolean;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function* generateSearch(
  location: string,
  query: string[][] | Record<string, string> | string | URLSearchParams,
) {
  const start = Date.now();

  const queryParams = new URLSearchParams(query);
  queryParams.set("pag", "1");

  const firstPageData = await getResultsRaw(location, queryParams);

  const pageFetchState: PageFetchState[] = Array.from(
    { length: firstPageData.maxPages },
    (_, i) => ({ completed: false, pageNumber: i + 1 }),
  );

  const outQueue: OutputJob[] = [];

  const pagesPromises = pageFetchState.map(async (pageFetchState) => {
    const duplicateParams = new URLSearchParams(queryParams);
    duplicateParams.set("pag", pageFetchState.pageNumber.toString());

    try {
      const { results } =
        pageFetchState.pageNumber === 1
          ? firstPageData
          : await getResultsRaw(location, duplicateParams);

      const jobs = results.map(async (result) => {
        const job: OutputJob = { completed: false, emitted: false };
        outQueue.push(job);

        try {
          const info = await getInfo(result.realEstate.id);
          job.result = toParsedRealEstate(info);
          job.completed = true;
        } catch {
          job.completed = true;
        }

        return job;
      });

      pageFetchState.completed = true;
      return Promise.any(jobs);
    } catch {
      pageFetchState.completed = true;
    }
  });

  console.log("Total pages", pageFetchState.length);
  console.log("Total jobs", outQueue.length);

  await Promise.any(pagesPromises);
  console.log("Completed first page");

  while (
    pageFetchState.some((pageFetchState) => !pageFetchState.completed) ||
    outQueue.some((job) => !job.completed || !job.emitted)
  ) {
    const completedJobs = outQueue
      .filter((job) => job.completed && !job.emitted && job.result)
      .map((job) => job as OutputJob & { result: ParsedRealEstate });

    console.log("Emitting", completedJobs.length, "jobs");

    yield completedJobs.map((job) => job.result);

    completedJobs.forEach((job) => {
      job.emitted = true;
    });

    await wait(2000);
  }

  console.log("Total time", Date.now() - start);
}
