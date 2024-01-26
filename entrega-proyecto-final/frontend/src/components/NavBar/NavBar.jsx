// ... (importaciones)

const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // Eliminar la cookie
            document.cookie = "jwtCookie=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

            // Obtener el token de la cookie
            const token = Cookies.get('jwtCookie');

            // Verificar si el token existe
            if (!token) {
                console.log('Logout exitoso');
                logout();
                navigate('/login'); // Navegar al login
            }

            const res = await axios.get('http://localhost:4000/api/sessions/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                // Realizar más acciones si es necesario
                console.log('Logout exitoso');
            }

            // Redirigir al usuario
            navigate('/login');
        } catch (error) {
            console.error('Error al hacer logout:', error);
        }
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>
                            {' '}MaruStore
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* Resto de tu código */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
