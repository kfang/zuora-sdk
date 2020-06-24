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
import { CreditMemoFromInvoiceType } from '../../../com/zuora/models';
// @ts-ignore
import { DebitMemoFromInvoiceType } from '../../../com/zuora/models';
// @ts-ignore
import { GETCreditMemoType } from '../../../com/zuora/models';
// @ts-ignore
import { GETDebitMemoType } from '../../../com/zuora/models';
// @ts-ignore
import { GETInvoiceFilesResponse } from '../../../com/zuora/models';
// @ts-ignore
import { GETInvoiceItemsResponse } from '../../../com/zuora/models';
// @ts-ignore
import { GETInvoiceTaxationItemsResponse } from '../../../com/zuora/models';
// @ts-ignore
import { GetInvoiceApplicationPartCollectionType } from '../../../com/zuora/models';
// @ts-ignore
import { POSTUploadFileResponse } from '../../../com/zuora/models';
// @ts-ignore
import { PUTWriteOffInvoiceRequest } from '../../../com/zuora/models';
// @ts-ignore
import { PUTWriteOffInvoiceResponse } from '../../../com/zuora/models';
// @ts-ignore
import { PostInvoiceEmailRequestType } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyCreateOrModifyResponse } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyDeleteResponse } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyGetInvoice } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyModifyInvoice } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyNoDataResponse } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyUnauthorizedResponse } from '../../../com/zuora/models';
// @ts-ignore
import { PutBatchInvoiceType } from '../../../com/zuora/models';
// @ts-ignore
import { PutInvoiceResponseType } from '../../../com/zuora/models';
// @ts-ignore
import { PutInvoiceType } from '../../../com/zuora/models';
// @ts-ignore
import { PutReverseInvoiceResponseType } from '../../../com/zuora/models';
// @ts-ignore
import { PutReverseInvoiceType } from '../../../com/zuora/models';
/**
 * InvoicesApi - axios parameter creator
 * @export
 */
