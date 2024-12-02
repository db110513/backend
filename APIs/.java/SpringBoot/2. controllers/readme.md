# Controllers
Tornen un .html

#### pom.xml: 
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```
#### File | Restart

#### resources | templates | *.html

#### src | main | java | ... | nomPaquet | *.java

```
@Controller
public class controller {

    @GetMapping("/")
    public String html() {
        return "index";
    }
```


#### Port en ús?
```
Get-NetTCPConnection -LocalPort 8080 | Select-Object -ExpandProperty OwningProcess
```

#### Elimina procés:
```
Stop-Process -Id NUMEROID -Force
```
