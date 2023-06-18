import LoginDisplay from "./LoginDisplay";

function Header({ pageHeading, pageSubHeading }) {
  return (
    <header className="px-4 flex justify-between items-center bg-[#101113] py-5">
      <div>
        <h1 className="text-2xl font-bold tracking-widest text-neutral-200">
          {pageHeading}
        </h1>

        <h2 className="text-sm font-light tracking-wider text-neutral-200">
          {pageSubHeading}
        </h2>
      </div>

      <LoginDisplay />
    </header>
  );
}

export default Header;
