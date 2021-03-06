// tslint:disable
/**
 * Zuora API Reference
 *   # Introduction Welcome to the reference for the Zuora REST API!  In addition to Zuora API Reference, we also provide API references for other Zuora products:    * [Zuora Collect API Reference](https://www.zuora.com/developer/collect-api/)   * [RevPro API Reference](https://www.zuora.com/developer/revpro-api/)      The Zuora REST API provides a broad set of operations and resources that:    * Enable Web Storefront integration from your website.   * Support self-service subscriber sign-ups and account management.   * Process revenue schedules through custom revenue rule models.   * Enable manipulation of most objects in the Zuora Object Model.  Want to share your opinion on how our API works for you? <a href=\"https://community.zuora.com/t5/Developers/API-Feedback-Form/gpm-p/21399\" target=\"_blank\">Tell us how you feel </a>about using our API and what we can do to make it better.  ## Access to the API  If you have a Zuora tenant, you can access the Zuora REST API via one of the following endpoints:  | Tenant              | Base URL for REST Endpoints | |-------------------------|-------------------------| |US Production | https://rest.zuora.com   | |US API Sandbox    | https://rest.apisandbox.zuora.com| |US Performance Test | https://rest.pt1.zuora.com | |US Production Copy | Submit a request at <a href=\"http://support.zuora.com/\" target=\"_blank\">Zuora Global Support</a> to enable the Zuora REST API in your tenant and obtain the base URL for REST endpoints. See [REST endpoint base URL of Production Copy (Service) Environment for existing and new customers](https://community.zuora.com/t5/API/REST-endpoint-base-URL-of-Production-Copy-Service-Environment/td-p/29611) for more information. | |EU Production | https://rest.eu.zuora.com | |EU Sandbox | https://rest.sandbox.eu.zuora.com |  The Production endpoint provides access to your live user data. API Sandbox tenants are a good place to test code without affecting real-world data. If you would like Zuora to provision an API Sandbox tenant for you, contact your Zuora representative for assistance.   If you do not have a Zuora tenant, go to <a href=\"https://www.zuora.com/resource/zuora-test-drive\" target=\"_blank\">https://www.zuora.com/resource/zuora-test-drive</a> and sign up for a Production Test Drive tenant. The tenant comes with seed data, including a sample product catalog.  # API Changelog You can find the <a href=\"https://community.zuora.com/t5/Developers/API-Changelog/gpm-p/18092\" target=\"_blank\">Changelog</a> of the API Reference in the Zuora Community.  # Authentication  ## OAuth v2.0  Zuora recommends that you use OAuth v2.0 to authenticate to the Zuora REST API. Currently, OAuth is not available in every environment. See [Zuora Testing Environments](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/D_Zuora_Environments) for more information.  Zuora recommends you to create a dedicated API user with API write access on a tenant when authenticating via OAuth, and then create an OAuth client for this user. See <a href=\"https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users/Create_an_API_User\" target=\"_blank\">Create an API User</a> for how to do this. By creating a dedicated API user, you can control permissions of the API user without affecting other non-API users.  If a user is deactivated, all of the user\'s OAuth clients will be automatically deactivated.  Authenticating via OAuth requires the following steps: 1. Create a Client 2. Generate a Token 3. Make Authenticated Requests  ### Create a Client  You must first [create an OAuth client](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users#Create_an_OAuth_Client_for_a_User) in the Zuora UI. To do this, you must be an administrator of your Zuora tenant. This is a one-time operation. You will be provided with a Client ID and a Client Secret. Please note this information down, as it will be required for the next step.  **Note:** The OAuth client will be owned by a Zuora user account. If you want to perform PUT, POST, or DELETE operations using the OAuth client, the owner of the OAuth client must have a Platform role that includes the \"API Write Access\" permission.  ### Generate a Token  After creating a client, you must make a call to obtain a bearer token using the [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) operation. This operation requires the following parameters: - `client_id` - the Client ID displayed when you created the OAuth client in the previous step - `client_secret` - the Client Secret displayed when you created the OAuth client in the previous step - `grant_type` - must be set to `client_credentials`  **Note**: The Client ID and Client Secret mentioned above were displayed when you created the OAuth Client in the prior step. The [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) response specifies how long the bearer token is valid for. You should reuse the bearer token until it is expired. When the token is expired, call [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) again to generate a new one.  ### Make Authenticated Requests  To authenticate subsequent API requests, you must provide a valid bearer token in an HTTP header:  `Authorization: Bearer {bearer_token}`  If you have [Zuora Multi-entity](https://www.zuora.com/developer/api-reference/#tag/Entities) enabled, you need to set an additional header to specify the ID of the entity that you want to access. You can use the `scope` field in the [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) response to determine whether you need to specify an entity ID.  If the `scope` field contains more than one entity ID, you must specify the ID of the entity that you want to access. For example, if the `scope` field contains `entity.1a2b7a37-3e7d-4cb3-b0e2-883de9e766cc` and `entity.c92ed977-510c-4c48-9b51-8d5e848671e9`, specify one of the following headers: - `Zuora-Entity-Ids: 1a2b7a37-3e7d-4cb3-b0e2-883de9e766cc` - `Zuora-Entity-Ids: c92ed977-510c-4c48-9b51-8d5e848671e9`  **Note**: For a limited period of time, Zuora will accept the `entityId` header as an alternative to the `Zuora-Entity-Ids` header. If you choose to set the `entityId` header, you must remove all \"-\" characters from the entity ID in the `scope` field.  If the `scope` field contains a single entity ID, you do not need to specify an entity ID.  ## Other Supported Authentication Schemes  Zuora continues to support the following additional legacy means of authentication:    * Use username and password. Include authentication with each request in the header:         * `apiAccessKeyId`      * `apiSecretAccessKey`          Zuora recommends that you create an API user specifically for making API calls. See <a href=\"https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users/Create_an_API_User\" target=\"_blank\">Create an API User</a> for more information.      * Use an authorization cookie. The cookie authorizes the user to make calls to the REST API for the duration specified in  **Administration > Security Policies > Session timeout**. The cookie expiration time is reset with this duration after every call to the REST API. To obtain a cookie, call the [Connections](https://www.zuora.com/developer/api-reference/#tag/Connections) resource with the following API user information:         *   ID         *   Password        * For CORS-enabled APIs only: Include a \'single-use\' token in the request header, which re-authenticates the user with each request. See below for more details.  ### Entity Id and Entity Name  The `entityId` and `entityName` parameters are only used for [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity \"Zuora Multi-entity\"). These are the legacy parameters that Zuora will only continue to support for a period of time. Zuora recommends you to use the `Zuora-Entity-Ids` parameter instead.   The  `entityId` and `entityName` parameters specify the Id and the [name of the entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/B_Introduction_to_Entity_and_Entity_Hierarchy#Name_and_Display_Name \"Introduction to Entity and Entity Hierarchy\") that you want to access, respectively. Note that you must have permission to access the entity.   You can specify either the `entityId` or `entityName` parameter in the authentication to access and view an entity.    * If both `entityId` and `entityName` are specified in the authentication, an error occurs.    * If neither `entityId` nor `entityName` is specified in the authentication, you will log in to the entity in which your user account is created.      To get the entity Id and entity name, you can use the GET Entities REST call. For more information, see [API User Authentication](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/A_Overview_of_Multi-entity#API_User_Authentication \"API User Authentication\").      ### Token Authentication for CORS-Enabled APIs      The CORS mechanism enables REST API calls to Zuora to be made directly from your customer\'s browser, with all credit card and security information transmitted directly to Zuora. This minimizes your PCI compliance burden, allows you to implement advanced validation on your payment forms, and  makes your payment forms look just like any other part of your website.    For security reasons, instead of using cookies, an API request via CORS uses **tokens** for authentication.  The token method of authentication is only designed for use with requests that must originate from your customer\'s browser; **it should  not be considered a replacement to the existing cookie authentication** mechanism.  See [Zuora CORS REST](https://knowledgecenter.zuora.com/DC_Developers/C_REST_API/Zuora_CORS_REST \"Zuora CORS REST\") for details on how CORS works and how you can begin to implement customer calls to the Zuora REST APIs. See  [HMAC Signatures](https://www.zuora.com/developer/api-reference/#operation/POSTHMACSignature \"HMAC Signatures\") for details on the HMAC method that returns the authentication token.  # Requests and Responses  ## Request IDs  As a general rule, when asked to supply a \"key\" for an account or subscription (accountKey, account-key, subscriptionKey, subscription-key), you can provide either the actual ID or  the number of the entity.  ## HTTP Request Body  Most of the parameters and data accompanying your requests will be contained in the body of the HTTP request.   The Zuora REST API accepts JSON in the HTTP request body. No other data format (e.g., XML) is supported.  ### Data Type  ([Actions](https://www.zuora.com/developer/api-reference/#tag/Actions) and CRUD operations only) We recommend that you do not specify the decimal values with quotation marks, commas, and spaces. Use characters of `+-0-9.eE`, for example, `5`, `1.9`, `-8.469`, and `7.7e2`. Also, Zuora does not convert currencies for decimal values.  ## Testing a Request  Use a third party client, such as [curl](https://curl.haxx.se \"curl\"), [Postman](https://www.getpostman.com \"Postman\"), or [Advanced REST Client](https://advancedrestclient.com \"Advanced REST Client\"), to test the Zuora REST API.  You can test the Zuora REST API from the Zuora API Sandbox or Production tenants. If connecting to Production, bear in mind that you are working with your live production data, not sample data or test data.  ## Testing with Credit Cards  Sooner or later it will probably be necessary to test some transactions that involve credit cards. For suggestions on how to handle this, see [Going Live With Your Payment Gateway](https://knowledgecenter.zuora.com/CB_Billing/M_Payment_Gateways/C_Managing_Payment_Gateways/B_Going_Live_Payment_Gateways#Testing_with_Credit_Cards \"C_Zuora_User_Guides/A_Billing_and_Payments/M_Payment_Gateways/C_Managing_Payment_Gateways/B_Going_Live_Payment_Gateways#Testing_with_Credit_Cards\" ).  ## Concurrent Request Limits  Zuora enforces tenant-level concurrent request limits. See <a href=\"https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Policies/Concurrent_Request_Limits\" target=\"_blank\">Concurrent Request Limits</a> for more information.  ## Timeout Limit  If a request does not complete within 120 seconds, the request times out and Zuora returns a Gateway Timeout error.   # Error Handling  If a request to Zuora Billing REST API with an endpoint starting with `/v1` (except [Actions](https://www.zuora.com/developer/api-reference/#tag/Actions) and CRUD operations) fails, the response will contain an eight-digit error code with a corresponding error message to indicate the details of the error.  The following code snippet is a sample error code and message pair:  ```  \"reasons\":  [ {   \"code\": 53100320,   \"message\": \"\'termType\' value should be one of: TERMED, EVERGREEN\" } ```  The error code begins with `5` or `6` means that you encountered a certain issue that is specific to a REST API resource in Zuora Billing. For example, `53100320` indicates that an invalid value is specified for the `termType` field of the `subscription` object.  The error code beginning with `9` usually indicates that an authentication-related issue occurred, and it can also indicate other unexpected errors depending on different cases. For example, `90000011` indicates that an invalid credential is provided in the request header.   When troubleshooting the error, you can divide the error code into two components: REST API resource code and error category code. See the following Zuora error code sample:  <a href=\"https://assets.zuora.com/zuora-documentation/ZuoraErrorCode.jpeg\" target=\"_blank\"><img src=\"https://assets.zuora.com/zuora-documentation/ZuoraErrorCode.jpeg\" alt=\"Zuora Error Code Sample\"></a>  ## REST API Resource Code  The 6-digit resource code indicates the REST API resource, typically a field of a Zuora object, on which the issue occurs. In the preceding example, `531003` refers to the `termType` field of the `subscription` object.   The value range for all REST API resource codes is from `500000` to `679999`. See [Resource Codes](https://knowledgecenter.zuora.com/Central_Platform/API/AA_REST_API/Resource_Codes) in the Knowledge Center for a full list of resource codes.  ## Error Category Code  The 2-digit error category code identifies the type of error, for example, resource not found or missing required field.   The following table describes all error categories and the corresponding resolution:  | Code    | Error category              | Description    | Resolution    | |:--------|:--------|:--------|:--------| | 10      | Permission or access denied | The request cannot be processed because a certain tenant or user permission is missing. | Check the missing tenant or user permission in the response message and contact [Zuora Global Support](https://support.zuora.com) for enablement. | | 11      | Authentication failed       | Authentication fails due to invalid API authentication credentials. | Ensure that a valid API credential is specified. | | 20      | Invalid format or value     | The request cannot be processed due to an invalid field format or value. | Check the invalid field in the error message, and ensure that the format and value of all fields you passed in are valid. | | 21      | Unknown field in request    | The request cannot be processed because an unknown field exists in the request body. | Check the unknown field name in the response message, and ensure that you do not include any unknown field in the request body. | | 22      | Missing required field      | The request cannot be processed because a required field in the request body is missing. | Check the missing field name in the response message, and ensure that you include all required fields in the request body. | | 30      | Rule restriction            | The request cannot be processed due to the violation of a Zuora business rule. | Check the response message and ensure that the API request meets the specified business rules. | | 40      | Not found                   | The specified resource cannot be found. | Check the response message and ensure that the specified resource exists in your Zuora tenant. | | 45      | Unsupported request         | The requested endpoint does not support the specified HTTP method. | Check your request and ensure that the endpoint and method matches. | | 50      | Locking contention          | This request cannot be processed because the objects this request is trying to modify are being modified by another API request, UI operation, or batch job process. | <p>Resubmit the request first to have another try.</p> <p>If this error still occurs, contact [Zuora Global Support](https://support.zuora.com) with the returned `Zuora-Request-Id` value in the response header for assistance.</p> | | 60      | Internal error              | The server encounters an internal error. | Contact [Zuora Global Support](https://support.zuora.com) with the returned `Zuora-Request-Id` value in the response header for assistance. | | 70      | Request exceeded limit      | The total number of concurrent requests exceeds the limit allowed by the system. | <p>Resubmit the request after the number of seconds specified by the `Retry-After` value in the response header.</p> <p>Check [Concurrent request limits](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Policies/Concurrent_Request_Limits) for details about Zuora’s concurrent request limit policy.</p> | | 90      | Malformed request           | The request cannot be processed due to JSON syntax errors. | Check the syntax error in the JSON request body and ensure that the request is in the correct JSON format. | | 99      | Integration error           | The server encounters an error when communicating with an external system, for example, payment gateway, tax engine provider. | Check the response message and take action accordingly. |   # Pagination  When retrieving information (using GET methods), the optional `pageSize` query parameter sets the maximum number of rows to return in a response. The maximum is `40`; larger values are treated as `40`. If this value is empty or invalid, `pageSize` typically defaults to `10`.  The default value for the maximum number of rows retrieved can be overridden at the method level.  If more rows are available, the response will include a `nextPage` element, which contains a URL for requesting the next page.  If this value is not provided, no more rows are available. No \"previous page\" element is explicitly provided; to support backward paging, use the previous call.  ## Array Size  For data items that are not paginated, the REST API supports arrays of up to 300 rows.  Thus, for instance, repeated pagination can retrieve thousands of customer accounts, but within any account an array of no more than 300 rate plans is returned.  # API Versions  The Zuora REST API are version controlled. Versioning ensures that Zuora REST API changes are backward compatible. Zuora uses a major and minor version nomenclature to manage changes. By specifying a version in a REST request, you can get expected responses regardless of future changes to the API.  ## Major Version  The major version number of the REST API appears in the REST URL. Currently, Zuora only supports the **v1** major version. For example, `POST https://rest.zuora.com/v1/subscriptions`.  ## Minor Version  Zuora uses minor versions for the REST API to control small changes. For example, a field in a REST method is deprecated and a new field is used to replace it.   Some fields in the REST methods are supported as of minor versions. If a field is not noted with a minor version, this field is available for all minor versions. If a field is noted with a minor version, this field is in version control. You must specify the supported minor version in the request header to process without an error.   If a field is in version control, it is either with a minimum minor version or a maximum minor version, or both of them. You can only use this field with the minor version between the minimum and the maximum minor versions. For example, the `invoiceCollect` field in the POST Subscription method is in version control and its maximum minor version is 189.0. You can only use this field with the minor version 189.0 or earlier.  If you specify a version number in the request header that is not supported, Zuora will use the minimum minor version of the REST API. In our REST API documentation, if a field or feature requires a minor version number, we note that in the field description.  You only need to specify the version number when you use the fields require a minor version. To specify the minor version, set the `zuora-version` parameter to the minor version number in the request header for the request call. For example, the `collect` field is in 196.0 minor version. If you want to use this field for the POST Subscription method, set the  `zuora-version` parameter to `196.0` in the request header. The `zuora-version` parameter is case sensitive.  For all the REST API fields, by default, if the minor version is not specified in the request header, Zuora will use the minimum minor version of the REST API to avoid breaking your integration.   ### Minor Version History  The supported minor versions are not serial. This section documents the changes made to each Zuora REST API minor version.  The following table lists the supported versions and the fields that have a Zuora REST API minor version.  | Fields         | Minor Version      | REST Methods    | Description | |:--------|:--------|:--------|:--------| | invoiceCollect | 189.0 and earlier  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Generates an invoice and collects a payment for a subscription. | | collect        | 196.0 and later    | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Collects an automatic payment for a subscription. | | invoice | 196.0 and 207.0| [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Generates an invoice for a subscription. | | invoiceTargetDate | 196.0 and earlier  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\") |Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | invoiceTargetDate | 207.0 and earlier  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | targetDate | 207.0 and later | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\") |Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | targetDate | 211.0 and later | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | includeExisting DraftInvoiceItems | 196.0 and earlier| [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | Specifies whether to include draft invoice items in subscription previews. Specify it to be `true` (default) to include draft invoice items in the preview result. Specify it to be `false` to excludes draft invoice items in the preview result. | | includeExisting DraftDocItems | 207.0 and later  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | Specifies whether to include draft invoice items in subscription previews. Specify it to be `true` (default) to include draft invoice items in the preview result. Specify it to be `false` to excludes draft invoice items in the preview result. | | previewType | 196.0 and earlier| [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | The type of preview you will receive. The possible values are `InvoiceItem`(default), `ChargeMetrics`, and `InvoiceItemChargeMetrics`. | | previewType | 207.0 and later  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | The type of preview you will receive. The possible values are `LegalDoc`(default), `ChargeMetrics`, and `LegalDocChargeMetrics`. | | runBilling  | 211.0 and later  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Generates an invoice or credit memo for a subscription. **Note:** Credit memos are only available if you have the Invoice Settlement feature enabled. | | invoiceDate | 214.0 and earlier  | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date that should appear on the invoice being generated, as `yyyy-mm-dd`. | | invoiceTargetDate | 214.0 and earlier  | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date through which to calculate charges on this account if an invoice is generated, as `yyyy-mm-dd`. | | documentDate | 215.0 and later | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date that should appear on the invoice and credit memo being generated, as `yyyy-mm-dd`. | | targetDate | 215.0 and later | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date through which to calculate charges on this account if an invoice or a credit memo is generated, as `yyyy-mm-dd`. | | memoItemAmount | 223.0 and earlier | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | Amount of the memo item. | | amount | 224.0 and later | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | Amount of the memo item. | | subscriptionNumbers | 222.4 and earlier | [Create order](https://www.zuora.com/developer/api-reference/#operation/POST_Order \"Create order\") | Container for the subscription numbers of the subscriptions in an order. | | subscriptions | 223.0 and later | [Create order](https://www.zuora.com/developer/api-reference/#operation/POST_Order \"Create order\") | Container for the subscription numbers and statuses in an order. | | creditTaxItems | 238.0 and earlier | [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\") | Container for the taxation items of the credit memo item. | | taxItems | 238.0 and earlier | [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Container for the taxation items of the debit memo item. | | taxationItems | 239.0 and later | [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\"); [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Container for the taxation items of the memo item. | | chargeId | 256.0 and earlier | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | ID of the product rate plan charge that the memo is created from. | | productRatePlanChargeId | 257.0 and later | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | ID of the product rate plan charge that the memo is created from. | | comment | 256.0 and earlier | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\"); [Create credit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromInvoice \"Create credit memo from invoice\"); [Create debit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromInvoice \"Create debit memo from invoice\"); [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\"); [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Comments about the product rate plan charge, invoice item, or memo item. | | description | 257.0 and later | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\"); [Create credit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromInvoice \"Create credit memo from invoice\"); [Create debit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromInvoice \"Create debit memo from invoice\"); [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\"); [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Description of the the product rate plan charge, invoice item, or memo item. |   #### Version 207.0 and Later  The response structure of the [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\") and [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") methods are changed. The following invoice related response fields are moved to the invoice container:    * amount   * amountWithoutTax   * taxAmount   * invoiceItems   * targetDate   * chargeMetrics  # Zuora Object Model  The following diagram presents a high-level view of the key Zuora objects. Click the image to open it in a new tab to resize it.  <a href=\"https://www.zuora.com/wp-content/uploads/2017/01/ZuoraERD.jpeg\" target=\"_blank\"><img src=\"https://www.zuora.com/wp-content/uploads/2017/01/ZuoraERD.jpeg\" alt=\"Zuora Object Model Diagram\"></a>  See the following articles for information about other parts of the Zuora business object model:    * <a href=\"https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/D_Invoice_Settlement_Object_Model\" target=\"_blank\">Invoice Settlement Object Model</a>   * <a href=\"https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/BA_Orders_Object_Model\" target=\"_blank\">Orders Object Model</a>  You can use the [Describe object](https://www.zuora.com/developer/api-reference/#operation/GET_Describe) operation to list the fields of each Zuora object that is available in your tenant. When you call the operation, you must specify the API name of the Zuora object.  The following table provides the API name of each Zuora object:  | Object                                        | API Name                                   | |-----------------------------------------------|--------------------------------------------| | Account                                       | `Account`                                  | | Accounting Code                               | `AccountingCode`                           | | Accounting Period                             | `AccountingPeriod`                         | | Amendment                                     | `Amendment`                                | | Application Group                             | `ApplicationGroup`                         | | Billing Run                                   | <p>`BillingRun` - API name used  in the [Describe object](https://www.zuora.com/developer/api-reference/#operation/GET_Describe) operation, Export ZOQL queries, and Data Query.</p> <p>`BillRun` - API name used in the [Actions](https://www.zuora.com/developer/api-reference/#tag/Actions). See the CRUD oprations of [Bill Run](https://www.zuora.com/developer/api-reference/#tag/Bill-Run) for more information about the `BillRun` object. `BillingRun` and `BillRun` have different fields. | | Contact                                       | `Contact`                                  | | Contact Snapshot                              | `ContactSnapshot`                          | | Credit Balance Adjustment                     | `CreditBalanceAdjustment`                  | | Credit Memo                                   | `CreditMemo`                               | | Credit Memo Application                       | `CreditMemoApplication`                    | | Credit Memo Application Item                  | `CreditMemoApplicationItem`                | | Credit Memo Item                              | `CreditMemoItem`                           | | Credit Memo Part                              | `CreditMemoPart`                           | | Credit Memo Part Item                         | `CreditMemoPartItem`                       | | Credit Taxation Item                          | `CreditTaxationItem`                       | | Custom Exchange Rate                          | `FXCustomRate`                             | | Debit Memo                                    | `DebitMemo`                                | | Debit Memo Item                               | `DebitMemoItem`                            | | Debit Taxation Item                           | `DebitTaxationItem`                        | | Discount Applied Metrics                      | `DiscountAppliedMetrics`                   | | Entity                                        | `Tenant`                                   | | Feature                                       | `Feature`                                  | | Gateway Reconciliation Event                  | `PaymentGatewayReconciliationEventLog`     | | Gateway Reconciliation Job                    | `PaymentReconciliationJob`                 | | Gateway Reconciliation Log                    | `PaymentReconciliationLog`                 | | Invoice                                       | `Invoice`                                  | | Invoice Adjustment                            | `InvoiceAdjustment`                        | | Invoice Item                                  | `InvoiceItem`                              | | Invoice Item Adjustment                       | `InvoiceItemAdjustment`                    | | Invoice Payment                               | `InvoicePayment`                           | | Journal Entry                                 | `JournalEntry`                             | | Journal Entry Item                            | `JournalEntryItem`                         | | Journal Run                                   | `JournalRun`                               | | Order                                         | `Order`                                    | | Order Action                                  | `OrderAction`                              | | Order ELP                                     | `OrderElp`                                 | | Order Item                                    | `OrderItem`                                | | Order MRR                                     | `OrderMrr`                                 | | Order Quantity                                | `OrderQuantity`                            | | Order TCB                                     | `OrderTcb`                                 | | Order TCV                                     | `OrderTcv`                                 | | Payment                                       | `Payment`                                  | | Payment Application                           | `PaymentApplication`                       | | Payment Application Item                      | `PaymentApplicationItem`                   | | Payment Method                                | `PaymentMethod`                            | | Payment Method Snapshot                       | `PaymentMethodSnapshot`                    | | Payment Method Transaction Log                | `PaymentMethodTransactionLog`              | | Payment Method Update                         | `UpdaterDetail`                            | | Payment Part                                  | `PaymentPart`                              | | Payment Part Item                             | `PaymentPartItem`                          | | Payment Run                                   | `PaymentRun`                               | | Payment Transaction Log                       | `PaymentTransactionLog`                    | | Processed Usage                               | `ProcessedUsage`                           | | Product                                       | `Product`                                  | | Product Feature                               | `ProductFeature`                           | | Product Rate Plan                             | `ProductRatePlan`                          | | Product Rate Plan Charge                      | `ProductRatePlanCharge`                    | | Product Rate Plan Charge Tier                 | `ProductRatePlanChargeTier`                | | Rate Plan                                     | `RatePlan`                                 | | Rate Plan Charge                              | `RatePlanCharge`                           | | Rate Plan Charge Tier                         | `RatePlanChargeTier`                       | | Refund                                        | `Refund`                                   | | Refund Application                            | `RefundApplication`                        | | Refund Application Item                       | `RefundApplicationItem`                    | | Refund Invoice Payment                        | `RefundInvoicePayment`                     | | Refund Part                                   | `RefundPart`                               | | Refund Part Item                              | `RefundPartItem`                           | | Refund Transaction Log                        | `RefundTransactionLog`                     | | Revenue Charge Summary                        | `RevenueChargeSummary`                     | | Revenue Charge Summary Item                   | `RevenueChargeSummaryItem`                 | | Revenue Event                                 | `RevenueEvent`                             | | Revenue Event Credit Memo Item                | `RevenueEventCreditMemoItem`               | | Revenue Event Debit Memo Item                 | `RevenueEventDebitMemoItem`                | | Revenue Event Invoice Item                    | `RevenueEventInvoiceItem`                  | | Revenue Event Invoice Item Adjustment         | `RevenueEventInvoiceItemAdjustment`        | | Revenue Event Item                            | `RevenueEventItem`                         | | Revenue Event Item Credit Memo Item           | `RevenueEventItemCreditMemoItem`           | | Revenue Event Item Debit Memo Item            | `RevenueEventItemDebitMemoItem`            | | Revenue Event Item Invoice Item               | `RevenueEventItemInvoiceItem`              | | Revenue Event Item Invoice Item Adjustment    | `RevenueEventItemInvoiceItemAdjustment`    | | Revenue Event Type                            | `RevenueEventType`                         | | Revenue Schedule                              | `RevenueSchedule`                          | | Revenue Schedule Credit Memo Item             | `RevenueScheduleCreditMemoItem`            | | Revenue Schedule Debit Memo Item              | `RevenueScheduleDebitMemoItem`             | | Revenue Schedule Invoice Item                 | `RevenueScheduleInvoiceItem`               | | Revenue Schedule Invoice Item Adjustment      | `RevenueScheduleInvoiceItemAdjustment`     | | Revenue Schedule Item                         | `RevenueScheduleItem`                      | | Revenue Schedule Item Credit Memo Item        | `RevenueScheduleItemCreditMemoItem`        | | Revenue Schedule Item Debit Memo Item         | `RevenueScheduleItemDebitMemoItem`         | | Revenue Schedule Item Invoice Item            | `RevenueScheduleItemInvoiceItem`           | | Revenue Schedule Item Invoice Item Adjustment | `RevenueScheduleItemInvoiceItemAdjustment` | | Subscription                                  | `Subscription`                             | | Subscription Product Feature                  | `SubscriptionProductFeature`               | | Taxable Item Snapshot                         | `TaxableItemSnapshot`                      | | Taxation Item                                 | `TaxationItem`                             | | Updater Batch                                 | `UpdaterBatch`                             | | Usage                                         | `Usage`                                    | 
 *
 * The version of the OpenAPI document: 2020-06-24
 * Contact: docs@zuora.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../../../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../../base';
// @ts-ignore
import { CommonResponseType } from '../../../com/zuora/models';
// @ts-ignore
import { DebitMemoFromChargeType } from '../../../com/zuora/models';
// @ts-ignore
import { GETDebitMemoCollectionType } from '../../../com/zuora/models';
// @ts-ignore
import { GETDebitMemoItemCollectionType } from '../../../com/zuora/models';
// @ts-ignore
import { GETDebitMemoItemType } from '../../../com/zuora/models';
// @ts-ignore
import { GETDebitMemoType } from '../../../com/zuora/models';
// @ts-ignore
import { GETTaxationItemListType } from '../../../com/zuora/models';
// @ts-ignore
import { GETTaxationItemsOfDebitMemoItemType } from '../../../com/zuora/models';
// @ts-ignore
import { GetDebitMemoApplicationPartCollectionType } from '../../../com/zuora/models';
// @ts-ignore
import { POSTMemoPdfResponse } from '../../../com/zuora/models';
// @ts-ignore
import { POSTTaxationItemListForDMType } from '../../../com/zuora/models';
// @ts-ignore
import { POSTUploadFileResponse } from '../../../com/zuora/models';
// @ts-ignore
import { PUTBatchDebitMemosRequest } from '../../../com/zuora/models';
// @ts-ignore
import { PUTDebitMemoType } from '../../../com/zuora/models';
// @ts-ignore
import { PostDebitMemoEmailType } from '../../../com/zuora/models';
/**
 * DebitMemosApi - axios parameter creator
 * @export
 */
