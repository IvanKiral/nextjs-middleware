

const page = async ({ params }: {params: Promise<{envId: string}>} ) => {
  const envId = (await params).envId;
  console.log("envId from page: ", envId);

  return (
    <h1>Page {envId}</h1>
  );
}

export const generateStaticParams = () => [1,2,3,4,5].map((envId) => ({envId: envId.toString()}));

export default page;