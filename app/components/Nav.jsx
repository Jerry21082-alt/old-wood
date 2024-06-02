import Link from "next/link";

export default function Nav() {
  return (
    <section className="w-full fixed z-10 nav-container">
      <div className="flex items-center p-5">
        <h1 className="text-2xl block relative text-white logo">
          <Link href={`/`}>OLDWOOD</Link>
        </h1>
        <div className="flex justify-end items-center w-full text-white">
          <div className="flex space-x-2">
            <span className="inline-block">Cart</span>
            <span className="inline-block">0</span>
          </div>
          <div className="w-5 h-5 ml-7 relative flex items-center">
            <div className="hamburger-menu" />
          </div>
        </div>
      </div>
    </section>
  );
}
