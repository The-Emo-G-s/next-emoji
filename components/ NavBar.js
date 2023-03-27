import Link from "next/link"
const Navbar = () => {
return (
  <div className="container-nav">
    <span><Link href='/' className="link-home">Clicker Kingdom</Link></span>
    <span><Link href='/login' className="login-signup">Login / Signup</Link></span>
  </div>
)
}
export default Navbar
