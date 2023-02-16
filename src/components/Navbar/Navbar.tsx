import './Navbar.css';

interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
    return (
        <nav id='navbar'>
            <a href='#'>Weather App</a>
        </nav>
    );
}
