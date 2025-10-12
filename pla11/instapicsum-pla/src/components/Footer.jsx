const Footer = () => {
  return (
    // TODO #2
    // Podem eliminar l'etiqueta footer i simplement retornar els dos paràgrafs?
    //Sí, però React només pot retornar un sol element.

    // Quina precaució hauríem de tenir si volguéssim fer-ho? (Pista: React.Fragment)
    //Si eliminem el footer, hem d’envoltar els dos paràgrafs amb un React.Fragment (<> ... </>) perquè React pugui retornar-los junts.
    
    <footer>
      <p>Instapicsum by CIFO L'Hospitalet</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero veritatis necessitatibus aut aliquam at,
        exercitationem voluptas voluptates nihil doloremque deserunt, nesciunt eius expedita dolor quia pariatur fugit
        beatae? Necessitatibus, beatae.
      </p>
    </footer>
  )
}

export default Footer
