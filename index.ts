// A function that searches for jobs
// A function that runs our app
// the command to start everything
interface employer{
  name: string
}

interface workplace{
  municipality: string
}

interface job{
  publication_date: string,
  headline: string,
  employer: employer,
  workplace_address: workplace
}

interface dataInterface{
  hits: job[]
}

const searchJobs = async (keyword: string) => {
  try {
    const url: string = `https://jobsearch.api.jobtechdev.se/search?q=${keyword}&offset=0&limit=10`;
    console.log(url)
    const response:Response = await fetch(url);
    const data:dataInterface = await response.json();

    console.log(`\nFound ${data.hits.length} jobs`);
    console.log("-".repeat(50));
    //console.log(data);
    // console.log(response)

    data.hits.forEach((job: job, index: number) => {
      const pubDate = new Date(job.publication_date);
      //console.log("pubDate: ", pubDate);

      console.log(`${index + 1}. ${job.headline}`);
      console.log(`Company: ${job.employer.name}`);
      console.log(`Location: ${job.workplace_address.municipality}`);
      console.log(`Publication: ${pubDate.toISOString().split("T")[0]}`);
      console.log("-".repeat(50));
    });
  } catch (error) {
    console.error(error);
  }
};

const runApp = () => {
  try {
    let profession: string = "Software Developer"
    let city: string = "Stockholm"
    console.log("Welcome to the Job Search App!");
    console.log("This app searches for jobs using JobTeach API");
    const keyword: string = `${profession} in ${city}`;
    searchJobs(keyword);
  } catch (error) {
    console.error(error);
  }
};

runApp();
