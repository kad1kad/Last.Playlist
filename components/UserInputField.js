import { motion } from "framer-motion";

function UserInputField({ handleChange, onSubmit, error }) {
  return (
    // Animates Input on page load
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 10 }}
      transition={{ type: "spring", damping: 20, duration: 0.5 }}
      className="flex flex-col items-center justify-center py-4 scroll-smooth"
    >
      {error && (
        <p
          id="userNotFoundError"
          role="alert"
          aria-live="assertive"
          className="mb-5 text-sm text-center text-red-500"
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
          className="px-3 py-4 mr-3 tracking-wide bg-white border-2 rounded-full text-slate-900 md:px-40"
          onChange={handleChange}
          placeholder="Search Last.fm User"
          spellCheck="false"
        />
        <button
          type="submit"
          className="bg-[#101113] tracking-widest text-neutral-200 px-14 py-4 rounded-full hover:scale-105 transition-all active:scale-95 w-26"
        >
          Submit
        </button>
      </motion.form>
    </motion.div>
  );
}

export default UserInputField;
