import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <section>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button>Login with {provider.name}</button>
        </div>
      ))}
    </section>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
