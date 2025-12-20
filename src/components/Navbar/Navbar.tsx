import Logo from "../Logo/Logo";
import NavbarRight from "../NavbarRight/NavbarRight";
import SearchInput from "../SearchInput/SearchInput";

function Navbar() {
  return (
    <div className="container  gap-5 flex justify-between items-center  ">
      <Logo />
      <SearchInput />
      <NavbarRight />
    </div>
  );
}

export default Navbar;
