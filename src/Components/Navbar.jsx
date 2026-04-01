const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto max-w-3xl flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">Software Persona</h1>
        <span className="bg-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-inner">
          Todo App
        </span>
      </div>
    </nav>
  );
};

export default Navbar;