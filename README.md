# json_parser
It is necessary to create a function that accepts the specified JSON schema as an argument and returns the corresponding data object. Object field values ​​are randomly 
generated based on the constraints described in the JSON schema. It is forbidden to use external libraries for implementation. 
You also need to write unit tests for your function.

A reference to the JSON schema from which you need to generate objects.
https://drive.google.com/file/d/1crLJ-PPCuLFmMjWA6vTp8A9jsZKz-NKR/view?usp=sharing

Examples of JSON-schema and the resulting object
https://docs.google.com/document/d/1EuZVoVOeEx8H05OrpI9u8uKKI0mz9A6JPjz-6b5lqfo/edit?usp=sharing

Example of random object 
```
{
    "id": "oe31c",
    "title": "f3qh6p",
    "description": "7k7xlq",
    "startDate": 6584,
    "endDate": 5143,
    "attendees": [
        {
            "userId": 7217,
            "access": "modify",
            "formAccess": "execute_view"
        },
        {
            "userId": 8231,
            "access": "view",
            "formAccess": "view"
        },
        {
            "userId": 5588,
            "access": "execute",
            "formAccess": "execute"
        },
        {
            "userId": 2036,
            "access": "modify",
            "formAccess": "view"
        },
        {
            "userId": 7219,
            "access": "execute",
            "formAccess": "execute"
        }
    ],
    "parentId": null,
    "locationId": 4302,
    "process": null,
    "readOnly": true,
    "priorProbability": null,
    "channelId": 6664,
    "externalId": null,
    "tags": [],
    "form": {
        "id": 2476,
        "viewModel": {}
    },
    "formValue": {}
}
```
