
## REST controllers

#### 1. 
```
Crear package > rest
```
#### 2. 
```
rest/RestControllerr.java
```
#### 3. 

```
import org.springframework.web.bind.annotation.RestController;
```

#### 4.
```
@RestController
public class RestControllerr {
	
}
```

#### 5.
```
GetMapping("/")
public String api() {
       return "Hola des de l'api!!";
}
```

<table>
  <tr>
    <th>Característica</th>
    <th>@Controller</th>
    <th>@RestController</th>
  </tr>
  <tr>
    <td>Ús</td>
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
    <td>Sí</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Serialització</td>
    <td>Manual</td>
    <td>Automàtica</td>
  </tr>
</table>
