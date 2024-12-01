<table>
  <tr>
    <th>@Controller</th>
    <th>@RestController</th>
  </tr>
  <tr>
    <td>Aplicacions web tradicionals</td>
    <td>Serveis web RESTful</td>
  </tr>
  <tr>
    <td>Vistes HTML</td>
    <td>Dades (JSON/XML)</td>
  </tr>
</table>


<table>
  <tr>
    <th>Característica</th>
    <th>@Controller</th>
    <th>@RestController</th>
  </tr>
  <tr>
    <td>Ús principal</td>
    <td>Aplicacions web tradicionals</td>
    <td>Serveis web RESTful</td>
  </tr>
  <tr>
    <td>Retorn</td>
    <td>Vistes HTML</td>
    <td>Dades (JSON/XML)</td>
  </tr>
  <tr>
    <td>@ResponseBody</td>
    <td>Cal afegir-lo explícitament</td>
    <td>Inclòs automàticament</td>
  </tr>
  <tr>
    <td>Resolució de vistes</td>
    <td>Utilitza un resoledor de vistes</td>
    <td>No utilitza resoledor de vistes</td>
  </tr>
  <tr>
    <td>Serialització</td>
    <td>Manual</td>
    <td>Automàtica</td>
  </tr>
</table>
