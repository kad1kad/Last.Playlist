import { motion } from "framer-motion";

function UserInputField({ handleInput, search, handlePeriod }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 10 }}
      transition={{ type: "spring", damping: 20, duration: 0.5 }}
      className=" py-4 flex flex-col justify-center items-center  scroll-smooth"
    >
      <motion.form
        layout
        transition={{ type: "spring", duration: 1.3 }}
        onSubmit={search}
      >
        <input
          id="userInput"
          type="text"
          className="rounded-full border-2 mr-5 py-4 px-6 text-slate-900 bg-white tracking-wide"
          onChange={handleInput}
          placeholder="Last.fm User"
          spellCheck="false"
          required
        />
        <button
          type="submit"
          className="bg-[#101113] tracking-widest text-neutral-200 px-8 py-4 rounded-full hover:scale-105 transition-all active:scale-95 w-26"
        >
          Submit
        </button>
      </motion.form>
    </motion.div>
  );
}

export default UserInputField;
