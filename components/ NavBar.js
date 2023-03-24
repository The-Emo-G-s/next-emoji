import Link from "next/link"
const Navbar = () => {
return (
  <div className="container-nav">
    <Link href='/' className="link-home">The Em🤠ji Sh🛒p</Link>
    <Link href='/login' className="login-signup">🪵 Login / 🪧 Signup</Link>

  </div>
)
}
export default Navbar
