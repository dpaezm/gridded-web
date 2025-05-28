import "./legal.css";

export default function AvisoLegal() {
  return (
    <div className="legal-container">
      <h2>Aviso Legal</h2>

      <p>
        En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de
        Servicios de la Sociedad de la Información y del Comercio Electrónico, se informa a los usuarios de este sitio
        web:
      </p>

      <ul>
        <li>
          <strong>Nombre comercial:</strong> Gridded Agency
        </li>
        {/*         <li>
          <strong>Titular:</strong> [Tu nombre completo o nombre de tu sociedad]
        </li>
        <li>
          <strong>NIF/CIF:</strong> [Tu número fiscal]
        </li>
        <li>
          <strong>Domicilio social:</strong> [Dirección completa]
        </li>
        <li>
          <strong>Correo electrónico de contacto:</strong> contacto@gridded.agency
        </li> */}
      </ul>

      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario, y supone la aceptación plena de las
        condiciones aquí reflejadas. El usuario se compromete a utilizar el sitio web conforme a la ley, la moral, el
        orden público y las presentes condiciones.
      </p>

      <p>
        Gridded Agency se reserva el derecho de modificar en cualquier momento la presentación y configuración de su
        sitio web, así como el contenido y los servicios del mismo.
      </p>
    </div>
  );
}
