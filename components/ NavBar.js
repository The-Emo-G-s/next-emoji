import Link from "next/link"
const Navbar = () => {
return (
  <div className="container-nav">
    <Link href='/' className="link-home">Clicker Kingd🦁m</Link>
    <Link href='/login' className="login-signup">🪵 Login / 🪧 Signup</Link>

  </div>
)
}
export default Navbar
