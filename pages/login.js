import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <section className="bg-black w-full min-h-screen m-auto flex justify-center items-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] tracking-wider text-gray-50 px-9 py-7 rounded-full hover:scale-105  active:scale-95 transition-all"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
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