export const DebitMemosApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a debit memo. Only debit memos with the Cancelled status can be deleted.   You can delete a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Delete debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dELETEDebitMemo: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling dELETEDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific debit memo. 
         * @summary Get debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemo: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling gETDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves information about the payments or credit memos that are applied to a specified debit memo. 
         * @summary Get debit memo application parts
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemoApplicationParts: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling gETDebitMemoApplicationParts.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/application-parts`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about a specific item of a debit memo. A debit memo item is a single line item in a debit memo. 
         * @summary Get debit memo item
         * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;taxItems&#x60; * &#x60;taxationItems&#x60; * &#x60;comment&#x60; * &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemoItem: async (dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dmitemid' is not null or undefined
            if (dmitemid === null || dmitemid === undefined) {
                throw new RequiredError('dmitemid','Required parameter dmitemid was null or undefined when calling gETDebitMemoItem.');
            }
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling gETDebitMemoItem.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/items/{dmitemid}`
                .replace(`{${"dmitemid"}}`, encodeURIComponent(String(dmitemid)))
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraVersion !== undefined && zuoraVersion !== null) {
                localVarHeaderParameter['zuora-version'] = String(zuoraVersion);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a debit memo. A debit memo item is a single line item in a debit memo.   ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100&sort=createdDate 
         * @summary Get debit memo items
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;items&#x60; &gt; &#x60;taxItems&#x60; * &#x60;items&#x60; &gt; &#x60;taxationItems&#x60; * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {string} [id] This parameter filters the response based on the &#x60;id&#x60; field. 
         * @param {string} [serviceEndDate] This parameter filters the response based on the &#x60;serviceEndDate&#x60; field. 
         * @param {string} [serviceStartDate] This parameter filters the response based on the &#x60;serviceStartDate&#x60; field. 
         * @param {string} [sku] This parameter filters the response based on the &#x60;sku&#x60; field. 
         * @param {string} [skuName] This parameter filters the response based on the &#x60;skuName&#x60; field. 
         * @param {string} [sourceItemId] This parameter filters the response based on the &#x60;sourceItemId&#x60; field. 
         * @param {string} [subscriptionId] This parameter filters the response based on the &#x60;subscriptionId&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by updated date.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - id   - amount   - beAppliedAmount   - sku   - skuName   - serviceStartDate   - serviceEndDate   - sourceItemId   - createdDate   - createdById   - updatedDate   - updatedById   - subscriptionId    Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?sort&#x3D;createdDate  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount&#x3D;100&amp;sort&#x3D;createdDate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemoItems: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, zuoraVersion?: string, amount?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, id?: string, serviceEndDate?: string, serviceStartDate?: string, sku?: string, skuName?: string, sourceItemId?: string, subscriptionId?: string, updatedById?: string, updatedDate?: string, sort?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling gETDebitMemoItems.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/items`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (amount !== undefined) {
                localVarQueryParameter['amount'] = amount;
            }

            if (beAppliedAmount !== undefined) {
                localVarQueryParameter['beAppliedAmount'] = beAppliedAmount;
            }

            if (createdById !== undefined) {
                localVarQueryParameter['createdById'] = createdById;
            }

            if (createdDate !== undefined) {
                localVarQueryParameter['createdDate'] = (createdDate as any instanceof Date) ?
                    (createdDate as any).toISOString() :
                    createdDate;
            }

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            if (serviceEndDate !== undefined) {
                localVarQueryParameter['serviceEndDate'] = (serviceEndDate as any instanceof Date) ?
                    (serviceEndDate as any).toISOString().substr(0,10) :
                    serviceEndDate;
            }

            if (serviceStartDate !== undefined) {
                localVarQueryParameter['serviceStartDate'] = (serviceStartDate as any instanceof Date) ?
                    (serviceStartDate as any).toISOString().substr(0,10) :
                    serviceStartDate;
            }

            if (sku !== undefined) {
                localVarQueryParameter['sku'] = sku;
            }

            if (skuName !== undefined) {
                localVarQueryParameter['skuName'] = skuName;
            }

            if (sourceItemId !== undefined) {
                localVarQueryParameter['sourceItemId'] = sourceItemId;
            }

            if (subscriptionId !== undefined) {
                localVarQueryParameter['subscriptionId'] = subscriptionId;
            }

            if (updatedById !== undefined) {
                localVarQueryParameter['updatedById'] = updatedById;
            }

            if (updatedDate !== undefined) {
                localVarQueryParameter['updatedDate'] = (updatedDate as any instanceof Date) ?
                    (updatedDate as any).toISOString() :
                    updatedDate;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraVersion !== undefined && zuoraVersion !== null) {
                localVarHeaderParameter['zuora-version'] = String(zuoraVersion);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about all debit memos associated with all customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos?status=Processed  - /v1/debitmemos?referredInvoiceId=null&status=Draft  - /v1/debitmemos?status=Processed&type=External&sort=+number 
         * @summary Get debit memos
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [balance] This parameter filters the response based on the &#x60;balance&#x60; field. 
         * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
         * @param {string} [debitMemoDate] This parameter filters the response based on the &#x60;debitMemoDate&#x60; field. 
         * @param {string} [dueDate] This parameter filters the response based on the &#x60;dueDate&#x60; field. 
         * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
         * @param {string} [referredInvoiceId] This parameter filters the response based on the &#x60;referredInvoiceId&#x60; field. 
         * @param {'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
         * @param {string} [targetDate] This parameter filters the response based on the &#x60;targetDate&#x60; field. 
         * @param {number} [taxAmount] This parameter filters the response based on the &#x60;taxAmount&#x60; field. 
         * @param {number} [totalTaxExemptAmount] This parameter filters the response based on the &#x60;totalTaxExemptAmount&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by debit memo number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - debitMemoDate   - targetDate   - dueDate   - amount   - taxAmount   - totalTaxExemptAmount   - balance   - beAppliedAmount   - referredInvoiceId   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/debitmemos?sort&#x3D;+number  - /v1/debitmemos?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemos: async (zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, balance?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, currency?: string, debitMemoDate?: string, dueDate?: string, number?: string, referredInvoiceId?: string, status?: 'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress', targetDate?: string, taxAmount?: number, totalTaxExemptAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/debitmemos`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (accountId !== undefined) {
                localVarQueryParameter['accountId'] = accountId;
            }

            if (amount !== undefined) {
                localVarQueryParameter['amount'] = amount;
            }

            if (balance !== undefined) {
                localVarQueryParameter['balance'] = balance;
            }

            if (beAppliedAmount !== undefined) {
                localVarQueryParameter['beAppliedAmount'] = beAppliedAmount;
            }

            if (createdById !== undefined) {
                localVarQueryParameter['createdById'] = createdById;
            }

            if (createdDate !== undefined) {
                localVarQueryParameter['createdDate'] = (createdDate as any instanceof Date) ?
                    (createdDate as any).toISOString() :
                    createdDate;
            }

            if (currency !== undefined) {
                localVarQueryParameter['currency'] = currency;
            }

            if (debitMemoDate !== undefined) {
                localVarQueryParameter['debitMemoDate'] = (debitMemoDate as any instanceof Date) ?
                    (debitMemoDate as any).toISOString().substr(0,10) :
                    debitMemoDate;
            }

            if (dueDate !== undefined) {
                localVarQueryParameter['dueDate'] = (dueDate as any instanceof Date) ?
                    (dueDate as any).toISOString().substr(0,10) :
                    dueDate;
            }

            if (number !== undefined) {
                localVarQueryParameter['number'] = number;
            }

            if (referredInvoiceId !== undefined) {
                localVarQueryParameter['referredInvoiceId'] = referredInvoiceId;
            }

            if (status !== undefined) {
                localVarQueryParameter['status'] = status;
            }

            if (targetDate !== undefined) {
                localVarQueryParameter['targetDate'] = (targetDate as any instanceof Date) ?
                    (targetDate as any).toISOString().substr(0,10) :
                    targetDate;
            }

            if (taxAmount !== undefined) {
                localVarQueryParameter['taxAmount'] = taxAmount;
            }

            if (totalTaxExemptAmount !== undefined) {
                localVarQueryParameter['totalTaxExemptAmount'] = totalTaxExemptAmount;
            }

            if (updatedById !== undefined) {
                localVarQueryParameter['updatedById'] = updatedById;
            }

            if (updatedDate !== undefined) {
                localVarQueryParameter['updatedDate'] = (updatedDate as any instanceof Date) ?
                    (updatedDate as any).toISOString() :
                    updatedDate;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about the taxation items of a specific debit memo item. 
         * @summary Get taxation items of debit memo item
         * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {number} [page] Page number. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETTaxationItemsOfDebitMemoItem: async (dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dmitemid' is not null or undefined
            if (dmitemid === null || dmitemid === undefined) {
                throw new RequiredError('dmitemid','Required parameter dmitemid was null or undefined when calling gETTaxationItemsOfDebitMemoItem.');
            }
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling gETTaxationItemsOfDebitMemoItem.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/items/{dmitemid}/taxation-items`
                .replace(`{${"dmitemid"}}`, encodeURIComponent(String(dmitemid)))
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates taxation items for a debit memo. 
         * @summary Create taxation items for debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {POSTTaxationItemListForDMType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDMTaxationItems: async (debitMemoId: string, body: POSTTaxationItemListForDMType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pOSTDMTaxationItems.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pOSTDMTaxationItems.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/taxationitems`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from a product rate plan charge. Zuora supports the creation of debit memos from any type of product rate plan charge. The charges can also have any amount and any charge model, except for discout charge models.  When debit memos are created from product rate plan charges, the specified amount with decimal places is now validated based on the decimal places supported by each currency.  You can create a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create debit memo from charge
         * @param {DebitMemoFromChargeType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;charges&#x60; &gt; &#x60;amount&#x60; * &#x60;charges&#x60; &gt; &#x60;memoItemAmount&#x60; * &#x60;charges&#x60; &gt; &#x60;chargeId&#x60; * &#x60;charges&#x60; &gt; &#x60;productRatePlanChargeId&#x60;        * &#x60;charges&#x60; &gt; &#x60;comment&#x60; * &#x60;charges&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDebitMemoFromPrpc: async (body: DebitMemoFromChargeType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pOSTDebitMemoFromPrpc.');
            }
            const localVarPath = `/v1/debitmemos`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraVersion !== undefined && zuoraVersion !== null) {
                localVarHeaderParameter['zuora-version'] = String(zuoraVersion);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates a PDF file for a specified debit memo. To access the generated PDF file, you can download it by clicking **View PDF** on the detailed debit memo page through the Zuora UI.  This REST API operation can be used only if you have the Billing user permission \"Regenerate PDF\" enabled. 
         * @summary Create debit memo PDF
         * @param {string} debitMemoId The unique ID of the debit memo that you want to create a PDF file for. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDebitMemoPDF: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pOSTDebitMemoPDF.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/pdfs`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Sends a posted debit memo to the specified email addresses manually.    ## Notes   - You must activate the **Email Debit Memo | Manually email Debit Memo** notification before emailing debit memos. To include the debit memo PDF in the email, select the **Include Debit Memo PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Manual Email for Debit Memo Default Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The debit memos are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
         * @summary Email debit memo
         * @param {string} debitMemoId The ID of a posted debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {PostDebitMemoEmailType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTEmailDebitMemo: async (debitMemoId: string, request: PostDebitMemoEmailType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pOSTEmailDebitMemo.');
            }
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling pOSTEmailDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/emails`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof request !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(request !== undefined ? request : {}) : (request || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Uploads an externally generated PDF file for a debit memo that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one debit memo. 
         * @summary Upload file for debit memo
         * @param {string} debitMemoId The ID of the debit memo that you want to upload a PDF file for. For example, 402890555a87d7f5015a8919e4fe002e. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {any} [file] The PDF file to upload for the debit memo. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTUploadFileForDebitMemo: async (debitMemoId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pOSTUploadFileForDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/files`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Updates the due date for multiple debit memos in batches with one call.  
         * @summary Update debit memos
         * @param {PUTBatchDebitMemosRequest} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTBatchUpdateDebitMemos: async (body: PUTBatchDebitMemosRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pUTBatchUpdateDebitMemos.');
            }
            const localVarPath = `/v1/debitmemos`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a debit memo. Only debit memos with the Draft status can be cancelled.   You can cancel a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Cancel debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTCancelDebitMemo: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pUTCancelDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/cancel`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates the basic and finance information about a debit memo. Currently, Zuora supports updating tax-exclusive memo items, but does not support updating tax-inclusive memo items.   If the amount of a memo item is updated, the tax will be recalculated in the following conditions:   - The memo is created from a product rate plan charge and you use Avalara to calculate the tax.   - The memo is created from an invoice and you use Avalara or Zuora Tax to calculate the tax.  You can update a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Update debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {PUTDebitMemoType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTDebitMemo: async (debitMemoId: string, body: PUTDebitMemoType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pUTDebitMemo.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pUTDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Posts a debit memo to activate it. You can post debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
         * @summary Post debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTPostDebitMemo: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pUTPostDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/post`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unposts a debit memo that is in Posted status. If any credit memo or payment has been applied to a debit memo, you are not allowed to unpost the debit memo. After a debit memo is unposted, its status becomes Draft.  You can unpost debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
         * @summary Unpost debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUnpostDebitMemo: async (debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'debitMemoId' is not null or undefined
            if (debitMemoId === null || debitMemoId === undefined) {
                throw new RequiredError('debitMemoId','Required parameter debitMemoId was null or undefined when calling pUTUnpostDebitMemo.');
            }
            const localVarPath = `/v1/debitmemos/{debitMemoId}/unpost`
                .replace(`{${"debitMemoId"}}`, encodeURIComponent(String(debitMemoId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DebitMemosApi - functional programming interface
 * @export
 */
export const DebitMemosApiFp = function(configuration?: Configuration) {
    return {
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a debit memo. Only debit memos with the Cancelled status can be deleted.   You can delete a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Delete debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dELETEDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonResponseType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).dELETEDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific debit memo. 
         * @summary Get debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).gETDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves information about the payments or credit memos that are applied to a specified debit memo. 
         * @summary Get debit memo application parts
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETDebitMemoApplicationParts(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetDebitMemoApplicationPartCollectionType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).gETDebitMemoApplicationParts(debitMemoId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about a specific item of a debit memo. A debit memo item is a single line item in a debit memo. 
         * @summary Get debit memo item
         * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;taxItems&#x60; * &#x60;taxationItems&#x60; * &#x60;comment&#x60; * &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETDebitMemoItem(dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoItemType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).gETDebitMemoItem(dmitemid, debitMemoId, zuoraTrackId, zuoraEntityIds, zuoraVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a debit memo. A debit memo item is a single line item in a debit memo.   ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100&sort=createdDate 
         * @summary Get debit memo items
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;items&#x60; &gt; &#x60;taxItems&#x60; * &#x60;items&#x60; &gt; &#x60;taxationItems&#x60; * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {string} [id] This parameter filters the response based on the &#x60;id&#x60; field. 
         * @param {string} [serviceEndDate] This parameter filters the response based on the &#x60;serviceEndDate&#x60; field. 
         * @param {string} [serviceStartDate] This parameter filters the response based on the &#x60;serviceStartDate&#x60; field. 
         * @param {string} [sku] This parameter filters the response based on the &#x60;sku&#x60; field. 
         * @param {string} [skuName] This parameter filters the response based on the &#x60;skuName&#x60; field. 
         * @param {string} [sourceItemId] This parameter filters the response based on the &#x60;sourceItemId&#x60; field. 
         * @param {string} [subscriptionId] This parameter filters the response based on the &#x60;subscriptionId&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by updated date.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - id   - amount   - beAppliedAmount   - sku   - skuName   - serviceStartDate   - serviceEndDate   - sourceItemId   - createdDate   - createdById   - updatedDate   - updatedById   - subscriptionId    Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?sort&#x3D;createdDate  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount&#x3D;100&amp;sort&#x3D;createdDate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETDebitMemoItems(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, zuoraVersion?: string, amount?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, id?: string, serviceEndDate?: string, serviceStartDate?: string, sku?: string, skuName?: string, sourceItemId?: string, subscriptionId?: string, updatedById?: string, updatedDate?: string, sort?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoItemCollectionType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).gETDebitMemoItems(debitMemoId, zuoraTrackId, zuoraEntityIds, pageSize, zuoraVersion, amount, beAppliedAmount, createdById, createdDate, id, serviceEndDate, serviceStartDate, sku, skuName, sourceItemId, subscriptionId, updatedById, updatedDate, sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about all debit memos associated with all customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos?status=Processed  - /v1/debitmemos?referredInvoiceId=null&status=Draft  - /v1/debitmemos?status=Processed&type=External&sort=+number 
         * @summary Get debit memos
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [balance] This parameter filters the response based on the &#x60;balance&#x60; field. 
         * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
         * @param {string} [debitMemoDate] This parameter filters the response based on the &#x60;debitMemoDate&#x60; field. 
         * @param {string} [dueDate] This parameter filters the response based on the &#x60;dueDate&#x60; field. 
         * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
         * @param {string} [referredInvoiceId] This parameter filters the response based on the &#x60;referredInvoiceId&#x60; field. 
         * @param {'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
         * @param {string} [targetDate] This parameter filters the response based on the &#x60;targetDate&#x60; field. 
         * @param {number} [taxAmount] This parameter filters the response based on the &#x60;taxAmount&#x60; field. 
         * @param {number} [totalTaxExemptAmount] This parameter filters the response based on the &#x60;totalTaxExemptAmount&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by debit memo number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - debitMemoDate   - targetDate   - dueDate   - amount   - taxAmount   - totalTaxExemptAmount   - balance   - beAppliedAmount   - referredInvoiceId   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/debitmemos?sort&#x3D;+number  - /v1/debitmemos?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETDebitMemos(zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, balance?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, currency?: string, debitMemoDate?: string, dueDate?: string, number?: string, referredInvoiceId?: string, status?: 'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress', targetDate?: string, taxAmount?: number, totalTaxExemptAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoCollectionType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).gETDebitMemos(zuoraTrackId, zuoraEntityIds, pageSize, accountId, amount, balance, beAppliedAmount, createdById, createdDate, currency, debitMemoDate, dueDate, number, referredInvoiceId, status, targetDate, taxAmount, totalTaxExemptAmount, updatedById, updatedDate, sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about the taxation items of a specific debit memo item. 
         * @summary Get taxation items of debit memo item
         * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {number} [page] Page number. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETTaxationItemsOfDebitMemoItem(dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETTaxationItemsOfDebitMemoItemType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).gETTaxationItemsOfDebitMemoItem(dmitemid, debitMemoId, zuoraTrackId, zuoraEntityIds, pageSize, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates taxation items for a debit memo. 
         * @summary Create taxation items for debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {POSTTaxationItemListForDMType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTDMTaxationItems(debitMemoId: string, body: POSTTaxationItemListForDMType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETTaxationItemListType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pOSTDMTaxationItems(debitMemoId, body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from a product rate plan charge. Zuora supports the creation of debit memos from any type of product rate plan charge. The charges can also have any amount and any charge model, except for discout charge models.  When debit memos are created from product rate plan charges, the specified amount with decimal places is now validated based on the decimal places supported by each currency.  You can create a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create debit memo from charge
         * @param {DebitMemoFromChargeType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;charges&#x60; &gt; &#x60;amount&#x60; * &#x60;charges&#x60; &gt; &#x60;memoItemAmount&#x60; * &#x60;charges&#x60; &gt; &#x60;chargeId&#x60; * &#x60;charges&#x60; &gt; &#x60;productRatePlanChargeId&#x60;        * &#x60;charges&#x60; &gt; &#x60;comment&#x60; * &#x60;charges&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTDebitMemoFromPrpc(body: DebitMemoFromChargeType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pOSTDebitMemoFromPrpc(body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates a PDF file for a specified debit memo. To access the generated PDF file, you can download it by clicking **View PDF** on the detailed debit memo page through the Zuora UI.  This REST API operation can be used only if you have the Billing user permission \"Regenerate PDF\" enabled. 
         * @summary Create debit memo PDF
         * @param {string} debitMemoId The unique ID of the debit memo that you want to create a PDF file for. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTDebitMemoPDF(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<POSTMemoPdfResponse>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pOSTDebitMemoPDF(debitMemoId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Sends a posted debit memo to the specified email addresses manually.    ## Notes   - You must activate the **Email Debit Memo | Manually email Debit Memo** notification before emailing debit memos. To include the debit memo PDF in the email, select the **Include Debit Memo PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Manual Email for Debit Memo Default Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The debit memos are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
         * @summary Email debit memo
         * @param {string} debitMemoId The ID of a posted debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {PostDebitMemoEmailType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTEmailDebitMemo(debitMemoId: string, request: PostDebitMemoEmailType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonResponseType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pOSTEmailDebitMemo(debitMemoId, request, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Uploads an externally generated PDF file for a debit memo that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one debit memo. 
         * @summary Upload file for debit memo
         * @param {string} debitMemoId The ID of the debit memo that you want to upload a PDF file for. For example, 402890555a87d7f5015a8919e4fe002e. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {any} [file] The PDF file to upload for the debit memo. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTUploadFileForDebitMemo(debitMemoId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<POSTUploadFileResponse>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pOSTUploadFileForDebitMemo(debitMemoId, zuoraEntityIds, zuoraTrackId, file, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Updates the due date for multiple debit memos in batches with one call.  
         * @summary Update debit memos
         * @param {PUTBatchDebitMemosRequest} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTBatchUpdateDebitMemos(body: PUTBatchDebitMemosRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonResponseType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pUTBatchUpdateDebitMemos(body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a debit memo. Only debit memos with the Draft status can be cancelled.   You can cancel a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Cancel debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTCancelDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pUTCancelDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates the basic and finance information about a debit memo. Currently, Zuora supports updating tax-exclusive memo items, but does not support updating tax-inclusive memo items.   If the amount of a memo item is updated, the tax will be recalculated in the following conditions:   - The memo is created from a product rate plan charge and you use Avalara to calculate the tax.   - The memo is created from an invoice and you use Avalara or Zuora Tax to calculate the tax.  You can update a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Update debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {PUTDebitMemoType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTDebitMemo(debitMemoId: string, body: PUTDebitMemoType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pUTDebitMemo(debitMemoId, body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Posts a debit memo to activate it. You can post debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
         * @summary Post debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTPostDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pUTPostDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unposts a debit memo that is in Posted status. If any credit memo or payment has been applied to a debit memo, you are not allowed to unpost the debit memo. After a debit memo is unposted, its status becomes Draft.  You can unpost debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
         * @summary Unpost debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTUnpostDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoType>> {
            const localVarAxiosArgs = await DebitMemosApiAxiosParamCreator(configuration).pUTUnpostDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DebitMemosApi - factory interface
 * @export
 */
export const DebitMemosApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a debit memo. Only debit memos with the Cancelled status can be deleted.   You can delete a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Delete debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dELETEDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<CommonResponseType> {
            return DebitMemosApiFp(configuration).dELETEDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific debit memo. 
         * @summary Get debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETDebitMemoType> {
            return DebitMemosApiFp(configuration).gETDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves information about the payments or credit memos that are applied to a specified debit memo. 
         * @summary Get debit memo application parts
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemoApplicationParts(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GetDebitMemoApplicationPartCollectionType> {
            return DebitMemosApiFp(configuration).gETDebitMemoApplicationParts(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about a specific item of a debit memo. A debit memo item is a single line item in a debit memo. 
         * @summary Get debit memo item
         * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;taxItems&#x60; * &#x60;taxationItems&#x60; * &#x60;comment&#x60; * &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemoItem(dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): AxiosPromise<GETDebitMemoItemType> {
            return DebitMemosApiFp(configuration).gETDebitMemoItem(dmitemid, debitMemoId, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a debit memo. A debit memo item is a single line item in a debit memo.   ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100&sort=createdDate 
         * @summary Get debit memo items
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;items&#x60; &gt; &#x60;taxItems&#x60; * &#x60;items&#x60; &gt; &#x60;taxationItems&#x60; * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {string} [id] This parameter filters the response based on the &#x60;id&#x60; field. 
         * @param {string} [serviceEndDate] This parameter filters the response based on the &#x60;serviceEndDate&#x60; field. 
         * @param {string} [serviceStartDate] This parameter filters the response based on the &#x60;serviceStartDate&#x60; field. 
         * @param {string} [sku] This parameter filters the response based on the &#x60;sku&#x60; field. 
         * @param {string} [skuName] This parameter filters the response based on the &#x60;skuName&#x60; field. 
         * @param {string} [sourceItemId] This parameter filters the response based on the &#x60;sourceItemId&#x60; field. 
         * @param {string} [subscriptionId] This parameter filters the response based on the &#x60;subscriptionId&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by updated date.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - id   - amount   - beAppliedAmount   - sku   - skuName   - serviceStartDate   - serviceEndDate   - sourceItemId   - createdDate   - createdById   - updatedDate   - updatedById   - subscriptionId    Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?sort&#x3D;createdDate  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount&#x3D;100&amp;sort&#x3D;createdDate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemoItems(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, zuoraVersion?: string, amount?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, id?: string, serviceEndDate?: string, serviceStartDate?: string, sku?: string, skuName?: string, sourceItemId?: string, subscriptionId?: string, updatedById?: string, updatedDate?: string, sort?: string, options?: any): AxiosPromise<GETDebitMemoItemCollectionType> {
            return DebitMemosApiFp(configuration).gETDebitMemoItems(debitMemoId, zuoraTrackId, zuoraEntityIds, pageSize, zuoraVersion, amount, beAppliedAmount, createdById, createdDate, id, serviceEndDate, serviceStartDate, sku, skuName, sourceItemId, subscriptionId, updatedById, updatedDate, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about all debit memos associated with all customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos?status=Processed  - /v1/debitmemos?referredInvoiceId=null&status=Draft  - /v1/debitmemos?status=Processed&type=External&sort=+number 
         * @summary Get debit memos
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [balance] This parameter filters the response based on the &#x60;balance&#x60; field. 
         * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
         * @param {string} [debitMemoDate] This parameter filters the response based on the &#x60;debitMemoDate&#x60; field. 
         * @param {string} [dueDate] This parameter filters the response based on the &#x60;dueDate&#x60; field. 
         * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
         * @param {string} [referredInvoiceId] This parameter filters the response based on the &#x60;referredInvoiceId&#x60; field. 
         * @param {'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
         * @param {string} [targetDate] This parameter filters the response based on the &#x60;targetDate&#x60; field. 
         * @param {number} [taxAmount] This parameter filters the response based on the &#x60;taxAmount&#x60; field. 
         * @param {number} [totalTaxExemptAmount] This parameter filters the response based on the &#x60;totalTaxExemptAmount&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by debit memo number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - debitMemoDate   - targetDate   - dueDate   - amount   - taxAmount   - totalTaxExemptAmount   - balance   - beAppliedAmount   - referredInvoiceId   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/debitmemos?sort&#x3D;+number  - /v1/debitmemos?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETDebitMemos(zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, balance?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, currency?: string, debitMemoDate?: string, dueDate?: string, number?: string, referredInvoiceId?: string, status?: 'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress', targetDate?: string, taxAmount?: number, totalTaxExemptAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options?: any): AxiosPromise<GETDebitMemoCollectionType> {
            return DebitMemosApiFp(configuration).gETDebitMemos(zuoraTrackId, zuoraEntityIds, pageSize, accountId, amount, balance, beAppliedAmount, createdById, createdDate, currency, debitMemoDate, dueDate, number, referredInvoiceId, status, targetDate, taxAmount, totalTaxExemptAmount, updatedById, updatedDate, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about the taxation items of a specific debit memo item. 
         * @summary Get taxation items of debit memo item
         * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {number} [page] Page number. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETTaxationItemsOfDebitMemoItem(dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options?: any): AxiosPromise<GETTaxationItemsOfDebitMemoItemType> {
            return DebitMemosApiFp(configuration).gETTaxationItemsOfDebitMemoItem(dmitemid, debitMemoId, zuoraTrackId, zuoraEntityIds, pageSize, page, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates taxation items for a debit memo. 
         * @summary Create taxation items for debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {POSTTaxationItemListForDMType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDMTaxationItems(debitMemoId: string, body: POSTTaxationItemListForDMType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETTaxationItemListType> {
            return DebitMemosApiFp(configuration).pOSTDMTaxationItems(debitMemoId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from a product rate plan charge. Zuora supports the creation of debit memos from any type of product rate plan charge. The charges can also have any amount and any charge model, except for discout charge models.  When debit memos are created from product rate plan charges, the specified amount with decimal places is now validated based on the decimal places supported by each currency.  You can create a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create debit memo from charge
         * @param {DebitMemoFromChargeType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;charges&#x60; &gt; &#x60;amount&#x60; * &#x60;charges&#x60; &gt; &#x60;memoItemAmount&#x60; * &#x60;charges&#x60; &gt; &#x60;chargeId&#x60; * &#x60;charges&#x60; &gt; &#x60;productRatePlanChargeId&#x60;        * &#x60;charges&#x60; &gt; &#x60;comment&#x60; * &#x60;charges&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDebitMemoFromPrpc(body: DebitMemoFromChargeType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): AxiosPromise<GETDebitMemoType> {
            return DebitMemosApiFp(configuration).pOSTDebitMemoFromPrpc(body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates a PDF file for a specified debit memo. To access the generated PDF file, you can download it by clicking **View PDF** on the detailed debit memo page through the Zuora UI.  This REST API operation can be used only if you have the Billing user permission \"Regenerate PDF\" enabled. 
         * @summary Create debit memo PDF
         * @param {string} debitMemoId The unique ID of the debit memo that you want to create a PDF file for. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDebitMemoPDF(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<POSTMemoPdfResponse> {
            return DebitMemosApiFp(configuration).pOSTDebitMemoPDF(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Sends a posted debit memo to the specified email addresses manually.    ## Notes   - You must activate the **Email Debit Memo | Manually email Debit Memo** notification before emailing debit memos. To include the debit memo PDF in the email, select the **Include Debit Memo PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Manual Email for Debit Memo Default Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The debit memos are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
         * @summary Email debit memo
         * @param {string} debitMemoId The ID of a posted debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {PostDebitMemoEmailType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTEmailDebitMemo(debitMemoId: string, request: PostDebitMemoEmailType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<CommonResponseType> {
            return DebitMemosApiFp(configuration).pOSTEmailDebitMemo(debitMemoId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Uploads an externally generated PDF file for a debit memo that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one debit memo. 
         * @summary Upload file for debit memo
         * @param {string} debitMemoId The ID of the debit memo that you want to upload a PDF file for. For example, 402890555a87d7f5015a8919e4fe002e. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {any} [file] The PDF file to upload for the debit memo. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTUploadFileForDebitMemo(debitMemoId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options?: any): AxiosPromise<POSTUploadFileResponse> {
            return DebitMemosApiFp(configuration).pOSTUploadFileForDebitMemo(debitMemoId, zuoraEntityIds, zuoraTrackId, file, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Updates the due date for multiple debit memos in batches with one call.  
         * @summary Update debit memos
         * @param {PUTBatchDebitMemosRequest} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTBatchUpdateDebitMemos(body: PUTBatchDebitMemosRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<CommonResponseType> {
            return DebitMemosApiFp(configuration).pUTBatchUpdateDebitMemos(body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a debit memo. Only debit memos with the Draft status can be cancelled.   You can cancel a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Cancel debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTCancelDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETDebitMemoType> {
            return DebitMemosApiFp(configuration).pUTCancelDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates the basic and finance information about a debit memo. Currently, Zuora supports updating tax-exclusive memo items, but does not support updating tax-inclusive memo items.   If the amount of a memo item is updated, the tax will be recalculated in the following conditions:   - The memo is created from a product rate plan charge and you use Avalara to calculate the tax.   - The memo is created from an invoice and you use Avalara or Zuora Tax to calculate the tax.  You can update a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Update debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {PUTDebitMemoType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTDebitMemo(debitMemoId: string, body: PUTDebitMemoType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETDebitMemoType> {
            return DebitMemosApiFp(configuration).pUTDebitMemo(debitMemoId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Posts a debit memo to activate it. You can post debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
         * @summary Post debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTPostDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETDebitMemoType> {
            return DebitMemosApiFp(configuration).pUTPostDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unposts a debit memo that is in Posted status. If any credit memo or payment has been applied to a debit memo, you are not allowed to unpost the debit memo. After a debit memo is unposted, its status becomes Draft.  You can unpost debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
         * @summary Unpost debit memo
         * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUnpostDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETDebitMemoType> {
            return DebitMemosApiFp(configuration).pUTUnpostDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DebitMemosApi - object-oriented interface
 * @export
 * @class DebitMemosApi
 * @extends {BaseAPI}
 */
export class DebitMemosApi extends BaseAPI {
    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a debit memo. Only debit memos with the Cancelled status can be deleted.   You can delete a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
     * @summary Delete debit memo
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public dELETEDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).dELETEDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific debit memo. 
     * @summary Get debit memo
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public gETDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).gETDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves information about the payments or credit memos that are applied to a specified debit memo. 
     * @summary Get debit memo application parts
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public gETDebitMemoApplicationParts(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).gETDebitMemoApplicationParts(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about a specific item of a debit memo. A debit memo item is a single line item in a debit memo. 
     * @summary Get debit memo item
     * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;taxItems&#x60; * &#x60;taxationItems&#x60; * &#x60;comment&#x60; * &#x60;description&#x60; 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public gETDebitMemoItem(dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).gETDebitMemoItem(dmitemid, debitMemoId, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a debit memo. A debit memo item is a single line item in a debit memo.   ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100&sort=createdDate 
     * @summary Get debit memo items
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following response fields: * &#x60;items&#x60; &gt; &#x60;taxItems&#x60; * &#x60;items&#x60; &gt; &#x60;taxationItems&#x60; * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
     * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
     * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
     * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
     * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
     * @param {string} [id] This parameter filters the response based on the &#x60;id&#x60; field. 
     * @param {string} [serviceEndDate] This parameter filters the response based on the &#x60;serviceEndDate&#x60; field. 
     * @param {string} [serviceStartDate] This parameter filters the response based on the &#x60;serviceStartDate&#x60; field. 
     * @param {string} [sku] This parameter filters the response based on the &#x60;sku&#x60; field. 
     * @param {string} [skuName] This parameter filters the response based on the &#x60;skuName&#x60; field. 
     * @param {string} [sourceItemId] This parameter filters the response based on the &#x60;sourceItemId&#x60; field. 
     * @param {string} [subscriptionId] This parameter filters the response based on the &#x60;subscriptionId&#x60; field. 
     * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
     * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
     * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by updated date.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - id   - amount   - beAppliedAmount   - sku   - skuName   - serviceStartDate   - serviceEndDate   - sourceItemId   - createdDate   - createdById   - updatedDate   - updatedById   - subscriptionId    Examples:  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?sort&#x3D;createdDate  - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount&#x3D;100&amp;sort&#x3D;createdDate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public gETDebitMemoItems(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, zuoraVersion?: string, amount?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, id?: string, serviceEndDate?: string, serviceStartDate?: string, sku?: string, skuName?: string, sourceItemId?: string, subscriptionId?: string, updatedById?: string, updatedDate?: string, sort?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).gETDebitMemoItems(debitMemoId, zuoraTrackId, zuoraEntityIds, pageSize, zuoraVersion, amount, beAppliedAmount, createdById, createdDate, id, serviceEndDate, serviceStartDate, sku, skuName, sourceItemId, subscriptionId, updatedById, updatedDate, sort, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about all debit memos associated with all customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.   Examples:  - /v1/debitmemos?status=Processed  - /v1/debitmemos?referredInvoiceId=null&status=Draft  - /v1/debitmemos?status=Processed&type=External&sort=+number 
     * @summary Get debit memos
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
     * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
     * @param {number} [balance] This parameter filters the response based on the &#x60;balance&#x60; field. 
     * @param {number} [beAppliedAmount] This parameter filters the response based on the &#x60;beAppliedAmount&#x60; field. 
     * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
     * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
     * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
     * @param {string} [debitMemoDate] This parameter filters the response based on the &#x60;debitMemoDate&#x60; field. 
     * @param {string} [dueDate] This parameter filters the response based on the &#x60;dueDate&#x60; field. 
     * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
     * @param {string} [referredInvoiceId] This parameter filters the response based on the &#x60;referredInvoiceId&#x60; field. 
     * @param {'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
     * @param {string} [targetDate] This parameter filters the response based on the &#x60;targetDate&#x60; field. 
     * @param {number} [taxAmount] This parameter filters the response based on the &#x60;taxAmount&#x60; field. 
     * @param {number} [totalTaxExemptAmount] This parameter filters the response based on the &#x60;totalTaxExemptAmount&#x60; field. 
     * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
     * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
     * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by debit memo number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - debitMemoDate   - targetDate   - dueDate   - amount   - taxAmount   - totalTaxExemptAmount   - balance   - beAppliedAmount   - referredInvoiceId   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/debitmemos?sort&#x3D;+number  - /v1/debitmemos?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public gETDebitMemos(zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, balance?: number, beAppliedAmount?: number, createdById?: string, createdDate?: string, currency?: string, debitMemoDate?: string, dueDate?: string, number?: string, referredInvoiceId?: string, status?: 'Draft' | 'Posted' | 'Canceled' | 'Error' | 'PendingForTax' | 'Generating' | 'CancelInProgress', targetDate?: string, taxAmount?: number, totalTaxExemptAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).gETDebitMemos(zuoraTrackId, zuoraEntityIds, pageSize, accountId, amount, balance, beAppliedAmount, createdById, createdDate, currency, debitMemoDate, dueDate, number, referredInvoiceId, status, targetDate, taxAmount, totalTaxExemptAmount, updatedById, updatedDate, sort, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves information about the taxation items of a specific debit memo item. 
     * @summary Get taxation items of debit memo item
     * @param {string} dmitemid The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems). 
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {number} [page] Page number. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public gETTaxationItemsOfDebitMemoItem(dmitemid: string, debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options?: any) {
        return DebitMemosApiFp(this.configuration).gETTaxationItemsOfDebitMemoItem(dmitemid, debitMemoId, zuoraTrackId, zuoraEntityIds, pageSize, page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates taxation items for a debit memo. 
     * @summary Create taxation items for debit memo
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {POSTTaxationItemListForDMType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pOSTDMTaxationItems(debitMemoId: string, body: POSTTaxationItemListForDMType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pOSTDMTaxationItems(debitMemoId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from a product rate plan charge. Zuora supports the creation of debit memos from any type of product rate plan charge. The charges can also have any amount and any charge model, except for discout charge models.  When debit memos are created from product rate plan charges, the specified amount with decimal places is now validated based on the decimal places supported by each currency.  You can create a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
     * @summary Create debit memo from charge
     * @param {DebitMemoFromChargeType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;charges&#x60; &gt; &#x60;amount&#x60; * &#x60;charges&#x60; &gt; &#x60;memoItemAmount&#x60; * &#x60;charges&#x60; &gt; &#x60;chargeId&#x60; * &#x60;charges&#x60; &gt; &#x60;productRatePlanChargeId&#x60;        * &#x60;charges&#x60; &gt; &#x60;comment&#x60; * &#x60;charges&#x60; &gt; &#x60;description&#x60; 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pOSTDebitMemoFromPrpc(body: DebitMemoFromChargeType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pOSTDebitMemoFromPrpc(body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Creates a PDF file for a specified debit memo. To access the generated PDF file, you can download it by clicking **View PDF** on the detailed debit memo page through the Zuora UI.  This REST API operation can be used only if you have the Billing user permission \"Regenerate PDF\" enabled. 
     * @summary Create debit memo PDF
     * @param {string} debitMemoId The unique ID of the debit memo that you want to create a PDF file for. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pOSTDebitMemoPDF(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pOSTDebitMemoPDF(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Sends a posted debit memo to the specified email addresses manually.    ## Notes   - You must activate the **Email Debit Memo | Manually email Debit Memo** notification before emailing debit memos. To include the debit memo PDF in the email, select the **Include Debit Memo PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Manual Email for Debit Memo Default Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The debit memos are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
     * @summary Email debit memo
     * @param {string} debitMemoId The ID of a posted debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {PostDebitMemoEmailType} request 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pOSTEmailDebitMemo(debitMemoId: string, request: PostDebitMemoEmailType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pOSTEmailDebitMemo(debitMemoId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Uploads an externally generated PDF file for a debit memo that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one debit memo. 
     * @summary Upload file for debit memo
     * @param {string} debitMemoId The ID of the debit memo that you want to upload a PDF file for. For example, 402890555a87d7f5015a8919e4fe002e. 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {any} [file] The PDF file to upload for the debit memo. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pOSTUploadFileForDebitMemo(debitMemoId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options?: any) {
        return DebitMemosApiFp(this.configuration).pOSTUploadFileForDebitMemo(debitMemoId, zuoraEntityIds, zuoraTrackId, file, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Updates the due date for multiple debit memos in batches with one call.  
     * @summary Update debit memos
     * @param {PUTBatchDebitMemosRequest} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pUTBatchUpdateDebitMemos(body: PUTBatchDebitMemosRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pUTBatchUpdateDebitMemos(body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a debit memo. Only debit memos with the Draft status can be cancelled.   You can cancel a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
     * @summary Cancel debit memo
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pUTCancelDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pUTCancelDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates the basic and finance information about a debit memo. Currently, Zuora supports updating tax-exclusive memo items, but does not support updating tax-inclusive memo items.   If the amount of a memo item is updated, the tax will be recalculated in the following conditions:   - The memo is created from a product rate plan charge and you use Avalara to calculate the tax.   - The memo is created from an invoice and you use Avalara or Zuora Tax to calculate the tax.  You can update a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
     * @summary Update debit memo
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {PUTDebitMemoType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pUTDebitMemo(debitMemoId: string, body: PUTDebitMemoType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pUTDebitMemo(debitMemoId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Posts a debit memo to activate it. You can post debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
     * @summary Post debit memo
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pUTPostDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pUTPostDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unposts a debit memo that is in Posted status. If any credit memo or payment has been applied to a debit memo, you are not allowed to unpost the debit memo. After a debit memo is unposted, its status becomes Draft.  You can unpost debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions). 
     * @summary Unpost debit memo
     * @param {string} debitMemoId The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DebitMemosApi
     */
    public pUTUnpostDebitMemo(debitMemoId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return DebitMemosApiFp(this.configuration).pUTUnpostDebitMemo(debitMemoId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

}
