<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparació entre @Controller i @RestController</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <h1>Comparació entre @Controller i @RestController</h1>

    <!-- Taula comparativa -->
    <table>
        <thead>
            <tr>
                <th>Característica</th>
                <th>@Controller</th>
                <th>@RestController</th>
            </tr>
        </thead>
        <tbody>
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
        </tbody>
    </table>

    <!-- Explicació de les diferències -->
    <h2>Explicació de les diferències</h2>
    <p>Les principals diferències entre @Controller i @RestController són:</p>
    <ol>
        <li>@Controller s'utilitza per a aplicacions web tradicionals que retornen vistes HTML, mentre que @RestController està dissenyat específicament per a serveis web RESTful que retornen dades en format JSON o XML.</li>
        <li>Amb @Controller, cal afegir l'anotació @ResponseBody a cada mètode individualment si es vol retornar dades directament. En canvi, @RestController inclou automàticament @ResponseBody per a tots els mètodes del controlador.</li>
        <li>@Controller utilitza un resoledor de vistes per processar el nom de la vista retornada i generar la resposta HTML final. @RestController no utilitza resoledor de vistes, ja que retorna directament les dades serialitzades.</li>
        <li>@RestController simplifica el desenvolupament d'APIs REST, ja que serialitza automàticament els objectes retornats a JSON o XML, mentre que amb @Controller cal fer-ho manualment.</li>
        <li>@Controller ofereix més flexibilitat per a aplicacions que necessiten combinar la generació de vistes amb la resposta de dades, mentre que @RestController està optimitzat per a serveis que només retornen dades.</li>
    </ol>
</body>
</html>
