import { motion } from "framer-motion";

function UserInputField({ handleChange, onSubmit, error }) {
  return (
    // Animates Input on page load
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 10 }}
      transition={{ type: "spring", damping: 20, duration: 0.5 }}
      className=" py-4 flex flex-col justify-center items-center  scroll-smooth"
    >
      {error && (
        <p
          id="userNotFoundError"
          role="alert"
          aria-live="assertive"
          className="text-center text-sm mb-5 text-red-500"
        >
          {error}
        </p>
      )}

      {/* Animates Input moving up after MusicList mounts */}
      <motion.form
        layout
        transition={{ type: "spring", duration: 1.3 }}
        onSubmit={onSubmit}
      >
        <input
          aria-errormessage="userNotFoundError"
          aria-invalid="true"
          type="text"
          className="rounded-full border-2 mr-5 py-4 px-6 text-slate-900 bg-white tracking-wide"
          onChange={handleChange}
          placeholder="Last.fm User"
          spellCheck="false"
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
