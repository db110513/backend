package db.restControllers.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllers {

	@GetMapping("/")
	public String init() {
		
		return "Hola des de l'API!";
		
	}
	
	
}
