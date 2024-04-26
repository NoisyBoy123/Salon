import Container from 'react-bootstrap/Container';
import backgroundImage from "/woman.jpg"; 


export default function Pocetna(){
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // This centers the background image
        minHeight: "100vh",
    };

    return(
        <div style={backgroundStyle}>

        <>

           <Container>
Dobrodošli u Salon           </Container>
        </>
        </div>

    );
}