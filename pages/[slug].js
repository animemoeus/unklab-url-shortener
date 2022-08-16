export default function Slug() {
  return <></>;
}

export async function getServerSideProps(context) {
  // get the slug
  const slug = context.params.slug;

  return {
    redirect: {
      destination: `https://url-shortener-api.unklab.fun/go-to/${slug}/`,
      permanent: true,
    },
  };
}
