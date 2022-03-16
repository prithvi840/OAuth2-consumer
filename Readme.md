# OAuth2
## What is OAuth
It stands for Open Authorization and is standardized authorization protocol.
At a quick glance it hands over the authentication part to the 3rd party services like Google, Facebook, Github etc.

When a user selects the service provider a consent screen is shown to the them. Which basically tells the user that our application would like the access to their social profile in order to signup. It also tells the user the information our application would like to access for a successful signup which is referred as scope.

## OAuth Flow Diagram
![OAuth Flow Diagram](https://stage.objectpartners.com/wp-content/uploads/2016/01/OAuth2-Authorization-Flow.png "OAuth2 Authorization Flow")

This project is for learning to use OAuth2 as a consumer. Which means access token for user is provided by the service provider. Which can be used to authenticate as well as perform actions on behalf of the user.