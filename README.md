# OAuth2
Repository includes how to use OAuth 2 in an Angular & Node.Js environment.
## Installation
* clone the repository to you local machine
* Open OAuth-Front End folder
```sh
$ npm install
```
* Run the solution
```sh
$ ng serve
```
* Open SynchronizeToken-Back folder
```sh
$ npm install
```
* Run the solution
```sh
$ node app
```
Open `http://localhost:4200` from the Browser


* Open OAuth-Back End folder

### Obtaining a token

To obtain a token you should POST to `http://localhost:3000/login`.

#### With *password* grant

You need to include the client credentials in request headers and the user credentials and grant type in request body:

* **Headers**
	* **Authorization**: `"Basic " + clientId:secret base64'd`
		* (for example, to use `application:secret`, you should send `Basic YXBwbGljYXRpb246c2VjcmV0`)

	* **Content-Type**: `application/x-www-form-urlencoded`

* **Body**
	* `grant_type=password`
	* `username=admin`
	* `password=admin`


### Using the token

Now, you can use your brand-new token to access restricted areas. For example, you can GET to `http://localhost:3000/` including your token at headers:

* **Headers**
	* **Authorization**: `"Bearer " + access_token`
		* (for example, `Bearer 72ab415822b56cf0f9f93f07fe978d9aae859325`)

User can put a transition amount and send & if the Synchronize Token process is success a success message will display