export const InvoicesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Note: The Invoice Settlement feature is in Limited Availability. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at Zuora Global Support.  Retrieves information about the payments or credit memos that are applied to a specified invoice. 
         * @summary Get invoice application parts
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETInvoiceApplicationParts: async (invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling gETInvoiceApplicationParts.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/application-parts`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
         * Retrieves the information about all PDF files of a specified invoice.   Invoice PDF files are returned in reverse chronological order by the value of the `versionNumber` field. 
         * @summary Get invoice files
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETInvoiceFiles: async (invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling gETInvoiceFiles.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/files`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
         * Retrieves the information about all items of a specified invoice.  
         * @summary Get invoice items
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETInvoiceItems: async (invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling gETInvoiceItems.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/items`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
         * Retrieves information about the taxation items of a specific invoice item.  
         * @summary Get taxation items of invoice item
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} itemId The unique ID of an invoice item. For example, 2c86c8955bd63cc1015bd7c151af02ef. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {number} [page] Page number. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETTaxationItemsOfInvoiceItem: async (invoiceId: string, itemId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling gETTaxationItemsOfInvoiceItem.');
            }
            // verify required parameter 'itemId' is not null or undefined
            if (itemId === null || itemId === undefined) {
                throw new RequiredError('itemId','Required parameter itemId was null or undefined when calling gETTaxationItemsOfInvoiceItem.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/items/{itemId}/taxation-items`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)))
                .replace(`{${"itemId"}}`, encodeURIComponent(String(itemId)));
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
         * 
         * @summary CRUD: Delete invoice
         * @param {string} id Object id
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectDELETEInvoice: async (id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling objectDELETEInvoice.');
            }
            const localVarPath = `/v1/object/invoice/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
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
         * 
         * @summary CRUD: Get invoice
         * @param {string} id Object id
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [fields] Object fields to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectGETInvoice: async (id: string, zuoraEntityIds?: string, zuoraTrackId?: string, fields?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling objectGETInvoice.');
            }
            const localVarPath = `/v1/object/invoice/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (fields !== undefined) {
                localVarQueryParameter['fields'] = fields;
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
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
         * 
         * @summary CRUD: Update invoice
         * @param {string} id Object id
         * @param {ProxyModifyInvoice} modifyRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectPUTInvoice: async (id: string, modifyRequest: ProxyModifyInvoice, zuoraEntityIds?: string, zuoraTrackId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling objectPUTInvoice.');
            }
            // verify required parameter 'modifyRequest' is not null or undefined
            if (modifyRequest === null || modifyRequest === undefined) {
                throw new RequiredError('modifyRequest','Required parameter modifyRequest was null or undefined when calling objectPUTInvoice.');
            }
            const localVarPath = `/v1/object/invoice/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof modifyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(modifyRequest !== undefined ? modifyRequest : {}) : (modifyRequest || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc credit memo from an invoice.  You can create a credit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create credit memo from invoice
         * @param {string} invoiceId The ID of an invoice that you want to create a credit memo from. 
         * @param {CreditMemoFromInvoiceType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTCreditMemoFromInvoice: async (invoiceId: string, body: CreditMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling pOSTCreditMemoFromInvoice.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pOSTCreditMemoFromInvoice.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/creditmemos`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from an invoice.  You can create a debit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create debit memo from invoice
         * @param {string} invoiceId The ID of an invoice that you want to create a debit memo from. 
         * @param {DebitMemoFromInvoiceType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDebitMemoFromInvoice: async (invoiceId: string, body: DebitMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling pOSTDebitMemoFromInvoice.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pOSTDebitMemoFromInvoice.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/debitmemos`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
         * Sends a posted invoice to the specified email addresses manually.    ## Notes   - You must activate the **Manual Email For Invoice | Manual Email For Invoice** notification before emailing invoices. To include the invoice PDF in the email, select the **Include Invoice PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Invoice Posted Default Email Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The invoices are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
         * @summary Email invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PostInvoiceEmailRequestType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTEmailInvoice: async (invoiceId: string, request: PostInvoiceEmailRequestType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling pOSTEmailInvoice.');
            }
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling pOSTEmailInvoice.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/emails`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
         * Uploads an externally generated invoice PDF file for an invoice that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one invoice. 
         * @summary Upload file for invoice
         * @param {string} invoiceId The ID of the invoice that you want to upload a PDF file for. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {any} [file] The PDF file to upload for the invoice. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTUploadFileForInvoice: async (invoiceId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling pOSTUploadFileForInvoice.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/files`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
         * Updates multiple invoices in batches with one call.  
         * @summary Update invoices
         * @param {PutBatchInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTBatchUpdateInvoices: async (request: PutBatchInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling pUTBatchUpdateInvoices.');
            }
            const localVarPath = `/v1/invoices`;
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
            const needsSerialization = (typeof request !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(request !== undefined ? request : {}) : (request || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Reverses a posted invoice.   **Restrictions**  You are not allowed to reverse an invoice if any of the following restrictions is met:  * Payments and credit memos are applied to the invoice. * The invoice is split. * The invoice is not in Posted status. * The total amount of the invoice is less than 0 (a negative invoice). * Using Tax Connector for Extension Platform to calculate taxes. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Reversal](https://knowledgecenter.zuora.com/CB_Billing/IA_Invoices/Reverse_Posted_Invoices) for more information. 
         * @summary Reverse invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PutReverseInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTReverseInvoice: async (invoiceId: string, request: PutReverseInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling pUTReverseInvoice.');
            }
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling pUTReverseInvoice.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/reverse`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
            const needsSerialization = (typeof request !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(request !== undefined ? request : {}) : (request || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a specific invoice.  
         * @summary Update invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PutInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUpdateInvoice: async (invoiceId: string, request: PutInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling pUTUpdateInvoice.');
            }
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling pUTUpdateInvoice.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
            const needsSerialization = (typeof request !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(request !== undefined ? request : {}) : (request || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Writes off a posted invoice.   By writing off an invoice, a credit memo is created and applied to the invoice. The generated credit memo items and credit memo taxation items are applied to invoice items and invoice taxation items based on the configured default application rule. If an invoice is written off, the balance of each invoice item and invoice taxation item must be zero.  **Restrictions**  You cannot write off an invoice if any of the following restrictions is met:  * The balance of an invoice has been changed before Invoice Settlement is enabled.    For example, before Invoice Settlement is enabled, any credit balance adjustments, invoice item adjustments, or invoice adjustments have been applied to an invoice. * All items of an invoice have zero balance. For example:   * All items including invoice items and taxation items have zero amount when the invoice is generated.   * An invoice has been fully paid by credit memos or payments, and all items of the invoice have zero balance. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Write-off](https://knowledgecenter.zuora.com/Billing/Billing_and_Payments/IA_Invoices/Invoice_Write-Off) for more information.         
         * @summary Write off invoice
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PUTWriteOffInvoiceRequest} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTWriteOffInvoice: async (invoiceId: string, request: PUTWriteOffInvoiceRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'invoiceId' is not null or undefined
            if (invoiceId === null || invoiceId === undefined) {
                throw new RequiredError('invoiceId','Required parameter invoiceId was null or undefined when calling pUTWriteOffInvoice.');
            }
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling pUTWriteOffInvoice.');
            }
            const localVarPath = `/v1/invoices/{invoiceId}/write-off`
                .replace(`{${"invoiceId"}}`, encodeURIComponent(String(invoiceId)));
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
            const needsSerialization = (typeof request !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(request !== undefined ? request : {}) : (request || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * InvoicesApi - functional programming interface
 * @export
 */
export const InvoicesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Note: The Invoice Settlement feature is in Limited Availability. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at Zuora Global Support.  Retrieves information about the payments or credit memos that are applied to a specified invoice. 
         * @summary Get invoice application parts
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETInvoiceApplicationParts(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetInvoiceApplicationPartCollectionType>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).gETInvoiceApplicationParts(invoiceId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieves the information about all PDF files of a specified invoice.   Invoice PDF files are returned in reverse chronological order by the value of the `versionNumber` field. 
         * @summary Get invoice files
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETInvoiceFiles(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETInvoiceFilesResponse>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).gETInvoiceFiles(invoiceId, zuoraTrackId, zuoraEntityIds, pageSize, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieves the information about all items of a specified invoice.  
         * @summary Get invoice items
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETInvoiceItems(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETInvoiceItemsResponse>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).gETInvoiceItems(invoiceId, zuoraTrackId, zuoraEntityIds, pageSize, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieves information about the taxation items of a specific invoice item.  
         * @summary Get taxation items of invoice item
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} itemId The unique ID of an invoice item. For example, 2c86c8955bd63cc1015bd7c151af02ef. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {number} [page] Page number. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETTaxationItemsOfInvoiceItem(invoiceId: string, itemId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETInvoiceTaxationItemsResponse>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).gETTaxationItemsOfInvoiceItem(invoiceId, itemId, zuoraTrackId, zuoraEntityIds, pageSize, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary CRUD: Delete invoice
         * @param {string} id Object id
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async objectDELETEInvoice(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProxyDeleteResponse>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).objectDELETEInvoice(id, zuoraEntityIds, zuoraTrackId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary CRUD: Get invoice
         * @param {string} id Object id
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [fields] Object fields to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async objectGETInvoice(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, fields?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProxyGetInvoice>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).objectGETInvoice(id, zuoraEntityIds, zuoraTrackId, fields, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary CRUD: Update invoice
         * @param {string} id Object id
         * @param {ProxyModifyInvoice} modifyRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async objectPUTInvoice(id: string, modifyRequest: ProxyModifyInvoice, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProxyCreateOrModifyResponse>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).objectPUTInvoice(id, modifyRequest, zuoraEntityIds, zuoraTrackId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc credit memo from an invoice.  You can create a credit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create credit memo from invoice
         * @param {string} invoiceId The ID of an invoice that you want to create a credit memo from. 
         * @param {CreditMemoFromInvoiceType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTCreditMemoFromInvoice(invoiceId: string, body: CreditMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETCreditMemoType>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pOSTCreditMemoFromInvoice(invoiceId, body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from an invoice.  You can create a debit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create debit memo from invoice
         * @param {string} invoiceId The ID of an invoice that you want to create a debit memo from. 
         * @param {DebitMemoFromInvoiceType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTDebitMemoFromInvoice(invoiceId: string, body: DebitMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETDebitMemoType>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pOSTDebitMemoFromInvoice(invoiceId, body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Sends a posted invoice to the specified email addresses manually.    ## Notes   - You must activate the **Manual Email For Invoice | Manual Email For Invoice** notification before emailing invoices. To include the invoice PDF in the email, select the **Include Invoice PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Invoice Posted Default Email Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The invoices are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
         * @summary Email invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PostInvoiceEmailRequestType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTEmailInvoice(invoiceId: string, request: PostInvoiceEmailRequestType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonResponseType>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pOSTEmailInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Uploads an externally generated invoice PDF file for an invoice that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one invoice. 
         * @summary Upload file for invoice
         * @param {string} invoiceId The ID of the invoice that you want to upload a PDF file for. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {any} [file] The PDF file to upload for the invoice. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTUploadFileForInvoice(invoiceId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<POSTUploadFileResponse>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pOSTUploadFileForInvoice(invoiceId, zuoraEntityIds, zuoraTrackId, file, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Updates multiple invoices in batches with one call.  
         * @summary Update invoices
         * @param {PutBatchInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTBatchUpdateInvoices(request: PutBatchInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonResponseType>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pUTBatchUpdateInvoices(request, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Reverses a posted invoice.   **Restrictions**  You are not allowed to reverse an invoice if any of the following restrictions is met:  * Payments and credit memos are applied to the invoice. * The invoice is split. * The invoice is not in Posted status. * The total amount of the invoice is less than 0 (a negative invoice). * Using Tax Connector for Extension Platform to calculate taxes. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Reversal](https://knowledgecenter.zuora.com/CB_Billing/IA_Invoices/Reverse_Posted_Invoices) for more information. 
         * @summary Reverse invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PutReverseInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTReverseInvoice(invoiceId: string, request: PutReverseInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PutReverseInvoiceResponseType>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pUTReverseInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Updates a specific invoice.  
         * @summary Update invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PutInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTUpdateInvoice(invoiceId: string, request: PutInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PutInvoiceResponseType>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pUTUpdateInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Writes off a posted invoice.   By writing off an invoice, a credit memo is created and applied to the invoice. The generated credit memo items and credit memo taxation items are applied to invoice items and invoice taxation items based on the configured default application rule. If an invoice is written off, the balance of each invoice item and invoice taxation item must be zero.  **Restrictions**  You cannot write off an invoice if any of the following restrictions is met:  * The balance of an invoice has been changed before Invoice Settlement is enabled.    For example, before Invoice Settlement is enabled, any credit balance adjustments, invoice item adjustments, or invoice adjustments have been applied to an invoice. * All items of an invoice have zero balance. For example:   * All items including invoice items and taxation items have zero amount when the invoice is generated.   * An invoice has been fully paid by credit memos or payments, and all items of the invoice have zero balance. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Write-off](https://knowledgecenter.zuora.com/Billing/Billing_and_Payments/IA_Invoices/Invoice_Write-Off) for more information.         
         * @summary Write off invoice
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PUTWriteOffInvoiceRequest} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTWriteOffInvoice(invoiceId: string, request: PUTWriteOffInvoiceRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PUTWriteOffInvoiceResponse>> {
            const localVarAxiosArgs = await InvoicesApiAxiosParamCreator(configuration).pUTWriteOffInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * InvoicesApi - factory interface
 * @export
 */
export const InvoicesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Note: The Invoice Settlement feature is in Limited Availability. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at Zuora Global Support.  Retrieves information about the payments or credit memos that are applied to a specified invoice. 
         * @summary Get invoice application parts
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETInvoiceApplicationParts(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GetInvoiceApplicationPartCollectionType> {
            return InvoicesApiFp(configuration).gETInvoiceApplicationParts(invoiceId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the information about all PDF files of a specified invoice.   Invoice PDF files are returned in reverse chronological order by the value of the `versionNumber` field. 
         * @summary Get invoice files
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETInvoiceFiles(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): AxiosPromise<GETInvoiceFilesResponse> {
            return InvoicesApiFp(configuration).gETInvoiceFiles(invoiceId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the information about all items of a specified invoice.  
         * @summary Get invoice items
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETInvoiceItems(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): AxiosPromise<GETInvoiceItemsResponse> {
            return InvoicesApiFp(configuration).gETInvoiceItems(invoiceId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves information about the taxation items of a specific invoice item.  
         * @summary Get taxation items of invoice item
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} itemId The unique ID of an invoice item. For example, 2c86c8955bd63cc1015bd7c151af02ef. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {number} [page] Page number. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETTaxationItemsOfInvoiceItem(invoiceId: string, itemId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options?: any): AxiosPromise<GETInvoiceTaxationItemsResponse> {
            return InvoicesApiFp(configuration).gETTaxationItemsOfInvoiceItem(invoiceId, itemId, zuoraTrackId, zuoraEntityIds, pageSize, page, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary CRUD: Delete invoice
         * @param {string} id Object id
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectDELETEInvoice(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): AxiosPromise<ProxyDeleteResponse> {
            return InvoicesApiFp(configuration).objectDELETEInvoice(id, zuoraEntityIds, zuoraTrackId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary CRUD: Get invoice
         * @param {string} id Object id
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [fields] Object fields to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectGETInvoice(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, fields?: string, options?: any): AxiosPromise<ProxyGetInvoice> {
            return InvoicesApiFp(configuration).objectGETInvoice(id, zuoraEntityIds, zuoraTrackId, fields, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary CRUD: Update invoice
         * @param {string} id Object id
         * @param {ProxyModifyInvoice} modifyRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectPUTInvoice(id: string, modifyRequest: ProxyModifyInvoice, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): AxiosPromise<ProxyCreateOrModifyResponse> {
            return InvoicesApiFp(configuration).objectPUTInvoice(id, modifyRequest, zuoraEntityIds, zuoraTrackId, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc credit memo from an invoice.  You can create a credit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create credit memo from invoice
         * @param {string} invoiceId The ID of an invoice that you want to create a credit memo from. 
         * @param {CreditMemoFromInvoiceType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTCreditMemoFromInvoice(invoiceId: string, body: CreditMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): AxiosPromise<GETCreditMemoType> {
            return InvoicesApiFp(configuration).pOSTCreditMemoFromInvoice(invoiceId, body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from an invoice.  You can create a debit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
         * @summary Create debit memo from invoice
         * @param {string} invoiceId The ID of an invoice that you want to create a debit memo from. 
         * @param {DebitMemoFromInvoiceType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTDebitMemoFromInvoice(invoiceId: string, body: DebitMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any): AxiosPromise<GETDebitMemoType> {
            return InvoicesApiFp(configuration).pOSTDebitMemoFromInvoice(invoiceId, body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * Sends a posted invoice to the specified email addresses manually.    ## Notes   - You must activate the **Manual Email For Invoice | Manual Email For Invoice** notification before emailing invoices. To include the invoice PDF in the email, select the **Include Invoice PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Invoice Posted Default Email Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The invoices are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
         * @summary Email invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PostInvoiceEmailRequestType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTEmailInvoice(invoiceId: string, request: PostInvoiceEmailRequestType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<CommonResponseType> {
            return InvoicesApiFp(configuration).pOSTEmailInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * Uploads an externally generated invoice PDF file for an invoice that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one invoice. 
         * @summary Upload file for invoice
         * @param {string} invoiceId The ID of the invoice that you want to upload a PDF file for. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {any} [file] The PDF file to upload for the invoice. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTUploadFileForInvoice(invoiceId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options?: any): AxiosPromise<POSTUploadFileResponse> {
            return InvoicesApiFp(configuration).pOSTUploadFileForInvoice(invoiceId, zuoraEntityIds, zuoraTrackId, file, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates multiple invoices in batches with one call.  
         * @summary Update invoices
         * @param {PutBatchInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTBatchUpdateInvoices(request: PutBatchInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<CommonResponseType> {
            return InvoicesApiFp(configuration).pUTBatchUpdateInvoices(request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Reverses a posted invoice.   **Restrictions**  You are not allowed to reverse an invoice if any of the following restrictions is met:  * Payments and credit memos are applied to the invoice. * The invoice is split. * The invoice is not in Posted status. * The total amount of the invoice is less than 0 (a negative invoice). * Using Tax Connector for Extension Platform to calculate taxes. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Reversal](https://knowledgecenter.zuora.com/CB_Billing/IA_Invoices/Reverse_Posted_Invoices) for more information. 
         * @summary Reverse invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PutReverseInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTReverseInvoice(invoiceId: string, request: PutReverseInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<PutReverseInvoiceResponseType> {
            return InvoicesApiFp(configuration).pUTReverseInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a specific invoice.  
         * @summary Update invoice
         * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PutInvoiceType} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUpdateInvoice(invoiceId: string, request: PutInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<PutInvoiceResponseType> {
            return InvoicesApiFp(configuration).pUTUpdateInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Writes off a posted invoice.   By writing off an invoice, a credit memo is created and applied to the invoice. The generated credit memo items and credit memo taxation items are applied to invoice items and invoice taxation items based on the configured default application rule. If an invoice is written off, the balance of each invoice item and invoice taxation item must be zero.  **Restrictions**  You cannot write off an invoice if any of the following restrictions is met:  * The balance of an invoice has been changed before Invoice Settlement is enabled.    For example, before Invoice Settlement is enabled, any credit balance adjustments, invoice item adjustments, or invoice adjustments have been applied to an invoice. * All items of an invoice have zero balance. For example:   * All items including invoice items and taxation items have zero amount when the invoice is generated.   * An invoice has been fully paid by credit memos or payments, and all items of the invoice have zero balance. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Write-off](https://knowledgecenter.zuora.com/Billing/Billing_and_Payments/IA_Invoices/Invoice_Write-Off) for more information.         
         * @summary Write off invoice
         * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
         * @param {PUTWriteOffInvoiceRequest} request 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTWriteOffInvoice(invoiceId: string, request: PUTWriteOffInvoiceRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<PUTWriteOffInvoiceResponse> {
            return InvoicesApiFp(configuration).pUTWriteOffInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * InvoicesApi - object-oriented interface
 * @export
 * @class InvoicesApi
 * @extends {BaseAPI}
 */
export class InvoicesApi extends BaseAPI {
    /**
     * Note: The Invoice Settlement feature is in Limited Availability. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at Zuora Global Support.  Retrieves information about the payments or credit memos that are applied to a specified invoice. 
     * @summary Get invoice application parts
     * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public gETInvoiceApplicationParts(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return InvoicesApiFp(this.configuration).gETInvoiceApplicationParts(invoiceId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the information about all PDF files of a specified invoice.   Invoice PDF files are returned in reverse chronological order by the value of the `versionNumber` field. 
     * @summary Get invoice files
     * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public gETInvoiceFiles(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any) {
        return InvoicesApiFp(this.configuration).gETInvoiceFiles(invoiceId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the information about all items of a specified invoice.  
     * @summary Get invoice items
     * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public gETInvoiceItems(invoiceId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any) {
        return InvoicesApiFp(this.configuration).gETInvoiceItems(invoiceId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves information about the taxation items of a specific invoice item.  
     * @summary Get taxation items of invoice item
     * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {string} itemId The unique ID of an invoice item. For example, 2c86c8955bd63cc1015bd7c151af02ef. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {number} [page] Page number. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public gETTaxationItemsOfInvoiceItem(invoiceId: string, itemId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, page?: number, options?: any) {
        return InvoicesApiFp(this.configuration).gETTaxationItemsOfInvoiceItem(invoiceId, itemId, zuoraTrackId, zuoraEntityIds, pageSize, page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary CRUD: Delete invoice
     * @param {string} id Object id
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public objectDELETEInvoice(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any) {
        return InvoicesApiFp(this.configuration).objectDELETEInvoice(id, zuoraEntityIds, zuoraTrackId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary CRUD: Get invoice
     * @param {string} id Object id
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [fields] Object fields to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public objectGETInvoice(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, fields?: string, options?: any) {
        return InvoicesApiFp(this.configuration).objectGETInvoice(id, zuoraEntityIds, zuoraTrackId, fields, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary CRUD: Update invoice
     * @param {string} id Object id
     * @param {ProxyModifyInvoice} modifyRequest 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public objectPUTInvoice(id: string, modifyRequest: ProxyModifyInvoice, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any) {
        return InvoicesApiFp(this.configuration).objectPUTInvoice(id, modifyRequest, zuoraEntityIds, zuoraTrackId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc credit memo from an invoice.  You can create a credit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
     * @summary Create credit memo from invoice
     * @param {string} invoiceId The ID of an invoice that you want to create a credit memo from. 
     * @param {CreditMemoFromInvoiceType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pOSTCreditMemoFromInvoice(invoiceId: string, body: CreditMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any) {
        return InvoicesApiFp(this.configuration).pOSTCreditMemoFromInvoice(invoiceId, body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates an ad-hoc debit memo from an invoice.  You can create a debit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information. 
     * @summary Create debit memo from invoice
     * @param {string} invoiceId The ID of an invoice that you want to create a debit memo from. 
     * @param {DebitMemoFromInvoiceType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraVersion]  The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control.   This header affects the availability of the following request fields: * &#x60;items&#x60; &gt; &#x60;comment&#x60; * &#x60;items&#x60; &gt; &#x60;description&#x60; 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pOSTDebitMemoFromInvoice(invoiceId: string, body: DebitMemoFromInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, zuoraVersion?: string, options?: any) {
        return InvoicesApiFp(this.configuration).pOSTDebitMemoFromInvoice(invoiceId, body, zuoraTrackId, zuoraEntityIds, zuoraVersion, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Sends a posted invoice to the specified email addresses manually.    ## Notes   - You must activate the **Manual Email For Invoice | Manual Email For Invoice** notification before emailing invoices. To include the invoice PDF in the email, select the **Include Invoice PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.     - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Invoice Posted Default Email Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.     - The invoices are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:      * The `useEmailTemplateSetting` field is set to `false`.     * The email addresses are not specified in the `emailAddresses` field. 
     * @summary Email invoice
     * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {PostInvoiceEmailRequestType} request 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pOSTEmailInvoice(invoiceId: string, request: PostInvoiceEmailRequestType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return InvoicesApiFp(this.configuration).pOSTEmailInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Uploads an externally generated invoice PDF file for an invoice that is in Draft or Posted status.  This operation has the following restrictions: - Only the PDF file format is supported. - The maximum size of the PDF file to upload is 4 MB. - A maximum of 50 PDF files can be uploaded for one invoice. 
     * @summary Upload file for invoice
     * @param {string} invoiceId The ID of the invoice that you want to upload a PDF file for. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {any} [file] The PDF file to upload for the invoice. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pOSTUploadFileForInvoice(invoiceId: string, zuoraEntityIds?: string, zuoraTrackId?: string, file?: any, options?: any) {
        return InvoicesApiFp(this.configuration).pOSTUploadFileForInvoice(invoiceId, zuoraEntityIds, zuoraTrackId, file, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates multiple invoices in batches with one call.  
     * @summary Update invoices
     * @param {PutBatchInvoiceType} request 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pUTBatchUpdateInvoices(request: PutBatchInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return InvoicesApiFp(this.configuration).pUTBatchUpdateInvoices(request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Reverses a posted invoice.   **Restrictions**  You are not allowed to reverse an invoice if any of the following restrictions is met:  * Payments and credit memos are applied to the invoice. * The invoice is split. * The invoice is not in Posted status. * The total amount of the invoice is less than 0 (a negative invoice). * Using Tax Connector for Extension Platform to calculate taxes. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Reversal](https://knowledgecenter.zuora.com/CB_Billing/IA_Invoices/Reverse_Posted_Invoices) for more information. 
     * @summary Reverse invoice
     * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {PutReverseInvoiceType} request 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pUTReverseInvoice(invoiceId: string, request: PutReverseInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return InvoicesApiFp(this.configuration).pUTReverseInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates a specific invoice.  
     * @summary Update invoice
     * @param {string} invoiceId The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {PutInvoiceType} request 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pUTUpdateInvoice(invoiceId: string, request: PutInvoiceType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return InvoicesApiFp(this.configuration).pUTUpdateInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Writes off a posted invoice.   By writing off an invoice, a credit memo is created and applied to the invoice. The generated credit memo items and credit memo taxation items are applied to invoice items and invoice taxation items based on the configured default application rule. If an invoice is written off, the balance of each invoice item and invoice taxation item must be zero.  **Restrictions**  You cannot write off an invoice if any of the following restrictions is met:  * The balance of an invoice has been changed before Invoice Settlement is enabled.    For example, before Invoice Settlement is enabled, any credit balance adjustments, invoice item adjustments, or invoice adjustments have been applied to an invoice. * All items of an invoice have zero balance. For example:   * All items including invoice items and taxation items have zero amount when the invoice is generated.   * An invoice has been fully paid by credit memos or payments, and all items of the invoice have zero balance. * An invoice contains more than 750 items in total, including invoice items, discount items, and taxation items.  See [Invoice Write-off](https://knowledgecenter.zuora.com/Billing/Billing_and_Payments/IA_Invoices/Invoice_Write-Off) for more information.         
     * @summary Write off invoice
     * @param {string} invoiceId The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab. 
     * @param {PUTWriteOffInvoiceRequest} request 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InvoicesApi
     */
    public pUTWriteOffInvoice(invoiceId: string, request: PUTWriteOffInvoiceRequest, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return InvoicesApiFp(this.configuration).pUTWriteOffInvoice(invoiceId, request, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

}
