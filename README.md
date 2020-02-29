# superface-cli
Superface CLI tool

## Installation

```
$ npm i -g superface-cli
```

```
$ yarn global add superface-cli
```

## Usage

### Register a service in superface service registry

#### Create new mapping from file

```
$ superface register https://api.hubspot.com --profile=http://supermodel.io/superface/CRM/profile/Customers --mapping=./HubSpot.oas3.yaml
```

#### Update existing mapping from file

```
$ superface register https://api.hubspot.com --profile=http://supermodel.io/superface/CRM/profile/Customers --mapping=./HubSpot.oas3.yaml --mappingId=3b8b051e-d6cc-4929-acf3-5addb4964de7
```

#### Use remote mapping

```
$ superface register https://api.hubspot.com --profile=http://supermodel.io/superface/CRM/profile/Customers --mappingUrl=https://api.hubspot.com/mapping
```


### Set the service mapping in superface mapping store
```
$ superface mapping set --url=https://api.hubspot.com --mapping=./HubSpot.oas3.yaml
```
