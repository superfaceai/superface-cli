# superface-cli
Superface CLI tool

## Register a service

### Register a service in superface service registry
```
$ superface register http://api.hubspot.com --profile=http://supermodel.io/superface/CRM/profile/Customers --mapping=./HubSpot.oas3.yaml
```

### Set the service mapping in superface mapping store
```
$ superface mapping set --url=http://api.hubspot.com --mapping=./HubSpot.oas3.yaml
```

