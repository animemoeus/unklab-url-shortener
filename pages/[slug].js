import Error from "next/error";

export default function Slug(props) {
  // show error page based on http status
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
}

export async function getServerSideProps(context) {
  // get the target URL from API
  const res = await fetch(
    `https://url-shortener-api.unklab.fun/api/shorten/?slug=${context.params.slug}`
  );
  const errorCode = res.ok ? false : res.status;
  const data = await res.json();

  // redirect to target URL
  if (errorCode === false) {
    return {
      redirect: {
        destination: data.target_url,
        permanent: true,
      },
    };
  } else {
    // show error page
    return {
      props: {
        errorCode: errorCode,
      }, // will be passed to the page component as props
    };
  }
}
